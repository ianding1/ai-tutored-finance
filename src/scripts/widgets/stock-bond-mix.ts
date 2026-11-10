// Client behavior for StockBondMix.astro (lesson 2.8): σ_p = sqrt((16w)² + (6(1-w))² + 2ρ·16·6·w(1-w)).
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const S_STOCK = 16;
const S_BOND = 6;
const sd = (w: number, rho: number) =>
	Math.sqrt((S_STOCK * w) ** 2 + (S_BOND * (1 - w)) ** 2 + 2 * rho * S_STOCK * S_BOND * w * (1 - w));
const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2).replace(/\.?0+$/, '');
};

export function initStockBondMix() {
	document.querySelectorAll<HTMLElement>('[data-widget="stock-bond-mix"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="rho"]')!;
		const wIn = root.querySelector<HTMLInputElement>('[data-param="w"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const rho = Math.round(Number(rIn.value) * 10) / 10;
			const w = Math.round(Number(wIn.value) * 10) / 10;
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				for (let k = 0; k <= 100; k++) pts.push(`${X(k / 100).toFixed(1)},${Y(sd(k / 100, rho)).toFixed(1)}`);
				el('cur').setAttribute('points', pts.join(' '));
				el('pt').setAttribute('cx', X(w).toFixed(1));
				el('pt').setAttribute('cy', Y(sd(w, rho)).toFixed(1));
			}
			root.querySelector('[data-out="rho"]')!.textContent = fmt(rho);
			root.querySelector('[data-out="w"]')!.textContent = fmt(w);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{ws}', String(Math.round(w * 100)))
				.replace('{wb}', String(Math.round((1 - w) * 100)))
				.replace('{s}', fmt(sd(w, rho)));
		}

		rIn.addEventListener('input', draw);
		wIn.addEventListener('input', draw);
		draw();
	});
}
