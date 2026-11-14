"""Recompute every numeric answer in course/keys/5.2.yaml.

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


def bs_put(s, k, t, r, sigma):
    return bs_call(s, k, t, r, sigma) - s + k * exp(-r * t)


def results():
    r = {}
    # Q1: call K 100 at 6; 6,000 dollars buys 1,000 calls.
    r["Q1.be"] = 100 + 6
    r["Q1.r90"] = 100 * (max(90 - 100, 0) - 6) / 6
    r["Q1.r110"] = 100 * (max(110 - 100, 0) - 6) / 6
    r["Q1.r130"] = 100 * (max(130 - 100, 0) - 6) / 6

    # Q2: put at 90% strike, premium 2.53%; 20% chance of paying 6% on average.
    premium = round(bs_put(100, 90, 1, 0.04, 0.2), 2)
    assert premium == 2.53
    r["Q2.floor"] = -10 - premium
    r["Q2.cost"] = premium - 0.2 * 6

    # Q3: 1-month call 5% out of the money, premium 0.73% (Black–Scholes, rounded).
    prem = round(bs_call(100, 105, 1 / 12, 0.04, 0.2), 2)
    assert prem == 0.73
    r["Q3.y"] = prem * 12
    r["Q3.up"] = min(115, 105) - 100 + prem
    r["Q3.down"] = 90 - 100 + prem

    # Figure 3-1 prices quoted in the checks and context.
    puts = {k: round(bs_put(100, k, 1, 0.04, 0.2), 2) for k in (80, 85, 90, 95, 100)}
    calls = {k: round(bs_call(100, k, 1, 0.04, 0.2), 2) for k in (100, 105, 110, 115, 120, 125, 130)}
    assert puts == {80: 0.77, 85: 1.47, 90: 2.53, 95: 4.03, 100: 6.0}
    assert calls == {100: 9.93, 105: 7.57, 110: 5.66, 115: 4.16, 120: 3.0, 125: 2.13, 130: 1.49}
    assert round(100 - 85 + puts[85], 2) == 16.47
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
