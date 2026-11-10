// Client behavior for NpvProfile.astro (lesson 3.2): marks the NPV of projects A and B at the chosen rate.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const npv = (c: number[], r: number) => c.reduce((s, x, t) => s + x / (1 + r / 100) ** t, 0);
const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initNpvProfile() {
	document.querySelectorAll<HTMLElement>('[data-widget="npv-profile"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const { A, B } = JSON.parse(root.dataset.flows!) as { A: number[]; B: number[] };
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const r = Number(rIn.value);
			const a = npv(A, r);
			const b = npv(B, r);
			for (const { el, X, Y } of plots) {
				el('vr').setAttribute('x1', X(r).toFixed(1));
				el('vr').setAttribute('x2', X(r).toFixed(1));
				el('pa').setAttribute('cx', X(r).toFixed(1));
				el('pa').setAttribute('cy', Y(a).toFixed(1));
				el('pb').setAttribute('cx', X(r).toFixed(1));
				el('pb').setAttribute('cy', Y(b).toFixed(1));
			}
			root.querySelector('[data-out="r"]')!.textContent = String(r);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{r}', String(r))
				.replace('{a}', fmt(a))
				.replace('{b}', fmt(b));
		}

		rIn.addEventListener('input', draw);
		draw();
	});
}
