"""Recompute every numeric answer in course/keys/3.2.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt

A = [-100, 60, 50, 20]
B = [-100, 10, 20, 115]


def npv(flows, r):
    return sum(c / (1 + r) ** t for t, c in enumerate(flows))


def root(f, lo, hi):
    """Bisection for a sign change of f on [lo, hi]."""
    flo = f(lo)
    for _ in range(200):
        mid = (lo + hi) / 2
        if (f(mid) > 0) == (flo > 0):
            lo, flo = mid, f(mid)
        else:
            hi = mid
    return (lo + hi) / 2


def annuity(r, n):
    return (1 - (1 + r) ** -n) / r


def results():
    res = {}
    res["C1.npv"] = 300 * annuity(0.10, 5) - 1000
    res["C2.npv"] = res["C1.npv"] - 50 - 20 * annuity(0.10, 5)

    res["C3.ia"] = 100 * root(lambda r: npv(A, r), 0.0, 0.5)
    res["C3.na"] = npv(A, 0.15)

    assert abs(100 * root(lambda r: npv(B, r), 0.0, 0.5) - 14.76) < 0.005
    res["C4.na"], res["C4.nb"] = npv(A, 0.05), npv(B, 0.05)
    res["C4.x"] = 100 * root(lambda r: npv(A, r) - npv(B, r), 0.01, 0.5)

    res["C5.pa"] = 1 + 40 / 50
    res["C5.pb"] = 2 + 70 / 115

    rr = 1.08 / 1.03 - 1
    res["Q1.rr"] = 100 * rr
    res["Q1.right"] = 100 * annuity(rr, 3)
    res["Q1.wrong"] = 100 * annuity(0.08, 3)
    assert abs(sum(100 * 1.03**t / 1.08**t for t in (1, 2, 3)) - res["Q1.right"]) < 1e-9

    disc = 230**2 - 4 * 100 * 132
    res["Q2.i1"] = 100 * ((230 - sqrt(disc)) / 200 - 1)
    res["Q2.i2"] = 100 * ((230 + sqrt(disc)) / 200 - 1)
    mine = [-100, 230, -132]
    res["Q2.n5"], res["Q2.n15"], res["Q2.n25"] = (npv(mine, r) for r in (0.05, 0.15, 0.25))

    res["Q3.nx"] = -10 + 15 / 1.1
    res["Q3.ny"] = -1000 + 1200 / 1.1
    res["Q3.inc"] = 100 * (1185 / 990 - 1)

    res["Q4.best"] = 15 + 12

    res["Q5.shield"] = 200 * 0.21
    res["Q5.pv"] = res["Q5.shield"] * annuity(0.10, 5)
    return res


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
