"""Recompute every numeric answer in course/keys/3.1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt

ASKS = [(100.05, 500), (100.10, 500), (100.20, 1000), (100.40, 2000)]


def market_buy(q, mid=100.0):
    left, paid = q, 0.0
    for price, n in ASKS:
        t = min(n, left)
        left -= t
        paid += t * price
    assert left == 0
    return paid / q, paid - q * mid


def results():
    r = {}
    r["C1.sd1"] = 100 * sqrt(0.05 * 0.95)
    r["C1.sd2"] = r["C1.sd1"] / sqrt(1000)

    r["C2.cost"] = 1000 * (100.05 - 99.95)
    r["C2.pct"] = 100 * r["C2.cost"] / 100_000
    r["C2.yr"] = 50 * r["C2.pct"]

    r["C3.avg"], r["C3.cost"] = market_buy(1500)
    r["C3.cost2"] = market_buy(3000)[1]

    r["Q1.f1"], r["Q1.f2"] = 100 * 1 / 5, 100 * 1 / 1000

    r["Q2.loss"] = 100 * (60 - 50) + 100 * 1
    r["Q2.gain"] = 100 * (50 - 40) - 100 * 1
    r["Q2.maxlong"] = 100 * 50

    r["Q3.net"] = 10 * 20 * (1 - 0.07)
    r["Q3.left"] = 10 * (25 - 20)

    r["Q4.e"] = 0.6 * 99.98 + 0.4 * 100.35

    r["Q5.nav"] = 1.00 * (1 - 0.03)
    # Intermediate values that the questions now give or no longer ask for.
    for k in ['C1.sd1', 'C2.cost', 'C2.pct', 'C3.avg', 'Q1.f1', 'Q1.f2', 'Q2.gain', 'Q2.maxlong', 'Q3.net', 'Q5.nav']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
