// Client behavior for SkillYears.astro (lesson 4.9). Same model as course/verify/4.9.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

export function initSkillYears() {
	document.querySelectorAll<HTMLElement>('[data-widget="skill-years"]').forEach((root) => {
		const irIn = root.querySelector<HTMLInputElement>('[data-param="ir"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				el: (n: string) => svg.querySelector<SVGPathElement>(`[data-el="${n}"]`)!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const ir = Number(irIn.value);
			const years: number[] = [];
			for (let t = 0; t <= 40; t += 0.5) years.push(t);
			for (const { el, X, Y } of plots) {
				const pt = (t: number, v: number) => `${X(t).toFixed(1)} ${Y(v).toFixed(1)}`;
				el('mean').setAttribute('d', `M ${years.map((t) => pt(t, ir * Math.sqrt(t))).join(' L ')}`);
				const up = years.map((t) => pt(t, ir * Math.sqrt(t) + 1.96));
				const down = [...years].reverse().map((t) => pt(t, ir * Math.sqrt(t) - 1.96));
				el('band').setAttribute('d', `M ${up.join(' L ')} L ${down.join(' L ')} Z`);
			}
			root.querySelector('[data-out="ir"]')!.textContent = ir.toFixed(2);
			const t20 = ir * Math.sqrt(20);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{T}', ((1.96 / ir) ** 2).toFixed(0))
				.replace('{lo}', (t20 - 1.96).toFixed(2))
				.replace('{hi}', (t20 + 1.96).toFixed(2));
		}

		irIn.addEventListener('input', draw);
		draw();
	});
}
