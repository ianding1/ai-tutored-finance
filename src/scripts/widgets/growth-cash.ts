// Client behavior for GrowthCash.astro (lesson 3.7). Same model as course/verify/3.7.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	yr: [number, number];
	slot: number;
}

const REV0 = 100;
const MARGIN = 0.1;

function series(g: number, dso: number) {
	let rev = REV0;
	let arPrev = (REV0 * dso) / 365;
	const ni: number[] = [];
	const cfo: number[] = [];
	for (let t = 1; t <= 5; t++) {
		rev *= 1 + g / 100;
		const n = MARGIN * rev;
		const ar = (rev * dso) / 365;
		ni.push(n);
		cfo.push(n - (ar - arPrev));
		arPrev = ar;
	}
	return { ni, cfo };
}

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initGrowthCash() {
	document.querySelectorAll<HTMLElement>('[data-widget="growth-cash"]').forEach((root) => {
		const gIn = root.querySelector<HTMLInputElement>('[data-param="g"]')!;
		const dIn = root.querySelector<HTMLInputElement>('[data-param="dso"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const g = Number(gIn.value);
			const dso = Number(dIn.value);
			const { ni, cfo } = series(g, dso);
			for (const { el, Y } of plots) {
				const bar = (name: string, v: number) => {
					const c = Math.max(-20, Math.min(80, v));
					const top = Math.min(Y(c), Y(0));
					el(name).setAttribute('y', top.toFixed(1));
					el(name).setAttribute('height', Math.abs(Y(c) - Y(0)).toFixed(1));
				};
				for (let t = 1; t <= 5; t++) {
					bar(`ni${t}`, ni[t - 1]);
					bar(`cfo${t}`, cfo[t - 1]);
				}
			}
			const sum = (a: number[]) => a.reduce((s, v) => s + v, 0);
			root.querySelector('[data-out="g"]')!.textContent = String(g);
			root.querySelector('[data-out="dso"]')!.textContent = String(dso);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{ni}', fmt(sum(ni)))
				.replace('{cfo}', fmt(sum(cfo)));
		}

		gIn.addEventListener('input', draw);
		dIn.addEventListener('input', draw);
		draw();
	});
}
