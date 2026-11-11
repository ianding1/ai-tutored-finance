// Client behavior for LeverageGrowth.astro (lesson 4.1). Same model as course/verify/4.1.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const RF = 3;

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initLeverageGrowth() {
	document.querySelectorAll<HTMLElement>('[data-widget="leverage-growth"]').forEach((root) => {
		const input = (name: string) => root.querySelector<HTMLInputElement>(`[data-param="${name}"]`)!;
		const muIn = input('mu');
		const sIn = input('sigma');
		const lIn = input('lev');
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const mu = Number(muIn.value);
			const sigma = Number(sIn.value);
			const lev = Number(lIn.value);
			const mean = (x: number) => RF + x * (mu - RF);
			const growth = (x: number) => mean(x) - (x * sigma) ** 2 / 200;
			const ls = (mu - RF) / ((sigma * sigma) / 100);
			const clamp = (v: number) => Math.max(-200, Math.min(200, v));
			for (const { el, X, Y } of plots) {
				const line = (f: (x: number) => number) => {
					const pts: string[] = [];
					for (let k = 0; k <= 80; k++) {
						const x = (4 * k) / 80;
						pts.push(`${X(x).toFixed(1)},${Y(clamp(f(x))).toFixed(1)}`);
					}
					return pts.join(' ');
				};
				el('mean').setAttribute('points', line(mean));
				el('growth').setAttribute('points', line(growth));
				el('vx').setAttribute('x1', X(lev).toFixed(1));
				el('vx').setAttribute('x2', X(lev).toFixed(1));
				el('pt').setAttribute('cx', X(lev).toFixed(1));
				el('pt').setAttribute('cy', Y(clamp(growth(lev))).toFixed(1));
			}
			root.querySelector('[data-out="mu"]')!.textContent = String(mu);
			root.querySelector('[data-out="sigma"]')!.textContent = String(sigma);
			root.querySelector('[data-out="lev"]')!.textContent = String(lev);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{L}', String(lev))
				.replace('{m}', fmt(mean(lev)))
				.replace('{s}', fmt(lev * sigma))
				.replace('{g}', fmt(growth(lev)))
				.replace('{gmax}', fmt(growth(ls)))
				.replace('{ls}', fmt(ls));
		}

		for (const el of [muIn, sIn, lIn]) el.addEventListener('input', draw);
		draw();
	});
}
