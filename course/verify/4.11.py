"""Recompute every numeric answer in course/keys/4.11.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def valuation(pe0, pe1, n=10):
    """Annual contribution of a P/E change over n years, in percent (figure 2-1)."""
    return 100 * ((pe1 / pe0) ** (1 / n) - 1)


def results():
    r = {}
    # Q1: yield 1.4 + buybacks 0.6, real growth 1.8, inflation 2.5, CAPE 30 -> 22.
    base = 1.4 + 0.6 + 1.8 + 2.5
    r["Q1.val"] = valuation(30, 22)
    r["Q1.r1"] = base + r["Q1.val"]
    r["Q1.r2"] = base

    # Q2: modified duration 6, rates +1 point.
    r["Q2.loss"] = -6 * 1
    r["Q2.years"] = 6 / (4.2 - 3.2)

    # Q3: stocks 16%, bonds 6%, rho 0.2, weights 60/40, delta 3.
    ss, sb = 0.16**2, 0.06**2
    cov = 0.2 * 0.16 * 0.06
    r["Q3.ps"] = 100 * 3 * (0.6 * ss + 0.4 * cov)
    r["Q3.pb"] = 100 * 3 * (0.6 * cov + 0.4 * sb)
    det = ss * sb - cov**2
    ws = (sb * 0.07 - cov * 0.03) / det / 3
    wb = (-cov * 0.07 + ss * 0.03) / det / 3
    assert round(ws, 2) == 0.73 and round(wb, 2) == 2.39

    # Q4: 1881-2024.
    r["Q4.n"] = (2024 - 1881) // 10

    # Check C2: real 3.5, nominal 6 -> 8 with P/E unchanged.
    assert valuation(30, 30) == 0 and 2 + 1.5 + 2.5 == 6
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
