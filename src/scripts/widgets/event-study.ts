// Client behavior for EventStudy.astro (lesson 4.7). Same model as course/verify/4.7.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const NEWS = 5;
const SPEED = 0.3;

export function car(k: number, day: number) {
	if (day < 0) return 0;
	return NEWS - NEWS * (1 - k) * (1 - SPEED) ** day;
}

const fmt = (v: number) => {
	const r = Math.round(v * 10) / 10;
	return (Object.is(r, -0) ? 0 : r).toFixed(1);
};

export function initEventStudy() {
	document.querySelectorAll<HTMLElement>('[data-widget="event-study"]').forEach((root) => {
		const kIn = root.querySelector<HTMLInputElement>('[data-param="k"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				path: svg.querySelector<SVGPathElement>('[data-el="car"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const k = Number(kIn.value);
			for (const { path, X, Y } of plots) {
				const pts: string[] = [];
				for (let d = -10; d <= 10; d++) pts.push(`${X(d).toFixed(1)} ${Y(car(k, d)).toFixed(1)}`);
				path.setAttribute('d', `M ${pts.join(' L ')}`);
			}
			root.querySelector('[data-out="k"]')!.textContent = k.toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{d0}', fmt(car(k, 0)))
				.replace('{post}', fmt(car(k, 10) - car(k, 0)));
		}

		kIn.addEventListener('input', draw);
		draw();
	});
}
