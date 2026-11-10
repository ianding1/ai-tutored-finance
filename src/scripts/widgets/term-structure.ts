// Client behavior for TermStructure.astro (lesson 3.5). Same model as course/verify/3.5.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const S1 = 4;
const DECAY = 0.7;
const NS = 'http://www.w3.org/2000/svg';

// Yields for maturities 1..10: [with premium, expectations only].
function curves(lr: number, tp: number) {
	const full: number[] = [];
	const eh: number[] = [];
	let sf = 0;
	let se = 0;
	for (let t = 1; t <= 10; t++) {
		const e = lr + (S1 - lr) * DECAY ** (t - 1);
		se += e;
		sf += e + (tp * (t - 1)) / 9;
		eh.push(se / t);
		full.push(sf / t);
	}
	return { full, eh };
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initTermStructure() {
	document.querySelectorAll<HTMLElement>('[data-widget="term-structure"]').forEach((root) => {
		const lrIn = root.querySelector<HTMLInputElement>('[data-param="lr"]')!;
		const tpIn = root.querySelector<HTMLInputElement>('[data-param="tp"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const lr = Number(lrIn.value);
			const tp = Number(tpIn.value);
			const { full, eh } = curves(lr, tp);
			for (const { el, X, Y } of plots) {
				const pts = (ys: number[]) => ys.map((y, i) => `${X(i + 1).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
				el('eh').setAttribute('points', pts(eh));
				el('full').setAttribute('points', pts(full));
				const dots = el('dots');
				dots.replaceChildren(
					...full.map((y, i) => {
						const c = document.createElementNS(NS, 'circle');
						c.setAttribute('class', 'viz-min');
						c.setAttribute('r', '3.5');
						c.setAttribute('cx', X(i + 1).toFixed(1));
						c.setAttribute('cy', Y(y).toFixed(1));
						return c;
					}),
				);
			}
			root.querySelector('[data-out="lr"]')!.textContent = String(lr);
			root.querySelector('[data-out="tp"]')!.textContent = String(tp);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{y2}', fmt(full[1]))
				.replace('{y10}', fmt(full[9]))
				.replace('{e10}', fmt(eh[9]))
				.replace('{t10}', fmt(full[9] - eh[9]));
		}

		lrIn.addEventListener('input', draw);
		tpIn.addEventListener('input', draw);
		draw();
	});
}
