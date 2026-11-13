// Client behavior for BuildingBlocks.astro (lesson 4.11). Same model as course/verify/4.11.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	row: number;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const BAR_H = 44;
const PARAMS = ['y', 'g', 'i', 'pe0', 'pe1'] as const;

export const valuation = (pe0: number, pe1: number) => 100 * ((pe1 / pe0) ** 0.1 - 1);

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initBuildingBlocks() {
	document.querySelectorAll<HTMLElement>('[data-widget="building-blocks"]').forEach((root) => {
		const ins = Object.fromEntries(PARAMS.map((p) => [p, root.querySelector<HTMLInputElement>(`[data-param="${p}"]`)!]));
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				g,
				bars: svg.querySelector<SVGGElement>('[data-el="bars"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
			};
		});

		function draw() {
			const v = Object.fromEntries(PARAMS.map((p) => [p, Number(ins[p].value)])) as Record<(typeof PARAMS)[number], number>;
			const val = valuation(v.pe0, v.pe1);
			const parts: [string, number][] = [['mkt', v.y], ['smb', v.g], ['hml', v.i], ['alpha', val]];
			for (const { g, bars, X } of plots) {
				let pos = 0;
				let neg = 0;
				bars.replaceChildren(
					...parts
						.filter(([, x]) => Math.abs(x) > 1e-9)
						.map(([cls, x]) => {
							const a = x > 0 ? pos : neg + x;
							if (x > 0) pos += x;
							else neg += x;
							const r = document.createElementNS(SVG_NS, 'rect');
							r.setAttribute('class', `viz-fac viz-fac-${cls}`);
							r.setAttribute('x', X(a).toFixed(1));
							r.setAttribute('width', (X(a + Math.abs(x)) - X(a)).toFixed(1));
							r.setAttribute('y', String(g.row));
							r.setAttribute('height', String(BAR_H));
							return r;
						}),
				);
			}
			for (const p of PARAMS) root.querySelector(`[data-out="${p}"]`)!.textContent = String(v[p]);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{n}', fmt(v.y + v.g + v.i + val))
				.replace('{r}', fmt(v.y + v.g + val))
				.replace('{v}', fmt(val));
		}

		for (const p of PARAMS) ins[p].addEventListener('input', draw);
		draw();
	});
}
