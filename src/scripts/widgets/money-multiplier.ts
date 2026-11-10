// Client behavior for MoneyMultiplier.astro (lesson 2.3). Base money 100; each round's new money splits
// into currency and deposits in the ratio c : 1, banks lend (1 - r) of the deposits, and the loans are the
// next round's new money. Cumulative money after round t is 100 (1 - q^(t+1)) / (1 - q), q = (1 - r) / (1 + c).
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
	rounds: number;
}

const BASE = 100;
const num = (v: number) => (Math.round(v * 100) / 100).toFixed(2);
const amt = (v: number) => (Math.round(v * 10) / 10).toFixed(1);

export function initMoneyMultiplier() {
	document.querySelectorAll<HTMLElement>('[data-widget="money-multiplier"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const cIn = root.querySelector<HTMLInputElement>('[data-param="c"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				g,
				svg,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const r = Number(rIn.value);
			const c = Number(cIn.value);
			const q = (1 - r) / (1 + c);
			const m = (1 + c) / (c + r);
			for (const { g, svg, X, Y } of plots) {
				const w = (X(1) - X(0)) * 0.7;
				const bars = svg.querySelectorAll<SVGRectElement>('[data-el="bars"] rect');
				let total = 0;
				bars.forEach((bar, t) => {
					total += BASE * Math.pow(q, t);
					bar.setAttribute('x', (X(t) - w / 2).toFixed(1));
					bar.setAttribute('width', w.toFixed(1));
					bar.setAttribute('y', Y(total).toFixed(1));
					bar.setAttribute('height', (Y(0) - Y(total)).toFixed(1));
				});
				const lim = svg.querySelector<SVGLineElement>('[data-el="lim"]')!;
				lim.setAttribute('y1', Y(m * BASE).toFixed(1));
				lim.setAttribute('y2', Y(m * BASE).toFixed(1));
				void g;
			}
			const M = m * BASE;
			const D = M / (1 + c);
			root.querySelector('[data-out="r"]')!.textContent = r.toFixed(2);
			root.querySelector('[data-out="c"]')!.textContent = c.toFixed(2);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{m}', num(m))
				.replace('{M}', amt(M))
				.replace('{C}', amt(c * D))
				.replace('{D}', amt(D))
				.replace('{R}', amt(r * D));
		}

		rIn.addEventListener('input', draw);
		cIn.addEventListener('input', draw);
		draw();
	});
}
