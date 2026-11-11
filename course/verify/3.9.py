"""Recompute every numeric answer in course/keys/3.9.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def gordon(d1, r, g):
    """Figure 2-1 and the Gordon model: price = D1 / (r - g), rates in %."""
    return d1 / ((r - g) / 100)


def results():
    r = {}
    r["C1.p0"] = (2 + 52) / 1.08

    r["C2.p"], r["C2.p2"] = gordon(2, 9, 4), gordon(2, 9, 5)
    r["C2.chg"] = 100 * (r["C2.p2"] / r["C2.p"] - 1)

    g = 0.6 * 12
    r["C3.g"], r["C3.p"] = g, gordon(2, 10, g)
    r["C3.p8"] = gordon(2, 10, 0.6 * 8)
    assert gordon(5, 10, 0) == 50

    r["Q1.r"] = 2 + 5
    r["Q1.r2"] = 2 / 2 + 5  # the dividend yield halves when the price doubles

    d, pv = 1.0, 0.0
    for t in range(1, 6):
        d *= 1.15
        pv += d / 1.09**t
    tv = d * 1.04 / (0.09 - 0.04) / 1.09**5
    r["Q2.v"], r["Q2.share"] = pv + tv, 100 * tv / (pv + tv)

    r["Q3.pvgo"] = 60 - 4 / 0.10
    r["Q3.share"] = 100 * r["Q3.pvgo"] / 60
    r["Q3.p"] = gordon(2, 10, 0.5 * 8)

    r["Q4.g"] = 9 - 100 * 3.2 / 80
    # Values that the questions now give or no longer ask for.
    for k in ['C1.p0', 'C2.p', 'C2.p2', 'C2.chg', 'C3.g', 'C3.p', 'C3.p8']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
