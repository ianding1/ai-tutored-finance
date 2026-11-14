// Client behavior for ForecastCheck.astro (lesson 6.13). Same model as course/verify/6.13.py.
import { normCdf } from './bs';

interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export const percentile = (r: number, years: number) => 100 * normCdf(((r - 6) * Math.sqrt(years)) / 16);

export function initForecastCheck() {
	document.querySelectorAll<HTMLElement>('[data-widget="forecast-check"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="pct"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const r = Number(rIn.value);
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let t = 1; t <= 30; t++) pts.push(`${X(t).toFixed(1)} ${Y(percentile(r, t)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="r"]')!.textContent = rIn.value;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a}', percentile(r, 1).toFixed(0))
				.replace('{b}', percentile(r, 5).toFixed(0))
				.replace('{c}', percentile(r, 20).toFixed(0));
		}

		rIn.addEventListener('input', draw);
		draw();
	});
}
