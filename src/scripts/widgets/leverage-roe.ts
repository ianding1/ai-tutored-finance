// Client behavior for LeverageRoe.astro (lesson 3.8). Same model as course/verify/3.8.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initLeverageRoe() {
	document.querySelectorAll<HTMLElement>('[data-widget="leverage-roe"]').forEach((root) => {
		const input = (name: string) => root.querySelector<HTMLInputElement>(`[data-param="${name}"]`)!;
		const deIn = input('de');
		const rIn = input('r');
		const aIn = input('roa');
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const de = Number(deIn.value);
			const r = Number(rIn.value);
			const a = Number(aIn.value);
			const roe = (x: number) => x + (x - r) * de;
			const clamp = (v: number) => Math.max(-200, Math.min(200, v));
			for (const { el, X, Y } of plots) {
				el('lev').setAttribute('points', `${X(-10).toFixed(1)},${Y(clamp(roe(-10))).toFixed(1)} ${X(20).toFixed(1)},${Y(clamp(roe(20))).toFixed(1)}`);
				el('vx').setAttribute('x1', X(a).toFixed(1));
				el('vx').setAttribute('x2', X(a).toFixed(1));
				el('pt').setAttribute('cx', X(a).toFixed(1));
				el('pt').setAttribute('cy', Y(Math.max(-60, Math.min(60, roe(a)))).toFixed(1));
			}
			root.querySelector('[data-out="de"]')!.textContent = String(de);
			root.querySelector('[data-out="r"]')!.textContent = String(r);
			root.querySelector('[data-out="roa"]')!.textContent = String(a);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.split('{a}')
				.join(String(a))
				.replace('{e}', fmt(roe(a)));
		}

		for (const el of [deIn, rIn, aIn]) el.addEventListener('input', draw);
		draw();
	});
}
