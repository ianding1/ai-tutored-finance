// Client behavior for RealValue.astro (lesson 6.11). Same model as course/verify/6.11.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export const realValue = (pi: number, t: number) => 1000 / (1 + pi) ** t;

export function initRealValue() {
	document.querySelectorAll<HTMLElement>('[data-widget="real-value"]').forEach((root) => {
		const pIn = root.querySelector<HTMLInputElement>('[data-param="pi"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="fixed"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const pi = Number(pIn.value) / 100;
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let t = 0; t <= 30; t++) pts.push(`${X(t).toFixed(1)} ${Y(realValue(pi, t)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="pi"]')!.textContent = Number(pIn.value).toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a}', realValue(pi, 10).toFixed(0))
				.replace('{b}', realValue(pi, 20).toFixed(0))
				.replace('{c}', realValue(pi, 30).toFixed(0));
		}

		pIn.addEventListener('input', draw);
		draw();
	});
}
