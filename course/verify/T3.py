"""Recompute every numeric answer in course/keys/T3.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""

from math import erf, exp, log, sqrt


def norm_cdf(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def bs_call(s, k, t, r, sigma):
    d1 = (log(s / k) + (r + sigma**2 / 2) * t) / (sigma * sqrt(t))
    d2 = d1 - sigma * sqrt(t)
    return s * norm_cdf(d1) - k * exp(-r * t) * norm_cdf(d2), d1, d2


def annuity(r, n):
    return (1 - (1 + r) ** -n) / r


def results():
    r = {}
    # Q5 (judge): nominal 5%, inflation 2.5%, costs 1.3%.
    real = 100 * (1.05 / 1.025 - 1)
    r["Q5.real"] = real
    r["Q5.share"] = 100 * 1.3 / real
    assert r["Q5.share"] > 50  # the client keeps less than half

    # Q7: deep in-the-money employee option, S 100, K 40, T 4, r 4%, sigma 35%.
    c, d1, d2 = bs_call(100, 40, 4, 0.04, 0.35)
    assert round(d1, 3) == 1.888 and round(d2, 3) == 1.188
    r["Q7.c"] = c
    r["Q7.tv"] = c - 60
    r["Q7.interest"] = 40 * (1 - exp(-0.04 * 4))
    put = c - 100 + 40 * exp(-0.16)
    assert round(put, 2) == 1.05 and r["Q7.interest"] > put

    # Q8 (no expected value): exposure counting the uncalled commitment.
    assert round(100 * (170 + 240) / (700 + 150 + 170), 1) == 40.2

    # Q9: deductibles 1,000 / 5,000, premiums 2,400 / 1,800, claim probability 4%.
    r["Q9.extra"] = 0.04 * (5000 - 1000)
    r["Q9.ratio"] = (2400 - 1800) / r["Q9.extra"]
    risk_premium = 0.5 * 3 * (4000**2 * 0.04 * 0.96) / 300000
    assert risk_premium < 10  # "only a few dollars"

    # Q10: buffer 10%, cap 14%, fee 0.8%, dividend yield 1.5%.
    def fund(x):
        g = min(x, 14) if x >= 0 else (0 if x >= -10 else x + 10)
        return g - 0.8

    r["Q10.down"] = fund(-25)
    r["Q10.up"] = fund(30)

    # Q11: TIPS ladders of 40 a year at 2% real.
    r["Q11.l15"] = 40 * annuity(0.02, 15)
    r["Q11.l30"] = 40 * annuity(0.02, 30)
    assert r["Q11.l15"] < 750 < r["Q11.l30"]

    # Q12: 300,000 euros in 3 years; spot 1.10, USD 4.0%, EUR 2.2%.
    fwd = 1.10 * (1.04 / 1.022) ** 3
    r["Q12.fwd"] = fwd
    r["Q12.pv"] = 300 * 1.10 / 1.022**3
    assert abs(r["Q12.pv"] - 300 * fwd / 1.04**3) < 1e-9
    assert fwd / 1.10 - 1 > 0.05
    r["Q12.fr"] = 100 * 300 / r["Q12.pv"]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(f"{k}: {v:.4f}")
