"""Recompute every numeric answer in course/keys/5.3.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, exp, log, sqrt


def n(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def bs_call(s, k, t, r, sigma):
    d1 = (log(s / k) + (r + sigma**2 / 2) * t) / (sigma * sqrt(t))
    d2 = d1 - sigma * sqrt(t)
    return s * n(d1) - k * exp(-r * t) * n(d2)


def results():
    r = {}
    # Lesson text: binomial example and figure 3-1 defaults.
    delta = 20 / 30
    assert round(delta * 100 - 60 / 1.04, 2) == 8.97
    assert round(bs_call(100, 100, 1, 0.04, 0.2), 2) == 9.93

    # Q1: parity with S = K = 50, r = 5% continuous, C = 6, P = 3.
    pv = 50 * exp(-0.05)
    r["Q1.pv"] = pv
    r["Q1.gap"] = (6 - 3) - (50 - pv)

    # Q2: one-step binomial, 125 / 80, r = 5% simple, K = 100; analyst uses p = 0.7.
    d = 25 / 45
    c = d * 100 - d * 80 / 1.05
    pstar = (1.05 - 0.8) / 0.45
    assert abs(c - pstar * 25 / 1.05) < 1e-9
    r["Q2.delta"] = d
    r["Q2.c"] = c
    r["Q2.wrong"] = 0.7 * 25 / 1.05
    r["Q2.disc"] = 100 * (0.7 * 25 / round(c, 2) - 1)
    assert r["Q2.disc"] > 100 * ((0.7 * 125 + 0.3 * 80) / 100 - 1)

    # Q3: equity as a call on assets V = 100, debt face 90, T = 1, r = 4%.
    eq = bs_call(100, 90, 1, 0.04, 0.2)
    eq2 = bs_call(100, 90, 1, 0.04, 0.5)
    r["Q3.eq"] = eq
    r["Q3.debt"] = 100 - eq
    r["Q3.eq2"] = eq2
    r["Q3.shift"] = eq2 - eq

    # Q4: earnings; call price 7.74 at IV 60%, T = 0.1; after: S = 105, IV 30%, T = 0.096.
    before = bs_call(100, 100, 0.1, 0.04, 0.6)
    assert round(before, 2) == 7.74
    after = bs_call(105, 100, 0.096, 0.04, 0.3)
    assert after < before
    lo, hi = 100.0, 130.0
    for _ in range(100):
        mid = (lo + hi) / 2
        if bs_call(mid, 100, 0.096, 0.04, 0.3) < 7.74:
            lo = mid
        else:
            hi = mid
    r["Q4.after"] = after
    r["Q4.be"] = lo
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
