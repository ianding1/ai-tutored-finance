// Client behavior for TangencyCal.astro (lesson 4.3). Same model as course/verify/4.3.py.
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
const RHO = 0.2;

function point(w: number) {
	const m = w * MA + (1 - w) * MB;
	const v = (w * SA) ** 2 + ((1 - w) * SB) ** 2 + 2 * w * (1 - w) * RHO * SA * SB;
	return { m, s: Math.sqrt(v) };
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initTangencyCal() {
	document.querySelectorAll<HTMLElement>('[data-widget="tangency-cal"]').forEach((root) => {
		const rfIn = root.querySelector<HTMLInputElement>('[data-param="rf"]')!;
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
			const rf = Number(rfIn.value);
			const w = Number(wIn.value);
			const p = point(w);
			const sharpe = (p.m - rf) / p.s;
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				for (let k = 0; k <= 120; k++) {
					const q = point(-0.3 + (2 * k) / 120);
					pts.push(`${X(q.s).toFixed(1)},${Y(q.m).toFixed(1)}`);
				}
				el('frontier').setAttribute('points', pts.join(' '));
				el('cal').setAttribute('points', `${X(0).toFixed(1)},${Y(rf).toFixed(1)} ${X(35).toFixed(1)},${Y(rf + sharpe * 35).toFixed(1)}`);
				el('rfpt').setAttribute('cx', X(0).toFixed(1));
				el('rfpt').setAttribute('cy', Y(rf).toFixed(1));
				el('pt').setAttribute('cx', X(p.s).toFixed(1));
				el('pt').setAttribute('cy', Y(p.m).toFixed(1));
			}
			root.querySelector('[data-out="rf"]')!.textContent = String(rf);
			root.querySelector('[data-out="w"]')!.textContent = String(w);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{w}', String(w))
				.replace('{m}', fmt(p.m))
				.replace('{s}', fmt(p.s))
				.replace('{sh}', fmt(sharpe));
		}

		rfIn.addEventListener('input', draw);
		wIn.addEventListener('input', draw);
		draw();
	});
}
