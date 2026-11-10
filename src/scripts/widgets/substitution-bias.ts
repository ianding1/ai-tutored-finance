// Client behavior for SubstitutionBias.astro (lesson 2.1): fixed-basket rise 0.5 a versus the rise in the
// cost of the same utility, 100 (sqrt(1 + a/100) − 1), for half-and-half Cobb–Douglas spending.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const num = (v: number) => (Math.round(v * 100) / 100).toFixed(2);

export function initSubstitutionBias() {
	document.querySelectorAll<HTMLElement>('[data-widget="substitution-bias"]').forEach((root) => {
		const aIn = root.querySelector<HTMLInputElement>('[data-param="a"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const a = Number(aIn.value);
			const fixed = 0.5 * a;
			const t = 100 * (Math.sqrt(1 + a / 100) - 1);
			for (const { el, X, Y } of plots) {
				const g = el('gap');
				g.setAttribute('x1', X(a).toFixed(1));
				g.setAttribute('x2', X(a).toFixed(1));
				g.setAttribute('y1', Y(fixed).toFixed(1));
				g.setAttribute('y2', Y(t).toFixed(1));
			}
			root.querySelector('[data-out="a"]')!.textContent = String(a);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{fixed}', num(fixed))
				.replace('{true}', num(t))
				.replace('{gap}', num(fixed - t));
		}

		aIn.addEventListener('input', draw);
		draw();
	});
}
