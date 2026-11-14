// Client behavior for Rebalance.astro (lesson 6.7). Same model as course/verify/6.7.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const SEED = 6;

// One simulated path of 40 yearly (stock, bond) returns from a fixed linear congruential generator.
export function returnPath(seed = SEED, years = 40): [number, number][] {
	let x = seed;
	const u = () => {
		x = (1664525 * x + 1013904223) % 4294967296;
		return (x + 0.5) / 4294967296;
	};
	const out: [number, number][] = [];
	for (let t = 0; t < years; t++) {
		const u1 = u();
		const u2 = u();
		const u3 = u();
		const u4 = u();
		const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
		const z2 = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4);
		out.push([0.07 + 0.17 * z1, 0.04 + 0.06 * z2]);
	}
	return out;
}

// Stock weights at the end of each year (after any rebalancing) and the number of rebalances.
export function simulate(path: [number, number][], band: number | null) {
	let s = 60;
	let b = 40;
	let n = 0;
	const w = [0.6];
	for (const [rs, rb] of path) {
		s *= 1 + rs;
		b *= 1 + rb;
		if (band !== null && Math.abs(s / (s + b) - 0.6) > band) {
			const tot = s + b;
			s = 0.6 * tot;
			b = 0.4 * tot;
			n++;
		}
		w.push(s / (s + b));
	}
	return { w, n };
}

export function initRebalance() {
	const path = returnPath();
	const none = simulate(path, null);
	document.querySelectorAll<HTMLElement>('[data-widget="rebalance"]').forEach((root) => {
		const bIn = root.querySelector<HTMLInputElement>('[data-param="band"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				none: svg.querySelector<SVGPathElement>('[data-el="none"]')!,
				band: svg.querySelector<SVGPathElement>('[data-el="band"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});
		const line = (w: number[], X: (v: number) => number, Y: (v: number) => number) =>
			`M ${w.map((v, i) => `${X(i).toFixed(1)} ${Y(100 * v).toFixed(1)}`).join(' L ')}`;

		function draw() {
			const band = simulate(path, Number(bIn.value) / 100);
			for (const p of plots) {
				p.none.setAttribute('d', line(none.w, p.X, p.Y));
				p.band.setAttribute('d', line(band.w, p.X, p.Y));
			}
			root.querySelector('[data-out="band"]')!.textContent = bIn.value;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{e}', (100 * none.w[40]).toFixed(0))
				.replace('{m}', (100 * Math.max(...none.w)).toFixed(0))
				.replace('{n}', String(band.n));
		}

		bIn.addEventListener('input', draw);
		draw();
	});
}
