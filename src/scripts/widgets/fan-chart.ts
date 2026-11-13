// Client behavior for FanChart.astro (lesson 4.13). Same model as course/verify/4.13.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const Z = { p5: -1.645, p25: -0.674, p75: 0.674, p95: 1.645 };

// Standard normal CDF (Abramowitz and Stegun 7.1.26).
function phi(x: number) {
	const t = 1 / (1 + 0.3275911 * Math.abs(x) / Math.SQRT2);
	const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(x * x) / 2);
	return x >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

export const quantile = (mu: number, sigma: number, t: number, z: number) => Math.exp((mu - (sigma * sigma) / 2) * t + z * sigma * Math.sqrt(t));

export function initFanChart() {
	document.querySelectorAll<HTMLElement>('[data-widget="fan-chart"]').forEach((root) => {
		const muIn = root.querySelector<HTMLInputElement>('[data-param="mu"]')!;
		const sIn = root.querySelector<HTMLInputElement>('[data-param="sigma"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (n: string) => svg.querySelector<SVGPathElement>(`[data-el="${n}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - Math.min(v, g.yr[1] * 3)) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const mu = Number(muIn.value) / 100;
			const sigma = Number(sIn.value) / 100;
			const ts: number[] = [];
			for (let t = 0; t <= 30; t += 0.5) ts.push(t);
			for (const { el, X, Y } of plots) {
				const line = (f: (t: number) => number) => ts.map((t) => `${X(t).toFixed(1)} ${Y(f(t)).toFixed(1)}`);
				const band = (lo: number, hi: number) =>
					`M ${line((t) => quantile(mu, sigma, t, hi)).join(' L ')} L ${line((t) => quantile(mu, sigma, t, lo)).reverse().join(' L ')} Z`;
				el('outer').setAttribute('d', band(Z.p5, Z.p95));
				el('inner').setAttribute('d', band(Z.p25, Z.p75));
				el('median').setAttribute('d', `M ${line((t) => quantile(mu, sigma, t, 0)).join(' L ')}`);
				el('mean').setAttribute('d', `M ${line((t) => Math.exp(mu * t)).join(' L ')}`);
			}
			root.querySelector('[data-out="mu"]')!.textContent = String(Number(muIn.value));
			root.querySelector('[data-out="sigma"]')!.textContent = String(Number(sIn.value));
			const m = mu - (sigma * sigma) / 2;
			const pBelow = phi((-m * 30) / (sigma * Math.sqrt(30)));
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{mean}', Math.exp(mu * 30).toFixed(2))
				.replace('{med}', quantile(mu, sigma, 30, 0).toFixed(2))
				.replace('{p5}', quantile(mu, sigma, 30, Z.p5).toFixed(2))
				.replace('{p}', (100 * pBelow).toFixed(1));
		}

		muIn.addEventListener('input', draw);
		sIn.addEventListener('input', draw);
		draw();
	});
}
