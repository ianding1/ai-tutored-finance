"""Recompute every numeric answer in course/keys/3.8.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def roe(roa, de, r):
    """Figure 2-1: return on equity (%) from return on assets, debt/equity and the interest rate; no taxes."""
    return roa + (roa - r) * de


def results():
    r = {}
    r["C1.roe"] = 100 * 50 / 250
    assert abs(100 * 200 / 1000 - r["C1.roe"]) < 1e-9
    r["C1.mb"], r["C1.tb"], r["C1.lb"] = 100 * 50 / 2500, 2500 / 1000, 1000 / 250

    r["C2.r10"], r["C2.r2"] = roe(10, 2, 5), roe(2, 2, 5)

    r["C3.ep"] = (6 - 9) / 100 * 100

    r["C4.c0"], r["C4.c1"] = 300 / 100, 300 * 0.6 / 100

    r["Q1.roe1"], r["Q1.roe2"] = 100 * 100 / 500, 100 * 95 / 380
    r["Q1.lev2"] = 1000 / 380

    r["Q2.roe"] = 7 + (7 - 4) * 2.5

    r["Q3.ccc"] = 45 + 60 - 30
    r["Q3.free"] = 3650 / 365 * (60 - 40)

    r["Q4.cr"], r["Q4.qr"] = 500 / 400, (50 + 150) / 400
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
