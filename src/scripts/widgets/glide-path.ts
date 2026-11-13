// Client behavior for GlidePath.astro (lesson 4.12). Same model as course/verify/4.12.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export const human = (age: number) => (1 - 1.02 ** -(65 - age)) / 0.02;
export const financial = (age: number) => (0.15 * (1.04 ** (age - 25) - 1)) / 0.04;

export function stockShare(age: number, w: number, theta: number) {
	const F = financial(age);
	const H = human(age);
	if (F <= 0) return 1;
	const s = (w * (F + H) - theta * H) / F;
	return Math.min(1, Math.max(0, s));
}

export function initGlidePath() {
	document.querySelectorAll<HTMLElement>('[data-widget="glide-path"]').forEach((root) => {
		const wIn = root.querySelector<HTMLInputElement>('[data-param="w"]')!;
		const tIn = root.querySelector<HTMLInputElement>('[data-param="theta"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (n: string) => svg.querySelector<SVGElement>(`[data-el="${n}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const w = Number(wIn.value) / 100;
			const theta = Number(tIn.value);
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				for (let a = 25; a <= 65; a += 0.5) pts.push(`${X(a).toFixed(1)} ${Y(100 * stockShare(a, w, theta)).toFixed(1)}`);
				el('path').setAttribute('d', `M ${pts.join(' L ')}`);
				el('ref').setAttribute('y1', Y(100 * w).toFixed(1));
				el('ref').setAttribute('y2', Y(100 * w).toFixed(1));
			}
			root.querySelector('[data-out="w"]')!.textContent = String(Math.round(w * 100));
			root.querySelector('[data-out="theta"]')!.textContent = theta.toFixed(1);
			const pct = (a: number) => (100 * stockShare(a, w, theta)).toFixed(0);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a35}', pct(35))
				.replace('{a50}', pct(50))
				.replace('{a65}', pct(65));
		}

		wIn.addEventListener('input', draw);
		tIn.addEventListener('input', draw);
		draw();
	});
}
