// Client behavior for TaylorRule.astro (lesson 2.5): i = r* + π + 0.5 (π - 2) + 0.5 · gap.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2).replace(/\.?0+$/, '');
};

export function initTaylorRule() {
	document.querySelectorAll<HTMLElement>('[data-widget="taylor-rule"]').forEach((root) => {
		const inp = (n: string) => root.querySelector<HTMLInputElement>(`[data-param="${n}"]`)!;
		const piIn = inp('pi');
		const gapIn = inp('gap');
		const rIn = inp('rstar');
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});
		const set = (e: SVGElement, a: Record<string, number>) => {
			for (const [k, v] of Object.entries(a)) e.setAttribute(k, v.toFixed(1));
		};

		function draw() {
			const pi = Number(piIn.value);
			const gap = Number(gapIn.value);
			const rs = Number(rIn.value);
			const rule = (p: number) => rs + p + 0.5 * (p - 2) + 0.5 * gap;
			const i = rule(pi);
			for (const { el, X, Y } of plots) {
				set(el('rule'), { x1: X(-2), y1: Y(rule(-2)), x2: X(10), y2: Y(rule(10)) });
				set(el('neutral'), { x1: X(-2), y1: Y(rs - 2), x2: X(10), y2: Y(rs + 10) });
				set(el('real'), { x1: X(pi), y1: Y(rs + pi), x2: X(pi), y2: Y(i) });
				set(el('pt'), { cx: X(pi), cy: Y(i) });
			}
			root.querySelector('[data-out="pi"]')!.textContent = fmt(pi);
			root.querySelector('[data-out="gap"]')!.textContent = fmt(gap);
			root.querySelector('[data-out="rstar"]')!.textContent = fmt(rs);
			const d = i - pi - rs;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{i}', fmt(i))
				.replace('{real}', fmt(i - pi))
				.replace('{d}', fmt(Math.abs(d)))
				.replace('{dir}', d >= 0 ? root.dataset.above || '' : root.dataset.below || '');
		}

		[piIn, gapIn, rIn].forEach((e) => e.addEventListener('input', draw));
		draw();
	});
}
