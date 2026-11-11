"""Recompute every numeric answer in course/keys/4.1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def growth(lev, mu, sigma, r=3.0):
    """Figure 2-1: approximate compound growth (%) with leverage: mu_L - sigma_L^2 / 2."""
    m = r + lev * (mu - r)
    s = lev * sigma
    return m - s * s / 200


def results():
    r = {}
    r["Q1.g1"] = 3 * 10 - (3 * 20) ** 2 / 200
    r["Q1.g2"] = 3 * 10 - (3 * 30) ** 2 / 200
    r["Q1.i1"] = 10 - 20**2 / 200

    r["Q2.sa"], r["Q2.sb"] = (8 - 3) / 10, (14 - 3) / 25
    r["Q2.l"] = (14 - 3) / (8 - 3)
    r["Q2.s"] = r["Q2.l"] * 10

    m = [1.0] * 59 + [-30.0]
    mean = sum(m) / 60
    sd = sqrt(sum((x - mean) ** 2 for x in m) / 59)
    r["Q3.mean"], r["Q3.sd"] = 12 * mean, sd * sqrt(12)
    r["Q3.sharpe"] = (12 * mean - 3) / (sd * sqrt(12))

    r["Q4.prem"] = 10.0 - 3.4
    r["Q4.se"] = 20 / sqrt(98)
    assert abs(growth(1, 9, 18) - 7.38) < 1e-9
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
