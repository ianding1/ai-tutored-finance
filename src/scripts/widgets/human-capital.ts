// Client behavior for HumanCapital.astro (lesson 6.6). Same model as course/verify/6.6.py.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	xr: [number, number];
	yr: [number, number];
}

// Human and financial capital at the start of each age 25..65.
export function capital(g: number, s: number) {
	const wage = (a: number) => 100 * (1 + g) ** (a - 25);
	const hc: number[] = [];
	const fc: number[] = [];
	let f = 0;
	for (let a = 25; a <= 65; a++) {
		let pv = 0;
		for (let k = a; k <= 64; k++) pv += wage(k) / 1.03 ** (k - a);
		hc.push(pv);
		fc.push(f);
		if (a <= 64) f = f * 1.04 + s * wage(a);
	}
	return { hc, fc };
}

export function initHumanCapital() {
	document.querySelectorAll<HTMLElement>('[data-widget="human-capital"]').forEach((root) => {
		const gIn = root.querySelector<HTMLInputElement>('[data-param="g"]')!;
		const sIn = root.querySelector<HTMLInputElement>('[data-param="s"]')!;
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return {
				hc: svg.querySelector<SVGPathElement>('[data-el="hc"]')!,
				fc: svg.querySelector<SVGPathElement>('[data-el="fc"]')!,
				X: (v: number) => g.pad.l + ((v - g.xr[0]) / (g.xr[1] - g.xr[0])) * (g.W - g.pad.l - g.pad.r),
				Y: (v: number) => g.pad.t + ((g.yr[1] - Math.min(v, g.yr[1])) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b),
			};
		});

		function draw() {
			const { hc, fc } = capital(Number(gIn.value) / 100, Number(sIn.value) / 100);
			for (const p of plots) {
				p.hc.setAttribute('d', `M ${hc.map((v, i) => `${p.X(25 + i).toFixed(1)} ${p.Y(v).toFixed(1)}`).join(' L ')}`);
				p.fc.setAttribute('d', `M ${fc.map((v, i) => `${p.X(25 + i).toFixed(1)} ${p.Y(v).toFixed(1)}`).join(' L ')}`);
			}
			root.querySelector('[data-out="g"]')!.textContent = gIn.value;
			root.querySelector('[data-out="s"]')!.textContent = sIn.value;
			const share = (a: number) => ((100 * hc[a - 25]) / (hc[a - 25] + fc[a - 25])).toFixed(0);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{a}', share(25))
				.replace('{b}', share(40))
				.replace('{c}', share(55))
				.replace('{d}', share(64));
		}

		gIn.addEventListener('input', draw);
		sIn.addEventListener('input', draw);
		draw();
	});
}
