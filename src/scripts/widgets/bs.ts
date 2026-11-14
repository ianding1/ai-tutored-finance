// Black–Scholes prices for European options on a stock without dividends (lessons 5.2 and 5.3).
// Same formulas as course/verify/5.2.py and 5.3.py.

// Standard normal CDF (Abramowitz and Stegun 7.1.26, error below 1.5e-7).
export function normCdf(x: number) {
	const t = 1 / (1 + (0.3275911 * Math.abs(x)) / Math.SQRT2);
	const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(x * x) / 2);
	return x >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

export function bsCall(S: number, K: number, T: number, r: number, sigma: number) {
	if (T <= 0) return Math.max(S - K, 0);
	const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
	const d2 = d1 - sigma * Math.sqrt(T);
	return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
}

export function bsPut(S: number, K: number, T: number, r: number, sigma: number) {
	return bsCall(S, K, T, r, sigma) - S + K * Math.exp(-r * T);
}

export function bsDelta(S: number, K: number, T: number, r: number, sigma: number) {
	if (T <= 0) return S > K ? 1 : 0;
	const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
	return normCdf(d1);
}
