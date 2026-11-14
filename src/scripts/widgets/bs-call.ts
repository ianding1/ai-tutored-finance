// Client behavior for BsCall.astro (lesson 5.3). Same model as course/verify/5.3.py.
import { bsCall, bsDelta } from './bs';

interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const K = 100;
const R = 0.04;

export function initBsCall() {
	document.querySelectorAll<HTMLElement>('[data-widget="bs-call"]').forEach((root) => {
		const sIn = root.querySelector<HTMLInputElement>('[data-param="sigma"]')!;
		const tIn = root.querySelector<HTMLInputElement>('[data-param="t"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="price"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const sigma = Number(sIn.value) / 100;
			const t = Number(tIn.value);
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let s = 50; s <= 150; s += 1) pts.push(`${X(s).toFixed(1)} ${Y(Math.min(bsCall(s, K, t, R, sigma), 60)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="sigma"]')!.textContent = String(Number(sIn.value));
			root.querySelector('[data-out="t"]')!.textContent = t.toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{c}', bsCall(100, K, t, R, sigma).toFixed(2))
				.replace('{d}', bsDelta(100, K, t, R, sigma).toFixed(2));
		}

		sIn.addEventListener('input', draw);
		tIn.addEventListener('input', draw);
		draw();
	});
}
