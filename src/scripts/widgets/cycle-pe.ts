// Client behavior for CyclePe.astro (lesson 3.11). Same model as course/verify/3.11.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const PRICE = 100;
const BASE = 5;
const PERIOD = 8;

function series(a: number) {
	const e = (t: number) => BASE * (1 + a * Math.sin((2 * Math.PI * t) / PERIOD));
	const pe: number[] = [];
	const cape: number[] = [];
	for (let t = 1; t <= 16; t++) {
		pe.push(PRICE / e(t));
		let s = 0;
		for (let k = t - 9; k <= t; k++) s += e(k);
		cape.push(PRICE / (s / 10));
	}
	return { pe, cape };
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initCyclePe() {
	document.querySelectorAll<HTMLElement>('[data-widget="cycle-pe"]').forEach((root) => {
		const aIn = root.querySelector<HTMLInputElement>('[data-param="a"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const a = Number(aIn.value);
			const { pe, cape } = series(a);
			for (const { el, X, Y } of plots) {
				const pts = (ys: number[]) => ys.map((y, i) => `${X(i + 1).toFixed(1)},${Y(Math.min(200, y)).toFixed(1)}`).join(' ');
				el('pe').setAttribute('points', pts(pe));
				el('cape').setAttribute('points', pts(cape));
			}
			root.querySelector('[data-out="a"]')!.textContent = a.toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{lo}', fmt(Math.min(...pe)))
				.replace('{hi}', fmt(Math.max(...pe)))
				.replace('{clo}', fmt(Math.min(...cape)))
				.replace('{chi}', fmt(Math.max(...cape)));
		}

		aIn.addEventListener('input', draw);
		draw();
	});
}
