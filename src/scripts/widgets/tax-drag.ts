// Client behavior for TaxDrag.astro (lesson 6.1). Same model as course/verify/6.1.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const R = 0.07;

// After-tax value if sold after each year 0..T: [paying fund, non-paying fund].
export function paths(d: number, t: number, T = 30) {
	let w = 100;
	let basis = 100;
	const mf = [100];
	const etf = [100];
	for (let y = 1; y <= T; y++) {
		w *= 1 + R;
		const dist = d * w;
		w -= t * dist;
		basis += (1 - t) * dist;
		mf.push(w - t * (w - basis));
		const e = 100 * (1 + R) ** y;
		etf.push(e - t * (e - 100));
	}
	return { mf, etf };
}

export function initTaxDrag() {
	document.querySelectorAll<HTMLElement>('[data-widget="tax-drag"]').forEach((root) => {
		const dIn = root.querySelector<HTMLInputElement>('[data-param="d"]')!;
		const tIn = root.querySelector<HTMLInputElement>('[data-param="t"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				mf: svg.querySelector<SVGPathElement>('[data-el="mf"]')!,
				etf: svg.querySelector<SVGPathElement>('[data-el="etf"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const { mf, etf } = paths(Number(dIn.value) / 100, Number(tIn.value) / 100);
			for (const p of plots) {
				p.mf.setAttribute('d', `M ${mf.map((v, i) => `${p.X(i).toFixed(1)} ${p.Y(v).toFixed(1)}`).join(' L ')}`);
				p.etf.setAttribute('d', `M ${etf.map((v, i) => `${p.X(i).toFixed(1)} ${p.Y(v).toFixed(1)}`).join(' L ')}`);
			}
			root.querySelector('[data-out="d"]')!.textContent = dIn.value;
			root.querySelector('[data-out="t"]')!.textContent = tIn.value;
			const e = etf[30];
			const m = mf[30];
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{e}', e.toFixed(0))
				.replace('{m}', m.toFixed(0))
				.replace('{g}', ((100 * (e - m)) / e).toFixed(1));
		}

		dIn.addEventListener('input', draw);
		tIn.addEventListener('input', draw);
		draw();
	});
}
