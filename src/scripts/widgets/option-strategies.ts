// Client behavior for OptionStrategies.astro (lesson 5.2). Same model as course/verify/5.2.py.
import { bsCall, bsPut } from './bs';

interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const S0 = 100;
const SIGMA = 0.2;
const R = 0.04;

export const putPrice = (k: number) => bsPut(S0, k, 1, R, SIGMA);
export const callPrice = (k: number) => bsCall(S0, k, 1, R, SIGMA);

export function initOptionStrategies() {
	document.querySelectorAll<HTMLElement>('[data-widget="option-strategies"]').forEach((root) => {
		const kpIn = root.querySelector<HTMLInputElement>('[data-param="kp"]')!;
		const kcIn = root.querySelector<HTMLInputElement>('[data-param="kc"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (n: string) => svg.querySelector<SVGPathElement>(`[data-el="${n}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const kp = Number(kpIn.value);
			const kc = Number(kcIn.value);
			const p = putPrice(kp);
			const c = callPrice(kc);
			const pp = (s: number) => s - S0 + Math.max(kp - s, 0) - p;
			const cc = (s: number) => s - S0 - Math.max(s - kc, 0) + c;
			for (const { el, X, Y } of plots) {
				const line = (f: (s: number) => number) => {
					const pts: string[] = [];
					for (let s = 60; s <= 140; s += 1) pts.push(`${X(s).toFixed(1)} ${Y(f(s)).toFixed(1)}`);
					return `M ${pts.join(' L ')}`;
				};
				el('pp').setAttribute('d', line(pp));
				el('cc').setAttribute('d', line(cc));
			}
			root.querySelector('[data-out="kp"]')!.textContent = String(kp);
			root.querySelector('[data-out="kc"]')!.textContent = String(kc);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{p}', p.toFixed(2))
				.replace('{floor}', pp(0).toFixed(2))
				.replace('{c}', c.toFixed(2))
				.replace('{cap}', cc(1000).toFixed(2));
		}

		kpIn.addEventListener('input', draw);
		kcIn.addEventListener('input', draw);
		draw();
	});
}
