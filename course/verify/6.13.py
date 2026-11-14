"""Recompute every numeric answer in course/keys/6.13.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, sqrt


def n(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def percentile(r, years, mu=6, sigma=16):
    """Figure 3-1: percentile of a realized average return r over the given years."""
    return 100 * n((r - mu) * sqrt(years) / sigma)


def results():
    r = {}
    table = {3: [43, 34, 20], 0: [35, 20, 5], 9: [57, 66, 80]}
    for rr, vals in table.items():
        assert [round(percentile(rr, t)) for t in (1, 5, 20)] == vals

    # Q1: 1.5% realized against a 5% / 12% forecast over 10 years.
    z = (1.5 - 5) * sqrt(10) / 12
    r["Q1.z"] = z
    r["Q1.pct"] = 100 * n(z)

    # Q2: funded ratios.
    r["Q2.f1"] = 100 * 800 / (1500 / 1.02**15)
    r["Q2.f2"] = 100 * 680 / (1500 / 1.015**15)

    # Q3: switching a fund.
    tax = 120 * 0.15
    save = (0.85 - 0.04) / 100 * 400
    r["Q3.tax"], r["Q3.save"], r["Q3.be"] = tax, save, tax / save

    # Q4: losses with a 40% stock fall.
    r["Q4.l60"] = 0.6 * 40
    r["Q4.l80"] = 0.8 * 40
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
