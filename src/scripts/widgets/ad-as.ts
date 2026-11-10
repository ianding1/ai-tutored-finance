// Client behavior for AdAs.astro (lesson 2.4). AD: P = 100 + 2 (100 + D - Y); SRAS: P = 100 + S + (Y - 100).
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2).replace(/\.?0+$/, '');
};

export function initAdAs() {
	document.querySelectorAll<HTMLElement>('[data-widget="ad-as"]').forEach((root) => {
		const dIn = root.querySelector<HTMLInputElement>('[data-param="d"]')!;
		const sIn = root.querySelector<HTMLInputElement>('[data-param="s"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});
		const set = (e: SVGElement, a: Record<string, number>) => {
			for (const [k, v] of Object.entries(a)) e.setAttribute(k, v.toFixed(1));
		};

		function draw() {
			const d = Number(dIn.value);
			const s = Number(sIn.value);
			const gap = (d - 0.5 * s) / 1.5;
			const y = 100 + gap;
			const p = 100 + s + gap;
			const adP = (Y: number) => 100 + 2 * (100 + d - Y);
			const asP = (Y: number) => 100 + s + (Y - 100);
			for (const { el, X, Y } of plots) {
				set(el('ad'), { x1: X(70), y1: Y(adP(70)), x2: X(130), y2: Y(adP(130)) });
				set(el('as'), { x1: X(60), y1: Y(asP(60)), x2: X(140), y2: Y(asP(140)) });
				set(el('pt'), { cx: X(y), cy: Y(p) });
			}
			root.querySelector('[data-out="d"]')!.textContent = String(d);
			root.querySelector('[data-out="s"]')!.textContent = String(s);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{y}', fmt(y))
				.replace('{g}', fmt(gap))
				.replace('{p}', fmt(p));
		}

		dIn.addEventListener('input', draw);
		sIn.addEventListener('input', draw);
		draw();
	});
}
