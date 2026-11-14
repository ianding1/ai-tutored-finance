// Client behavior for CarryCurve.astro (lesson 5.1). Same model as course/verify/5.1.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export const forward = (r: number, q: number, t: number) => 100 * Math.exp((r - q) * t);

export function initCarryCurve() {
	document.querySelectorAll<HTMLElement>('[data-widget="carry-curve"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const qIn = root.querySelector<HTMLInputElement>('[data-param="q"]')!;
		const shapes = JSON.parse(root.dataset.shapes || '[]') as string[];
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="fwd"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const r = Number(rIn.value) / 100;
			const q = Number(qIn.value) / 100;
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let t = 0; t <= 2.0001; t += 0.05) pts.push(`${X(t).toFixed(1)} ${Y(forward(r, q, t)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="r"]')!.textContent = String(Number(rIn.value));
			root.querySelector('[data-out="q"]')!.textContent = String(Number(qIn.value));
			const shape = r > q ? shapes[0] : r < q ? shapes[1] : shapes[2];
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{f1}', forward(r, q, 1).toFixed(2))
				.replace('{f2}', forward(r, q, 2).toFixed(2))
				.replace('{shape}', shape);
		}

		rIn.addEventListener('input', draw);
		qIn.addEventListener('input', draw);
		draw();
	});
}
