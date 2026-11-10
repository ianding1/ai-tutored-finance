// Client behavior for DebtDynamics.astro (lesson 2.6): b(t+1) = (1 + r) / (1 + g) · b(t) + d, b(0) = 100.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
	years: number;
}

const fmt = (v: number, dp: number) => {
	const k = 10 ** dp;
	const r = Math.round(v * k) / k;
	return (Object.is(r, -0) ? 0 : r).toFixed(dp);
};
const short = (v: number) => fmt(v, 2).replace(/\.?0+$/, '');

export function initDebtDynamics() {
	document.querySelectorAll<HTMLElement>('[data-widget="debt-dynamics"]').forEach((root) => {
		const inp = (n: string) => root.querySelector<HTMLInputElement>(`[data-param="${n}"]`)!;
		const dIn = inp('d');
		const rIn = inp('r');
		const gIn = inp('g');
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				g,
				line: svg.querySelector<SVGPolylineElement>('[data-el="path"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const d = Number(dIn.value);
			const r = Number(rIn.value) / 100;
			const g = Number(gIn.value) / 100;
			const years = plots[0].g.years;
			const bs = [100];
			for (let t = 0; t < years; t++) bs.push(((1 + r) / (1 + g)) * bs[t] + d);
			for (const { line, X, Y } of plots) {
				line.setAttribute('points', bs.map((b, t) => `${X(t).toFixed(1)},${Y(Math.max(-20, Math.min(400, b))).toFixed(1)}`).join(' '));
			}
			root.querySelector('[data-out="d"]')!.textContent = short(d);
			root.querySelector('[data-out="r"]')!.textContent = short(r * 100);
			root.querySelector('[data-out="g"]')!.textContent = short(g * 100);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{b}', fmt(bs[years], 1))
				.replace('{s}', fmt((100 * (g - r)) / (1 + g), 2));
		}

		[dIn, rIn, gIn].forEach((e) => e.addEventListener('input', draw));
		draw();
	});
}
