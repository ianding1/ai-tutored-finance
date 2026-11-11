// Client behavior for SmlAlpha.astro (lesson 4.4). Same model as course/verify/4.4.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

interface Stock {
	name: string;
	b: number;
	e: number;
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initSmlAlpha() {
	document.querySelectorAll<HTMLElement>('[data-widget="sml-alpha"]').forEach((root) => {
		const rfIn = root.querySelector<HTMLInputElement>('[data-param="rf"]')!;
		const mIn = root.querySelector<HTMLInputElement>('[data-param="mrp"]')!;
		const stocks = JSON.parse(root.dataset.stocks || '[]') as Stock[];
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const rf = Number(rfIn.value);
			const mrp = Number(mIn.value);
			const req = (b: number) => rf + b * mrp;
			for (const { el, X, Y } of plots) {
				const sml = el('sml');
				sml.setAttribute('x1', X(0).toFixed(1));
				sml.setAttribute('y1', Y(req(0)).toFixed(1));
				sml.setAttribute('x2', X(2).toFixed(1));
				sml.setAttribute('y2', Y(req(2)).toFixed(1));
				for (const s of stocks) el(`gap-${s.name}`).setAttribute('y2', Y(req(s.b)).toFixed(1));
			}
			root.querySelector('[data-out="rf"]')!.textContent = String(rf);
			root.querySelector('[data-out="mrp"]')!.textContent = String(mrp);
			let text = root.dataset.readout || '';
			for (const s of stocks) text = text.replace(`{${s.name}}`, fmt(s.e - req(s.b)));
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = text;
		}

		rfIn.addEventListener('input', draw);
		mIn.addEventListener('input', draw);
		draw();
	});
}
