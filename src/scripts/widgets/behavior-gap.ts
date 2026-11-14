// Client behavior for BehaviorGap.astro (lesson 6.10). Same model as course/verify/6.10.py.
interface Geom {
	W: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
}

export const RETURNS = [0.2, 0.25, 0.15, -0.3, -0.1, 0.25, 0.2, 0.1];

export function timeWeighted() {
	return RETURNS.reduce((p, r) => p * (1 + r), 1) ** (1 / RETURNS.length) - 1;
}

// Investor's dollar-weighted return (IRR) when adding 20 + 100 k (last year's return) at the start of each later year.
export function dollarWeighted(k: number) {
	const flows = [-100];
	let v = 100;
	RETURNS.forEach((r, t) => {
		if (t > 0) {
			const f = 20 + k * 100 * RETURNS[t - 1];
			v += f;
			flows.push(-f);
		}
		v *= 1 + r;
	});
	flows.push(v);
	const npv = (x: number) => flows.reduce((s, f, i) => s + f / (1 + x) ** i, 0);
	let lo = -0.5;
	let hi = 0.5;
	for (let i = 0; i < 100; i++) {
		const m = (lo + hi) / 2;
		if (npv(m) > 0) lo = m;
		else hi = m;
	}
	return lo;
}

export function initBehaviorGap() {
	const tw = timeWeighted();
	document.querySelectorAll<HTMLElement>('[data-widget="behavior-gap"]').forEach((root) => {
		const kIn = root.querySelector<HTMLInputElement>('[data-param="k"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				bars: [0, 1].map((i) => svg.querySelector<SVGRectElement>(`[data-bar="${i}"]`)!),
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
			};
		});

		function draw() {
			const k = Number(kIn.value);
			const dw = dollarWeighted(k);
			for (const { bars, X } of plots) [tw, dw].forEach((v, i) => bars[i].setAttribute('width', String(X(100 * v) - X(0))));
			root.querySelector('[data-out="k"]')!.textContent = k.toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{t}', (100 * tw).toFixed(2))
				.replace('{d}', (100 * dw).toFixed(2))
				.replace('{g}', (100 * (tw - dw)).toFixed(2));
		}

		kIn.addEventListener('input', draw);
		draw();
	});
}
