// Client behavior for BeatProb.astro (lesson 6.3). Same model as course/verify/6.3.py.
import { normCdf } from './bs';

interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export const beat = (f: number, s: number, T: number) => 100 * normCdf((-f * Math.sqrt(T)) / s);

export function initBeatProb() {
	document.querySelectorAll<HTMLElement>('[data-widget="beat-prob"]').forEach((root) => {
		const fIn = root.querySelector<HTMLInputElement>('[data-param="f"]')!;
		const sIn = root.querySelector<HTMLInputElement>('[data-param="s"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="prob"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const f = Number(fIn.value);
			const s = Number(sIn.value);
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let t = 1; t <= 30; t++) pts.push(`${X(t).toFixed(1)} ${Y(beat(f, s, t)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="f"]')!.textContent = f.toFixed(2);
			root.querySelector('[data-out="s"]')!.textContent = String(s);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{p1}', beat(f, s, 1).toFixed(1))
				.replace('{p10}', beat(f, s, 10).toFixed(1))
				.replace('{p20}', beat(f, s, 20).toFixed(1));
		}

		fIn.addEventListener('input', draw);
		sIn.addEventListener('input', draw);
		draw();
	});
}
