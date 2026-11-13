// Client behavior for FactorAlpha.astro (lesson 4.6). Same model as course/verify/4.6.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	rows: [number, number];
}

const PREMIA = { mkt: 6, smb: 2, hml: 3 };
const SVG_NS = 'http://www.w3.org/2000/svg';
const BAR_H = 44;

const fmt = (v: number) => {
	const r = Math.round(v * 10) / 10;
	return (Object.is(r, -0) ? 0 : r).toFixed(1);
};

export function initFactorAlpha() {
	document.querySelectorAll<HTMLElement>('[data-widget="factor-alpha"]').forEach((root) => {
		const sIn = root.querySelector<HTMLInputElement>('[data-param="s"]')!;
		const hIn = root.querySelector<HTMLInputElement>('[data-param="h"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				g,
				bars: svg.querySelector<SVGGElement>('[data-el="bars"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
			};
		});

		// Stack positive parts to the right of 0 and negative parts to the left.
		function row(parts: [string, number][], y: number, X: (v: number) => number) {
			let pos = 0;
			let neg = 0;
			return parts
				.filter(([, v]) => Math.abs(v) > 1e-9)
				.map(([cls, v]) => {
					const a = v > 0 ? pos : neg + v;
					if (v > 0) pos += v;
					else neg += v;
					const r = document.createElementNS(SVG_NS, 'rect');
					r.setAttribute('class', `viz-fac viz-fac-${cls}`);
					r.setAttribute('x', X(a).toFixed(1));
					r.setAttribute('width', (X(a + Math.abs(v)) - X(a)).toFixed(1));
					r.setAttribute('y', String(y));
					r.setAttribute('height', String(BAR_H));
					return r;
				});
		}

		function draw() {
			const s = Number(sIn.value);
			const h = Number(hIn.value);
			const size = s * PREMIA.smb;
			const value = h * PREMIA.hml;
			const total = PREMIA.mkt + size + value;
			const capmAlpha = size + value;
			for (const { g, bars, X } of plots) {
				bars.replaceChildren(
					...row([['mkt', PREMIA.mkt], ['alpha', capmAlpha]], g.rows[0], X),
					...row([['mkt', PREMIA.mkt], ['smb', size], ['hml', value]], g.rows[1], X),
				);
			}
			root.querySelector('[data-out="s"]')!.textContent = s.toFixed(1);
			root.querySelector('[data-out="h"]')!.textContent = h.toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{r}', fmt(total))
				.replace('{a}', fmt(capmAlpha));
		}

		sIn.addEventListener('input', draw);
		hIn.addEventListener('input', draw);
		draw();
	});
}
