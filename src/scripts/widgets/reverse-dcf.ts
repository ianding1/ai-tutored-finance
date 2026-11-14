// Client behavior for ReverseDcf.astro (lesson 6.8). Same model as course/verify/6.8.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Value per 1 of this year's free cash flow: 10 years of growth g, then 3% forever, discounted at r.
export function value(g: number, r: number) {
	let v = 0;
	for (let t = 1; t <= 10; t++) v += ((1 + g) / (1 + r)) ** t;
	return v + ((1 + g) ** 10 * 1.03) / (r - 0.03) / (1 + r) ** 10;
}

export function implied(multiple: number, r: number) {
	let lo = -0.2;
	let hi = 0.6;
	for (let i = 0; i < 100; i++) {
		const m = (lo + hi) / 2;
		if (value(m, r) < multiple) lo = m;
		else hi = m;
	}
	return lo;
}

export function initReverseDcf() {
	document.querySelectorAll<HTMLElement>('[data-widget="reverse-dcf"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="g"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - Math.max(g.yr[0], Math.min(g.yr[1], v))) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const r = Number(rIn.value) / 100;
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let m = 10; m <= 80; m += 1) pts.push(`${X(m).toFixed(1)} ${Y(100 * implied(m, r)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="r"]')!.textContent = rIn.value;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a}', (100 * implied(20, r)).toFixed(1))
				.replace('{b}', (100 * implied(40, r)).toFixed(1))
				.replace('{c}', (100 * implied(60, r)).toFixed(1));
		}

		rIn.addEventListener('input', draw);
		draw();
	});
}
