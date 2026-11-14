// Client behavior for SwapValue.astro (lesson 5.4). Same model as course/verify/5.4.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Value to the fixed payer: floating leg (worth par at a reset date) minus a 4% annual-coupon bond.
export function swapValue(x: number, n: number) {
	let fixed = 0;
	for (let t = 1; t <= n; t++) fixed += 4 / (1 + x) ** t;
	return 100 - fixed - 100 / (1 + x) ** n;
}

export function initSwapValue() {
	document.querySelectorAll<HTMLElement>('[data-widget="swap-value"]').forEach((root) => {
		const nIn = root.querySelector<HTMLInputElement>('[data-param="n"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="value"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const n = Number(nIn.value);
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let x = 2; x <= 6.0001; x += 0.05) pts.push(`${X(x).toFixed(1)} ${Y(swapValue(x / 100, n)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="n"]')!.textContent = String(n);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{v5}', swapValue(0.05, n).toFixed(2))
				.replace('{v3}', swapValue(0.03, n).toFixed(2));
		}

		nIn.addEventListener('input', draw);
		draw();
	});
}
