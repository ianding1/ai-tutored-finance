// Client behavior for GoalProb.astro (lesson 6.12). Same model as course/verify/6.12.py.
import { normCdf } from './bs';

interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Probability (in %) that wealth reaches the goal with stock share w, funded ratio f and horizon T years.
export function goalProb(w: number, f: number, T: number) {
	const mu = 0.01 + w * 0.04;
	const s = w * 0.17;
	if (s === 0) return f >= 1 ? 100 : 0;
	const m = Math.log(1 + mu) - (s * s) / 2;
	return 100 * normCdf((Math.log(f) + (m - Math.log(1.01)) * T) / (s * Math.sqrt(T)));
}

export function initGoalProb() {
	document.querySelectorAll<HTMLElement>('[data-widget="goal-prob"]').forEach((root) => {
		const tIn = root.querySelector<HTMLInputElement>('[data-param="t"]')!;
		const fIn = root.querySelector<HTMLInputElement>('[data-param="f"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="p"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const T = Number(tIn.value);
			const f = Number(fIn.value) / 100;
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let w = 0; w <= 100; w++) pts.push(`${X(w).toFixed(1)} ${Y(goalProb(w / 100, f, T)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="t"]')!.textContent = String(T);
			root.querySelector('[data-out="f"]')!.textContent = String(Number(fIn.value));
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a}', goalProb(0, f, T).toFixed(1))
				.replace('{b}', goalProb(0.5, f, T).toFixed(1))
				.replace('{c}', goalProb(1, f, T).toFixed(1));
		}

		tIn.addEventListener('input', draw);
		fIn.addEventListener('input', draw);
		draw();
	});
}
