// Client behavior for GordonPrice.astro (lesson 3.9). Same model as course/verify/3.9.py, D1 = 2.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const D1 = 2;

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initGordonPrice() {
	document.querySelectorAll<HTMLElement>('[data-widget="gordon-price"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="r"]')!;
		const gIn = root.querySelector<HTMLInputElement>('[data-param="g"]')!;
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
			const g = Number(gIn.value);
			const price = (x: number) => D1 / ((r - x) / 100);
			const ok = g < r;
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				const top = r - 0.005;
				for (let k = 0; k <= 200; k++) {
					const x = (top * k) / 200;
					pts.push(`${X(x).toFixed(1)},${Y(Math.min(400, price(x))).toFixed(1)}`);
				}
				el('curve').setAttribute('points', pts.join(' '));
				el('asym').setAttribute('x1', X(r).toFixed(1));
				el('asym').setAttribute('x2', X(r).toFixed(1));
				el('pt').setAttribute('visibility', ok ? 'visible' : 'hidden');
				if (ok) {
					el('pt').setAttribute('cx', X(g).toFixed(1));
					el('pt').setAttribute('cy', Y(Math.min(400, price(g))).toFixed(1));
				}
			}
			root.querySelector('[data-out="r"]')!.textContent = String(r);
			root.querySelector('[data-out="g"]')!.textContent = String(g);
			const out = root.querySelector<HTMLElement>('[data-el="readout"]')!;
			if (!ok) {
				out.textContent = root.dataset.invalid || '';
				return;
			}
			const p = price(g);
			const p2 = g + 0.5 < r ? price(g + 0.5) : NaN;
			out.textContent = (root.dataset.readout || '')
				.replace('{p}', fmt(p))
				.replace('{p2}', Number.isFinite(p2) ? fmt(p2) : '∞')
				.replace('{c}', Number.isFinite(p2) ? fmt(100 * (p2 / p - 1)) : '∞');
		}

		rIn.addEventListener('input', draw);
		gIn.addEventListener('input', draw);
		draw();
	});
}
