// Client behavior for SolowDiagram.astro (lesson 2.2): y = k^(1/3), δ + n = 0.06, k* = (s / 0.06)^(3/2).
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

const BREAK_EVEN = 0.06;
const num = (v: number) => (Math.round(v * 100) / 100).toFixed(2);

export function initSolow() {
	document.querySelectorAll<HTMLElement>('[data-widget="solow"]').forEach((root) => {
		const sIn = root.querySelector<HTMLInputElement>('[data-param="s"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (name: string) => svg.querySelector<SVGElement>(`[data-el="${name}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const s = Number(sIn.value);
			const k = Math.pow(s / BREAK_EVEN, 1.5);
			const y = Math.cbrt(k);
			for (const { el, X, Y } of plots) {
				const pts: string[] = [];
				for (let i = 0; i <= 120; i++) {
					const kk = (30 * i) / 120;
					pts.push(`${X(kk).toFixed(1)},${Y(s * Math.cbrt(kk)).toFixed(1)}`);
				}
				el('inv').setAttribute('points', pts.join(' '));
				el('vk').setAttribute('x1', X(k).toFixed(1));
				el('vk').setAttribute('x2', X(k).toFixed(1));
				el('vk').setAttribute('y1', Y(0).toFixed(1));
				el('vk').setAttribute('y2', Y(s * y).toFixed(1));
				el('pt').setAttribute('cx', X(k).toFixed(1));
				el('pt').setAttribute('cy', Y(s * y).toFixed(1));
			}
			root.querySelector('[data-out="s"]')!.textContent = s.toFixed(2);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{k}', num(k))
				.replace('{y}', num(y))
				.replace('{c}', num((1 - s) * y));
		}

		sIn.addEventListener('input', draw);
		draw();
	});
}
