// Client behavior for AccountCompare.astro (lesson 6.5). Same model as course/verify/6.5.py.
interface Geom {
	W: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
}

const T = 30;
const R = 0.07;

// Taxable stock fund: 5% price growth, 2% dividend taxed at 15% each year (reinvested), 15% on the gain at sale.
export function taxableStock(w0: number, years: number) {
	let w = w0;
	let basis = w0;
	for (let y = 0; y < years; y++) {
		const d = w * 0.02;
		w = w * 1.05 + d * 0.85;
		basis += d * 0.85;
	}
	return w - 0.15 * (w - basis);
}

export function accounts(tNow: number, tLater: number) {
	const g = (1 + R) ** T;
	return [100 * g * (1 - tLater), 100 * (1 - tNow) * g, taxableStock(100 * (1 - tNow), T)];
}

export function initAccountCompare() {
	document.querySelectorAll<HTMLElement>('[data-widget="account-compare"]').forEach((root) => {
		const nIn = root.querySelector<HTMLInputElement>('[data-param="tnow"]')!;
		const lIn = root.querySelector<HTMLInputElement>('[data-param="tlater"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				bars: [0, 1, 2].map((i) => svg.querySelector<SVGRectElement>(`[data-bar="${i}"]`)!),
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
			};
		});

		function draw() {
			const vals = accounts(Number(nIn.value) / 100, Number(lIn.value) / 100);
			for (const { bars, X } of plots) vals.forEach((v, i) => bars[i].setAttribute('width', String(X(v) - X(0))));
			root.querySelector('[data-out="tnow"]')!.textContent = nIn.value;
			root.querySelector('[data-out="tlater"]')!.textContent = lIn.value;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a}', vals[0].toFixed(0))
				.replace('{b}', vals[1].toFixed(0))
				.replace('{c}', vals[2].toFixed(0));
		}

		nIn.addEventListener('input', draw);
		lIn.addEventListener('input', draw);
		draw();
	});
}
