// Client behavior for ProspectValue.astro (lesson 4.8). Same model as course/verify/4.8.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export const value = (x: number, lambda: number, a: number) => (x >= 0 ? x ** a : -lambda * (-x) ** a);

export function initProspectValue() {
	document.querySelectorAll<HTMLElement>('[data-widget="prospect-value"]').forEach((root) => {
		const lIn = root.querySelector<HTMLInputElement>('[data-param="lambda"]')!;
		const aIn = root.querySelector<HTMLInputElement>('[data-param="a"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="v"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const lambda = Number(lIn.value);
			const a = Number(aIn.value);
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let x = -200; x <= 200; x += 4) pts.push(`${X(x).toFixed(1)} ${Y(value(x, lambda, a)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="lambda"]')!.textContent = lambda.toFixed(2);
			root.querySelector('[data-out="a"]')!.textContent = a.toFixed(2);
			const v = 0.5 * value(100, lambda, a) + 0.5 * value(-100, lambda, a);
			const w = 100 * lambda ** (1 / a);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{v}', (Math.abs(v) < 0.005 ? 0 : v).toFixed(2))
				.replace('{w}', w.toFixed(0));
		}

		lIn.addEventListener('input', draw);
		aIn.addEventListener('input', draw);
		draw();
	});
}
