"""Recompute every numeric answer in course/keys/6.2.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import log


def lost(f, r, years):
    """Share of final wealth lost (in %) to a yearly fee f, return r before fees."""
    return 100 * (1 - ((1 + r - f) / (1 + r)) ** years)


def results():
    r = {}
    # Figure 5-1 values quoted in the key and in check C5.
    assert [round(lost(0.01, 0.06, t), 1) for t in (10, 20, 30, 40)] == [9.0, 17.3, 24.8, 31.6]
    assert round(lost(0.01, 0.02, 30), 1) == 25.6 and round(lost(0.01, 0.10, 30), 1) == 24.0

    # Q1: 35 years at 6.5%.
    r["Q1.l"] = lost(0.008, 0.065, 35)
    r["Q1.l2"] = lost(0.0004, 0.065, 35)

    # Q2: A shares (5.75% load, 0.85%) vs C shares (1.60%, convert after 8 years); 7% before fees.
    r["Q2.be"] = log(1 / 0.9425) / log(1.0615 / 1.054)
    a20 = 0.9425 * 1.0615**20
    c20 = 1.054**8 * 1.0615**12
    r["Q2.diff"] = 100 * (c20 / a20 - 1)
    assert 1.0695**20 / c20 - 1 > 0.22  # a 0.05% no-load fund ends about 23% richer

    # Q3: hidden costs.
    r["Q3.tc"] = 0.80 * 0.4
    r["Q3.cd"] = 0.05 * (8 - 4)
    r["Q3.total"] = 0.70 + r["Q3.tc"] + r["Q3.cd"]

    # Q4: yearly cost = |tracking difference| + spread x round trips per year.
    r["Q4.x"] = 0.05 + 0.01 / 20
    r["Q4.y"] = 0.04 + 0.03 / 20
    r["Q4.xt"] = 0.05 + 12 * 0.01
    r["Q4.yt"] = 0.04 + 12 * 0.03
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
