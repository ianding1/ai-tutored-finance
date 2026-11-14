"""Recompute every numeric answer in course/keys/6.8.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
import math


def value(g, r, gt=0.03, n=10):
    """Value per 1 of this year's free cash flow: n years of growth g, then gt forever."""
    v = sum(((1 + g) / (1 + r)) ** t for t in range(1, n + 1))
    return v + (1 + g) ** n * (1 + gt) / (r - gt) / (1 + r) ** n


def implied(multiple, r):
    lo, hi = -0.2, 0.6
    for _ in range(100):
        m = (lo + hi) / 2
        if value(m, r) < multiple:
            lo = m
        else:
            hi = m
    return lo


def results():
    r = {}
    # Figure 3-1 readouts quoted in the key.
    table = {0.07: [-0.1, 8.4, 13.4], 0.09: [5.0, 14.1, 19.4], 0.11: [9.1, 18.7, 24.4]}
    for rate, vals in table.items():
        assert [round(100 * implied(m, rate), 1) for m in (20, 40, 60)] == vals

    # Q1: price 200, FCF 4, discount 9.5%.
    r["Q1.g"] = 100 * implied(200 / 4, 0.095)

    # Q2: days sales outstanding.
    r["Q2.dso1"] = 164.4 / 1000 * 365
    r["Q2.dso2"] = 230.2 / 1100 * 365

    # Q3: value of growth at different ROIC.
    def v(roic):
        return 100 * (1 - 0.04 / roic) / (0.09 - 0.04)

    assert abs(v(0.09) - 100 / 0.09) < 1e-9
    r["Q3.v9"], r["Q3.v20"], r["Q3.v6"] = v(0.09), v(0.20), v(0.06)

    # Q4: 70% index (16%) plus 30% stock (40%), correlation 0.5.
    r["Q4.sd"] = math.sqrt(0.49 * 256 + 0.09 * 1600 + 2 * 0.7 * 0.3 * 0.5 * 16 * 40)
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
