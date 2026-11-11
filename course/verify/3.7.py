"""Recompute every numeric answer in course/keys/3.7.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def growth_cash(g, dso, rev0=100.0, margin=0.10, years=5):
    """Figure 2-1: total net income and total operating cash flow over `years` (g in %, dso in days)."""
    ar_prev = rev0 * dso / 365
    ni_sum = cfo_sum = 0.0
    rev = rev0
    for _ in range(years):
        rev *= 1 + g / 100
        ni = margin * rev
        ar = rev * dso / 365
        ni_sum += ni
        cfo_sum += ni - (ar - ar_prev)
        ar_prev = ar
    return ni_sum, cfo_sum


def results():
    r = {}
    r["C2.ni"], r["C2.cfo"] = growth_cash(40, 90)

    r["C3.dep4"], r["C3.dep6"] = 1200 / 4, 1200 / 6
    r["C3.diff"] = r["C3.dep4"] - r["C3.dep6"]

    r["C4.adj"] = 120 + 80
    r["C4.share"] = 100 * 80 / 200

    cfo = 80 + 30 - 25 - 15 + 5
    r["Q1.cfo"], r["Q1.after"] = cfo, cfo - 60

    r["Q2.eq"] = 500 + 120 - 30 - 50

    r["Q3.d0"], r["Q3.d1"] = 100 / 1000 * 365, 160 / 1200 * 365

    r["Q4.a"], r["Q4.b"] = 100 * (100 - 120) / 1000, 100 * (100 - 40) / 1000
    # Values that the questions now give or no longer ask for.
    for k in ['C2.ni', 'C2.cfo', 'C3.dep4', 'C3.dep6', 'C3.diff', 'C4.adj', 'C4.share']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
