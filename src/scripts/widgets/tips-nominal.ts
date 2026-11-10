// Client behavior for TipsNominal.astro (lesson 3.6). Same model as course/verify/3.6.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const N = 10;

const fmt = (v: number) => {
	const r = Math.round(v * 100) / 100;
	return (Object.is(r, -0) ? 0 : r).toFixed(2);
};

export function initTipsNominal() {
	document.querySelectorAll<HTMLElement>('[data-widget="tips-nominal"]').forEach((root) => {
		const input = (name: string) => root.querySelector<HTMLInputElement>(`[data-param="${name}"]`)!;
		const yIn = input('y');
		const ryIn = input('ry');
		const piIn = input('pi');
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const y = Number(yIn.value);
			const ry = Number(ryIn.value);
			const pi = Number(piIn.value);
			const nom = (p: number) => 100 * ((1 + y / 100) / (1 + p / 100)) ** N;
			const tips = 100 * (1 + ry / 100) ** N;
			const be = 100 * ((1 + y / 100) / (1 + ry / 100) - 1);
			const clamp = (v: number) => Math.max(0, Math.min(300, v));
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				for (let k = 0; k <= 80; k++) {
					const p = (8 * k) / 80;
					pts.push(`${X(p).toFixed(1)},${Y(clamp(nom(p))).toFixed(1)}`);
				}
				el('nom').setAttribute('points', pts.join(' '));
				el('tips').setAttribute('points', `${X(0).toFixed(1)},${Y(clamp(tips)).toFixed(1)} ${X(8).toFixed(1)},${Y(clamp(tips)).toFixed(1)}`);
				el('vx').setAttribute('x1', X(pi).toFixed(1));
				el('vx').setAttribute('x2', X(pi).toFixed(1));
				el('be').setAttribute('cx', X(be).toFixed(1));
				el('be').setAttribute('cy', Y(clamp(tips)).toFixed(1));
			}
			root.querySelector('[data-out="y"]')!.textContent = y.toFixed(1);
			root.querySelector('[data-out="ry"]')!.textContent = ry.toFixed(1);
			root.querySelector('[data-out="pi"]')!.textContent = String(pi);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{be}', fmt(be))
				.replace('{pi}', String(pi))
				.replace('{n}', fmt(nom(pi)))
				.replace('{t}', fmt(tips));
		}

		for (const el of [yIn, ryIn, piIn]) el.addEventListener('input', draw);
		draw();
	});
}
