// Client behavior for FxReturn.astro (lesson 2.7). Unhedged return 100[(1 + i*)(1 + x) - 1],
// hedged return i, break-even x = 100[(1 + i)/(1 + i*) - 1] (all in %).
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

export function initFxReturn() {
	document.querySelectorAll<HTMLElement>('[data-widget="fx-return"]').forEach((root) => {
		const iIn = root.querySelector<HTMLInputElement>('[data-param="i"]')!;
		const sIn = root.querySelector<HTMLInputElement>('[data-param="istar"]')!;
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
			const i = Number(iIn.value);
			const s = Number(sIn.value);
			const un = (x: number) => 100 * ((1 + s / 100) * (1 + x / 100) - 1);
			const be = 100 * ((1 + i / 100) / (1 + s / 100) - 1);
			for (const { el, X, Y } of plots) {
				set(el('un'), { x1: X(-12), y1: Y(un(-12)), x2: X(12), y2: Y(un(12)) });
				set(el('hedged'), { x1: X(-12), y1: Y(i), x2: X(12), y2: Y(i) });
				set(el('vbe'), { x1: X(be), y1: Y(-10), x2: X(be), y2: Y(i) });
				set(el('pt'), { cx: X(be), cy: Y(i) });
			}
			root.querySelector('[data-out="i"]')!.textContent = fmt(i);
			root.querySelector('[data-out="istar"]')!.textContent = fmt(s);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{h}', fmt(i))
				.replace('{be}', fmt(be));
		}

		iIn.addEventListener('input', draw);
		sIn.addEventListener('input', draw);
		draw();
	});
}
