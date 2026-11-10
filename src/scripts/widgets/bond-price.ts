// Client behavior for BondPrice.astro (lesson 3.3): P = c·100·a(y, n) + 100 / (1 + y)^n, annual coupons.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export function bondPrice(c: number, y: number, n: number) {
	const cf = c; // coupon per 100 of face value
	let p = 0;
	for (let t = 1; t <= n; t++) p += cf / (1 + y / 100) ** t;
	return p + 100 / (1 + y / 100) ** n;
}

const fmt = (v: number) => (Math.round(v * 100) / 100).toFixed(2);
const short = (v: number) => fmt(v).replace(/\.?0+$/, '');

export function initBondPrice() {
	document.querySelectorAll<HTMLElement>('[data-widget="bond-price"]').forEach((root) => {
		const inp = (n: string) => root.querySelector<HTMLInputElement>(`[data-param="${n}"]`)!;
		const cIn = inp('c');
		const nIn = inp('n');
		const yIn = inp('y');
		const [premium, discount, atpar] = JSON.parse(root.dataset.kinds!) as string[];
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const c = Number(cIn.value);
			const n = Number(nIn.value);
			const y = Number(yIn.value);
			const p = bondPrice(c, y, n);
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				for (let k = 0; k <= 100; k++) {
					const yy = (10 * k) / 100;
					pts.push(`${X(yy).toFixed(1)},${Y(Math.min(400, bondPrice(c, yy, n))).toFixed(1)}`);
				}
				el('curve').setAttribute('points', pts.join(' '));
				el('pt').setAttribute('cx', X(y).toFixed(1));
				el('pt').setAttribute('cy', Y(Math.min(400, p)).toFixed(1));
			}
			root.querySelector('[data-out="c"]')!.textContent = short(c);
			root.querySelector('[data-out="n"]')!.textContent = String(n);
			root.querySelector('[data-out="y"]')!.textContent = short(y);
			const kind = Math.abs(p - 100) < 0.005 ? atpar : p > 100 ? premium : discount;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{p}', fmt(p))
				.replace('{kind}', kind)
				.replace('{cy}', fmt((100 * c) / p));
		}

		[cIn, nIn, yIn].forEach((e) => e.addEventListener('input', draw));
		draw();
	});
}
