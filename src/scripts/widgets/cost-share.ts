// Client behavior for CostShare.astro (lesson 6.2). Same model as course/verify/6.2.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Share of final wealth lost (in %) to a yearly fee f with return r before fees, after T years.
export const lost = (f: number, r: number, T: number) => 100 * (1 - ((1 + r - f) / (1 + r)) ** T);

export function initCostShare() {
	document.querySelectorAll<HTMLElement>('[data-widget="cost-share"]').forEach((root) => {
		const fIn = root.querySelector<HTMLInputElement>('[data-param="f"]')!;
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="lost"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const f = Number(fIn.value) / 100;
			const r = Number(rIn.value) / 100;
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let t = 0; t <= 40; t++) pts.push(`${X(t).toFixed(1)} ${Y(Math.min(lost(f, r, t), 60)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="f"]')!.textContent = Number(fIn.value).toFixed(1);
			root.querySelector('[data-out="r"]')!.textContent = rIn.value;
			let text = root.dataset.readout || '';
			for (const T of [10, 20, 30, 40]) text = text.replace(`{l${T}}`, lost(f, r, T).toFixed(1));
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = text;
		}

		fIn.addEventListener('input', draw);
		rIn.addEventListener('input', draw);
		draw();
	});
}
