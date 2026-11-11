"""Recompute every numeric answer in course/keys/4.3.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt

MA, SA, MB, SB, RHO = 10.0, 20.0, 5.0, 10.0, 0.2


def portfolio(w):
    """Figure 2-1: expected return and standard deviation (%) with weight w in A."""
    m = w * MA + (1 - w) * MB
    v = (w * SA) ** 2 + ((1 - w) * SB) ** 2 + 2 * w * (1 - w) * RHO * SA * SB
    return m, sqrt(v)


def tangency(rf):
    ea, eb, cov = MA - rf, MB - rf, RHO * SA * SB
    return (ea * SB**2 - eb * cov) / (ea * SB**2 + eb * SA**2 - (ea + eb) * cov)


def results():
    r = {}
    y = lambda gamma, mu=9, rf=3, s=18: (mu - rf) / 100 / (gamma * (s / 100) ** 2)
    r["Q1.y1"], r["Q1.y4"] = y(1), y(4)

    gamma = 0.06 / (1.5 * 0.18**2)
    r["Q2.y"] = 0.03 / (gamma * 0.18**2)

    w = tangency(3)
    m, s = portfolio(w)
    r["Q3.w"], r["Q3.s"] = w, (m - 3) / s
    r["Q3.sa"] = (MA - 3) / SA

    r["Q4.y"] = 12 / 16
    r["Q4.mu"] = 3 + r["Q4.y"] * (8 - 3)
    r["Q4.cml"] = 3 + 32 * (8 - 3) / 16
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
