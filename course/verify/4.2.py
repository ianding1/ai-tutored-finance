"""Recompute every numeric answer in course/keys/4.2.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def two_asset(w, rho, ma=10.0, sa=20.0, mb=5.0, sb=10.0):
    """Figure 1-1: expected return and standard deviation (%) with weight w in A."""
    m = w * ma + (1 - w) * mb
    v = (w * sa) ** 2 + ((1 - w) * sb) ** 2 + 2 * w * (1 - w) * rho * sa * sb
    return m, sqrt(v)


def min_var_weight(rho, sa=20.0, sb=10.0):
    cov = rho * sa * sb
    return (sb**2 - cov) / (sa**2 + sb**2 - 2 * cov)


def results():
    r = {}
    r["Q1.wneg"] = min_var_weight(0.8)

    inv = [1 / 10**2, 1 / 20**2, 1 / 20**2]
    w = [x / sum(inv) for x in inv]
    r["Q2.w1"] = w[0]
    r["Q2.sd"] = sqrt(sum((wi * s) ** 2 for wi, s in zip(w, [10, 20, 20])))

    def sd(wb, rho=0.9, s=20.0):
        wa = 1 - wb
        return sqrt((wa * s) ** 2 + (wb * s) ** 2 + 2 * wa * wb * rho * s * s)
    r["Q3.wb"] = (10 - 8) / (9 - 8)
    r["Q3.sd"] = sd(r["Q3.wb"])
    r["Q3.wb2"] = (10 - 8) / (8.5 - 8)

    r["Q4.g1"] = 8 - 30**2 / 200
    s2 = sqrt(2 * (0.5 * 30) ** 2)
    r["Q4.g2"] = 8 - s2**2 / 200
    assert abs(two_asset(1, 0.2)[1] - 20) < 1e-9
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
