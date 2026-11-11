"""Recompute every numeric answer in course/keys/2.8.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def sd(w, rho, s_stock=16.0, s_bond=6.0):
    return sqrt((s_stock * w) ** 2 + (s_bond * (1 - w)) ** 2 + 2 * rho * s_stock * s_bond * w * (1 - w))


def adas(d, s):
    gap = (d - 0.5 * s) / 1.5
    return 100 + gap, 100 + s + gap


def results():
    r = {}
    avg = (4.3 + 4.4 + 4.6) / 3
    r["C1.avg"], r["C1.diff"] = avg, avg - 3.9

    r["C2.f"] = 2 * 4.5 - 5

    r["C4.s1"], r["C4.s2"] = sd(0.6, -0.3), sd(0.6, 0.5)

    rec, inv_rec = 1000 * 0.15, 1000 * 0.15 * 0.9
    inv_no = (1000 - rec) * 0.10
    assert inv_rec + inv_no == 220
    r["Q1.p"] = 100 * inv_rec / (inv_rec + inv_no)

    r["Q2.y1"], r["Q2.p1"] = adas(-4, 0)
    r["Q2.y2"], r["Q2.p2"] = adas(0, 6)

    r["Q3.r22"] = 0.6 * -18.1 + 0.4 * -13.0
    r["Q3.r2"] = 0.6 * -18.1 + 0.4 * 6
    # Values that the questions now give or no longer ask for.
    for k in ['Q2.y1', 'Q2.p1', 'Q2.y2', 'Q2.p2']:
        del r[k]
    # Values that the questions now give or no longer ask for.
    for k in ['C1.avg', 'C1.diff', 'C2.f', 'C4.s1', 'C4.s2']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
