// Client behavior for TwoAssetFrontier.astro (lesson 4.2). Same model as course/verify/4.2.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const MA = 10;
const SA = 20;
const MB = 5;
const SB = 10;

function point(w: number, rho: number) {
	const m = w * MA + (1 - w) * MB;
	const v = (w * SA) ** 2 + ((1 - w) * SB) ** 2 + 2 * w * (1 - w) * rho * SA * SB;
	return { m, s: Math.sqrt(Math.max(0, v)) };
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initTwoAssetFrontier() {
	document.querySelectorAll<HTMLElement>('[data-widget="two-asset-frontier"]').forEach((root) => {
		const rIn = root.querySelector<HTMLInputElement>('[data-param="rho"]')!;
		const wIn = root.querySelector<HTMLInputElement>('[data-param="w"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const rho = Number(rIn.value);
			const w = Number(wIn.value);
			for (const { el, X, Y } of plots) {
				const seg = (a: number, b: number) => {
					const pts: string[] = [];
					for (let k = 0; k <= 100; k++) {
						const p = point(a + ((b - a) * k) / 100, rho);
						pts.push(`${X(p.s).toFixed(1)},${Y(p.m).toFixed(1)}`);
					}
					return pts.join(' ');
				};
				el('shortLo').setAttribute('points', seg(-0.5, 0));
				el('shortHi').setAttribute('points', seg(1, 1.5));
				el('long').setAttribute('points', seg(0, 1));
				const p = point(w, rho);
				el('pt').setAttribute('cx', X(p.s).toFixed(1));
				el('pt').setAttribute('cy', Y(p.m).toFixed(1));
			}
			const p = point(w, rho);
			root.querySelector('[data-out="rho"]')!.textContent = rho.toFixed(1);
			root.querySelector('[data-out="w"]')!.textContent = String(w);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{w}', String(w))
				.replace('{m}', fmt(p.m))
				.replace('{s}', fmt(p.s));
		}

		rIn.addEventListener('input', draw);
		wIn.addEventListener('input', draw);
		draw();
	});
}
