// Client behavior for ValueDriver.astro (lesson 3.10). Same model as course/verify/3.10.py.
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

export function initValueDriver() {
	document.querySelectorAll<HTMLElement>('[data-widget="value-driver"]').forEach((root) => {
		const input = (name: string) => root.querySelector<HTMLInputElement>(`[data-param="${name}"]`)!;
		const roicIn = input('roic');
		const waccIn = input('wacc');
		const gIn = input('g');
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const roic = Number(roicIn.value);
			const wacc = Number(waccIn.value);
			const g = Number(gIn.value);
			const m = (x: number) => (1 - x / roic) / ((wacc - x) / 100);
			const clamp = (v: number) => Math.max(-20, Math.min(100, v));
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				const top = Math.min(6, wacc - 0.2);
				for (let k = 0; k <= 120; k++) {
					const x = (top * k) / 120;
					pts.push(`${X(x).toFixed(1)},${Y(clamp(m(x))).toFixed(1)}`);
				}
				el('curve').setAttribute('points', pts.join(' '));
				el('base').setAttribute('y1', Y(m(0)).toFixed(1));
				el('base').setAttribute('y2', Y(m(0)).toFixed(1));
				el('pt').setAttribute('cx', X(g).toFixed(1));
				el('pt').setAttribute('cy', Y(clamp(m(g))).toFixed(1));
			}
			root.querySelector('[data-out="roic"]')!.textContent = String(roic);
			root.querySelector('[data-out="wacc"]')!.textContent = String(wacc);
			root.querySelector('[data-out="g"]')!.textContent = String(g);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{g}', String(g))
				.replace('{m}', fmt(m(g)))
				.replace('{m0}', fmt(m(0)));
		}

		for (const el of [roicIn, waccIn, gIn]) el.addEventListener('input', draw);
		draw();
	});
}
