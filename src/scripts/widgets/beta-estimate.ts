// Client behavior for BetaEstimate.astro (lesson 4.5). Same model as course/verify/4.5.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const N = 120;
const SVG_NS = 'http://www.w3.org/2000/svg';

// mulberry32: a small seeded generator, so every visitor sees the same sample.
function rng(seed: number) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// Standard normal draws by the Box–Muller method.
function normals(seed: number, n: number) {
	const u = rng(seed);
	const out: number[] = [];
	while (out.length < n) {
		const r = Math.sqrt(-2 * Math.log(1 - u()));
		const th = 2 * Math.PI * u();
		out.push(r * Math.cos(th), r * Math.sin(th));
	}
	return out.slice(0, n);
}

const Z = normals(1, N);
const U = normals(1087, N);
const MKT = Z.map((z) => 0.5 + 4.5 * z);

export function fit(beta: number, sig: number, months: number) {
	const x = MKT.slice(0, months);
	const y = x.map((v, i) => beta * v + sig * U[i]);
	const mx = x.reduce((s, v) => s + v, 0) / months;
	const my = y.reduce((s, v) => s + v, 0) / months;
	let sxx = 0;
	let sxy = 0;
	let syy = 0;
	for (let i = 0; i < months; i++) {
		sxx += (x[i] - mx) ** 2;
		sxy += (x[i] - mx) * (y[i] - my);
		syy += (y[i] - my) ** 2;
	}
	const b = sxy / sxx;
	const a = my - b * mx;
	const ssr = syy - b * sxy;
	const se = Math.sqrt(ssr / (months - 2)) / Math.sqrt(sxx);
	return { x, y, a, b, se, r2: 1 - ssr / syy };
}

export function initBetaEstimate() {
	document.querySelectorAll<HTMLElement>('[data-widget="beta-estimate"]').forEach((root) => {
		const input = (name: string) => root.querySelector<HTMLInputElement>(`[data-param="${name}"]`)!;
		const ins = { beta: input('beta'), sig: input('sig'), months: input('months') };
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				g,
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});
		const line = (el: SVGElement, X: (v: number) => number, Y: (v: number) => number, xr: number[], a: number, b: number) => {
			el.setAttribute('x1', X(xr[0]).toFixed(1));
			el.setAttribute('y1', Y(a + b * xr[0]).toFixed(1));
			el.setAttribute('x2', X(xr[1]).toFixed(1));
			el.setAttribute('y2', Y(a + b * xr[1]).toFixed(1));
		};

		function draw() {
			const beta = Number(ins.beta.value);
			const sig = Number(ins.sig.value);
			const months = Number(ins.months.value);
			const f = fit(beta, sig, months);
			for (const { g, el, X, Y } of plots) {
				const pts = el('points');
				pts.replaceChildren(
					...f.x.map((v, i) => {
						const c = document.createElementNS(SVG_NS, 'circle');
						c.setAttribute('class', 'viz-point');
						c.setAttribute('cx', X(v).toFixed(1));
						c.setAttribute('cy', Y(f.y[i]).toFixed(1));
						c.setAttribute('r', '3.5');
						return c;
					}),
				);
				line(el('truth'), X, Y, g.xr, 0, beta);
				line(el('est'), X, Y, g.xr, f.a, f.b);
			}
			root.querySelector('[data-out="beta"]')!.textContent = beta.toFixed(1);
			root.querySelector('[data-out="sig"]')!.textContent = String(sig);
			root.querySelector('[data-out="months"]')!.textContent = String(months);
			const text = (root.dataset.readout || '')
				.replace('{b}', f.b.toFixed(2))
				.replace('{se}', f.se.toFixed(2))
				.replace('{lo}', (f.b - 1.96 * f.se).toFixed(2))
				.replace('{hi}', (f.b + 1.96 * f.se).toFixed(2))
				.replace('{r2}', f.r2.toFixed(2));
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = text;
		}

		for (const el of Object.values(ins)) el.addEventListener('input', draw);
		draw();
	});
}
