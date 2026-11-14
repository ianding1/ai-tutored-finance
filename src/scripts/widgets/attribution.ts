// Client behavior for Attribution.astro (lesson 6.4). Same model as course/verify/6.4.py.
interface Geom {
	W: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
}

const WB = [0.3, 0.7];
const RB = [20, 5];
const RBT = WB[0] * RB[0] + WB[1] * RB[1];

export function attribution(w: number, ra: number) {
	const wp = [w, 1 - w];
	const rp = [ra, 5];
	let alloc = 0;
	let sel = 0;
	for (let i = 0; i < 2; i++) {
		alloc += (wp[i] - WB[i]) * (RB[i] - RBT);
		sel += wp[i] * (rp[i] - RB[i]);
	}
	return { r: wp[0] * rp[0] + wp[1] * rp[1], alloc, sel };
}

export function initAttribution() {
	document.querySelectorAll<HTMLElement>('[data-widget="attribution"]').forEach((root) => {
		const wIn = root.querySelector<HTMLInputElement>('[data-param="w"]')!;
		const raIn = root.querySelector<HTMLInputElement>('[data-param="ra"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				bars: [0, 1, 2].map((i) => svg.querySelector<SVGRectElement>(`[data-bar="${i}"]`)!),
				X: (v: number) => g.pad.l + ((Math.max(g.xr[0], Math.min(g.xr[1], v)) - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
			};
		});

		function draw() {
			const { r, alloc, sel } = attribution(Number(wIn.value) / 100, Number(raIn.value));
			const vals = [alloc, sel, alloc + sel];
			for (const { bars, X } of plots) {
				vals.forEach((v, i) => {
					const x0 = X(0);
					const x1 = X(v);
					bars[i].setAttribute('x', String(Math.min(x0, x1)));
					bars[i].setAttribute('width', String(Math.abs(x1 - x0)));
				});
			}
			root.querySelector('[data-out="w"]')!.textContent = wIn.value;
			root.querySelector('[data-out="ra"]')!.textContent = raIn.value;
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{r}', r.toFixed(1))
				.replace('{a}', alloc.toFixed(1))
				.replace('{s}', sel.toFixed(1))
				.replace('{t}', (alloc + sel).toFixed(1));
		}

		wIn.addEventListener('input', draw);
		raIn.addEventListener('input', draw);
		draw();
	});
}
