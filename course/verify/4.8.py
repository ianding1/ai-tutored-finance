"""Recompute every numeric answer in course/keys/4.8.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import log

A, LAM = 0.88, 2.25


def v(x, lam=LAM, a=A):
    """Prospect-theory value function (figure 1-1)."""
    return x**a if x >= 0 else -lam * (-x) ** a


def results():
    r = {}
    # Q1: 50/50 gamble of +110 / -100, wealth 100,000.
    r["Q1.v"] = 0.5 * v(110) + 0.5 * v(-100)
    r["Q1.w"] = 100 * LAM ** (1 / A)
    du = 0.5 * log(100110) + 0.5 * log(99900) - log(100000)
    assert du > 0 and abs(du - 0.00005) < 1e-5

    # Q2: A worth 65 (cost 50), B worth 35 (cost 50), sell 10,000; tax 15%.
    r["Q2.taxa"] = 10000 * 15 / 65 * 0.15
    r["Q2.taxb"] = 10000 * 15 / 35 * 0.15

    # Q3: 50 million each side, 10 million capital, gap 10%.
    r["Q3.loss"] = 50 * 0.10
    r["Q3.ret"] = 100 * (50 * 0.10) / 10

    # Q4: P/E1 = payout / (r - g).
    r["Q4.g"] = 100 * (0.09 - 0.5 / 200)

    # Checks C1, C2.
    assert v(100, lam=1) + v(-100, lam=1) == 0 and 0.5 * v(100) + 0.5 * v(-100) < 0
    assert v(-50) < 0.5 * v(-100)
    return r


if __name__ == "__main__":
    for k, val in results().items():
        print(k, round(val, 4))
