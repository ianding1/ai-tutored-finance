// Client behavior for DurationConvexity.astro (lesson 3.4). Bond: 5% annual coupon, n years, initial yield 5%.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const C = 5;
const Y0 = 0.05;

function price(n: number, y: number) {
	let p = 0;
	for (let t = 1; t <= n; t++) p += C / (1 + y) ** t;
	return p + 100 / (1 + y) ** n;
}

function measures(n: number) {
	const p = price(n, Y0);
	let d = 0;
	let cx = 0;
	for (let t = 1; t <= n; t++) {
		const cf = C + (t === n ? 100 : 0);
		d += (t * cf) / (1 + Y0) ** t;
		cx += (t * (t + 1) * cf) / (1 + Y0) ** (t + 2);
	}
	return { p, dm: d / p / (1 + Y0), cx: cx / p };
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initDurationConvexity() {
	document.querySelectorAll<HTMLElement>('[data-widget="duration-convexity"]').forEach((root) => {
		const nIn = root.querySelector<HTMLInputElement>('[data-param="n"]')!;
		const dIn = root.querySelector<HTMLInputElement>('[data-param="dy"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const n = Number(nIn.value);
			const dy = Number(dIn.value);
			const { p, dm, cx } = measures(n);
			const exact = (d: number) => 100 * (price(n, Y0 + d / 100) / p - 1);
			const dur = (d: number) => -dm * d;
			const cvx = (d: number) => -dm * d + 0.5 * cx * (d / 100) ** 2 * 100;
			for (const { el, X, Y } of plots) {
				const line = (f: (d: number) => number) => {
					const pts: string[] = [];
					for (let k = 0; k <= 120; k++) {
						const d = -3 + (6 * k) / 120;
						pts.push(`${X(d).toFixed(1)},${Y(Math.max(-80, Math.min(120, f(d)))).toFixed(1)}`);
					}
					return pts.join(' ');
				};
				el('exact').setAttribute('points', line(exact));
				el('dur').setAttribute('points', line(dur));
				el('cvx').setAttribute('points', line(cvx));
				el('vx').setAttribute('x1', X(dy).toFixed(1));
				el('vx').setAttribute('x2', X(dy).toFixed(1));
				el('pt').setAttribute('cx', X(dy).toFixed(1));
				el('pt').setAttribute('cy', Y(Math.max(-80, Math.min(120, exact(dy)))).toFixed(1));
			}
			root.querySelector('[data-out="n"]')!.textContent = String(n);
			root.querySelector('[data-out="dy"]')!.textContent = String(dy);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{dm}', fmt(dm))
				.replace('{cx}', fmt(cx))
				.replace('{dy}', String(dy))
				.replace('{a}', fmt(exact(dy)))
				.replace('{b}', fmt(dur(dy)))
				.replace('{c}', fmt(cvx(dy)));
		}

		nIn.addEventListener('input', draw);
		dIn.addEventListener('input', draw);
		draw();
	});
}
