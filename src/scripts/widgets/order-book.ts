// Client behavior for OrderBook.astro (lesson 3.1): a market buy of q shares walks up the ask side.
interface Geom {
	W: number;
	H: number;
	pad: { l: number; r: number; t: number; b: number };
	yr: [number, number];
	slot: number;
	nBids: number;
}

const MID = 100;

export function fillAsks(asks: [number, number][], q: number) {
	let left = q;
	let paid = 0;
	const taken = asks.map(([p, n]) => {
		const t = Math.min(n, left);
		left -= t;
		paid += t * p;
		return t;
	});
	return { taken, paid, filled: q - left };
}

export function initOrderBook() {
	document.querySelectorAll<HTMLElement>('[data-widget="order-book"]').forEach((root) => {
		const qIn = root.querySelector<HTMLInputElement>('[data-param="q"]')!;
		const asks = JSON.parse(root.dataset.asks!) as [number, number][];
		const plots = [...root.querySelectorAll<SVGSVGElement>('svg[data-geom]')].map((svg) => {
			const g = JSON.parse(svg.dataset.geom!) as Geom;
			return { svg, Y: (v: number) => g.pad.t + ((g.yr[1] - v) / (g.yr[1] - g.yr[0])) * (g.H - g.pad.t - g.pad.b) };
		});

		function draw() {
			const q = Number(qIn.value);
			const { taken, paid, filled } = fillAsks(asks, q);
			for (const { svg, Y } of plots) {
				taken.forEach((t, j) => {
					const r = svg.querySelector<SVGRectElement>(`[data-el="fill-${j}"]`)!;
					r.setAttribute('y', Y(t).toFixed(1));
					r.setAttribute('height', (Y(0) - Y(t)).toFixed(1));
				});
			}
			const avg = paid / filled;
			root.querySelector('[data-out="q"]')!.textContent = String(q);
			root.querySelector<HTMLElement>('[data-el="readout"]')!.textContent = (root.dataset.readout || '')
				.replace('{q}', String(filled))
				.replace('{avg}', avg.toFixed(4))
				.replace('{bp}', ((100 * (avg - MID)) / MID).toFixed(3))
				.replace('{cost}', (paid - filled * MID).toFixed(2));
		}

		qIn.addEventListener('input', draw);
		draw();
	});
}
