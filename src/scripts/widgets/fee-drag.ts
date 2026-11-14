// Client behavior for FeeDrag.astro (lesson 5.5). Same model as course/verify/5.5.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Yearly return after a management fee m and a 20% incentive fee on the positive remainder (both in %).
export const netReturn = (g: number, m: number) => (g - m > 0 ? 0.8 * (g - m) : g - m);

export function initFeeDrag() {
	document.querySelectorAll<HTMLElement>('[data-widget="fee-drag"]').forEach((root) => {
		const gIn = root.querySelector<HTMLInputElement>('[data-param="g"]')!;
		const mIn = root.querySelector<HTMLInputElement>('[data-param="m"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				gross: svg.querySelector<SVGPathElement>('[data-el="gross"]')!,
				net: svg.querySelector<SVGPathElement>('[data-el="net"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const g = Number(gIn.value);
			const m = Number(mIn.value);
			const n = netReturn(g, m);
			for (const p of plots) {
				const a: string[] = [];
				const b: string[] = [];
				for (let t = 0; t <= 20; t++) {
					a.push(`${p.X(t).toFixed(1)} ${p.Y(100 * (1 + g / 100) ** t).toFixed(1)}`);
					b.push(`${p.X(t).toFixed(1)} ${p.Y(100 * (1 + n / 100) ** t).toFixed(1)}`);
				}
				p.gross.setAttribute('d', `M ${a.join(' L ')}`);
				p.net.setAttribute('d', `M ${b.join(' L ')}`);
			}
			const g20 = 100 * (1 + g / 100) ** 20;
			const n20 = 100 * (1 + n / 100) ** 20;
			root.querySelector('[data-out="g"]')!.textContent = String(g);
			root.querySelector('[data-out="m"]')!.textContent = String(m);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{n}', n.toFixed(1))
				.replace('{p}', ((100 * (g - n)) / g).toFixed(0))
				.replace('{g20}', g20.toFixed(0))
				.replace('{n20}', n20.toFixed(0))
				.replace('{s}', ((100 * (g20 - n20)) / (g20 - 100)).toFixed(0));
		}

		gIn.addEventListener('input', draw);
		mIn.addEventListener('input', draw);
		draw();
	});
}
