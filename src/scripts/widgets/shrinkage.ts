// Client behavior for ShrinkageWeights.astro (lesson 4.10). Same model as course/verify/4.10.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	yr: [number, number];
	slot: number;
}

const TRUE_MU = [3, 4, 6, 7];
const EST_MU = [1, 8, 3, 10];
const SIGMA = 20;

export function weights(w: number) {
	const avg = EST_MU.reduce((s, v) => s + v, 0) / EST_MU.length;
	const m = EST_MU.map((e) => (1 - w) * e + w * avg);
	const total = m.reduce((s, v) => s + v, 0);
	return m.map((v) => v / total);
}

export function sharpe(x: number[], mu: number[]) {
	const ret = x.reduce((s, v, i) => s + v * mu[i], 0);
	const sd = SIGMA * Math.sqrt(x.reduce((s, v) => s + v * v, 0));
	return ret / sd;
}

export function initShrinkage() {
	document.querySelectorAll<HTMLElement>('[data-widget="shrinkage"]').forEach((root) => {
		const wIn = root.querySelector<HTMLInputElement>('[data-param="w"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (n: string) => svg.querySelector<SVGElement>(`[data-el="${n}"]`)!,
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const w = Number(wIn.value);
			const x = weights(w);
			for (const { el, Y } of plots) {
				x.forEach((v, i) => {
					const bar = el(`bar-${i}`);
					bar.setAttribute('y', Y(v * 100).toFixed(1));
					bar.setAttribute('height', (Y(0) - Y(v * 100)).toFixed(1));
				});
			}
			root.querySelector('[data-out="w"]')!.textContent = w.toFixed(1);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{est}', sharpe(x, EST_MU).toFixed(3))
				.replace('{true}', sharpe(x, TRUE_MU).toFixed(3));
		}

		wIn.addEventListener('input', draw);
		draw();
	});
}
