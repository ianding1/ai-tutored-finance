"""Recompute every numeric answer in course/keys/3.11.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import pi, sin


def cycle(a, years=16, price=100.0, base=5.0, period=8):
    """Figure 4-1: P/E and CAPE in years 1..years for earnings base * (1 + a sin(2 pi t / period))."""
    e = lambda t: base * (1 + a * sin(2 * pi * t / period))
    pe = [price / e(t) for t in range(1, years + 1)]
    cape = [price / (sum(e(s) for s in range(t - 9, t + 1)) / 10) for t in range(1, years + 1)]
    return pe, cape


def results():
    r = {}
    r["C1.p"] = 15 * 4

    r["C2.pe"] = 0.4 / (0.10 - 0.06)

    ni_a = (100 - 20) * 0.75
    ni_b = (100 - 20 - 20) * 0.75
    r["C3.a"], r["C3.b"] = 800 / ni_a, 400 / ni_b

    pe, cape = cycle(0.5)
    r["C4.lo"], r["C4.hi"] = min(pe), max(pe)
    r["C4.clo"], r["C4.chi"] = min(cape), max(cape)

    r["Q1.p20"] = (1 - 4 / 20) / (0.09 - 0.04)
    r["Q1.p9"] = (1 - 4 / 9) / (0.09 - 0.04)

    r["Q2.h"], r["Q2.l"] = (12 - 4) / (10 - 4), (8 - 4) / (10 - 4)

    r["Q3.a"], r["Q3.b"] = 2 / 0.20, 2 / 0.02

    r["Q4.y36"], r["Q4.y15"] = 100 / 36, 100 / 15
    # Values that the questions now give or no longer ask for.
    for k in ['C1.p', 'C2.pe', 'C3.a', 'C3.b', 'C4.lo', 'C4.hi', 'C4.clo', 'C4.chi']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
