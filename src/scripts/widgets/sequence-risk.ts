// Client behavior for SequenceRisk.astro (lesson 6.9). Same model as course/verify/6.9.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Portfolio value at the end of each year 0..30: withdraw 40 at the start of each year, then earn 5%, or -30% in year k.
export function wealthPath(k: number) {
	let w = 1000;
	const out = [w];
	for (let t = 1; t <= 30; t++) {
		w = Math.max(w - 40, 0) * (t === k ? 0.7 : 1.05);
		out.push(w);
	}
	return out;
}

export function initSequenceRisk() {
	const last = wealthPath(30);
	document.querySelectorAll<HTMLElement>('[data-widget="sequence-risk"]').forEach((root) => {
		const kIn = root.querySelector<HTMLInputElement>('[data-param="k"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="path"]')!,
				last: svg.querySelector<SVGPathElement>('[data-el="last"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});
		const line = (w: number[], X: (v: number) => number, Y: (v: number) => number) =>
			`M ${w.map((v, i) => `${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' L ')}`;

		function draw() {
			const k = Number(kIn.value);
			const p = wealthPath(k);
			for (const pl of plots) {
				pl.path.setAttribute('d', line(p, pl.X, pl.Y));
				pl.last.setAttribute('d', line(last, pl.X, pl.Y));
			}
			root.querySelector('[data-out="k"]')!.textContent = String(k);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{k}', String(k))
				.replace('{a}', p[30].toFixed(0))
				.replace('{b}', last[30].toFixed(0));
		}

		kIn.addEventListener('input', draw);
		draw();
	});
}
