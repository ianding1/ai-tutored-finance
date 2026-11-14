"""Recompute every numeric answer in course/keys/5.1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import exp, sqrt


def forward(s, r, q, t):
    """Cost-of-carry forward price with continuous rates (figure 2-1 uses s = 100)."""
    return s * exp((r - q) * t)


def results():
    r = {}
    # Q1: index 5,000, r 4%, q 1.5%, 1 year; market futures 5,180.
    r["Q1.f"] = forward(5000, 0.04, 0.015, 1)
    r["Q1.profit"] = 5180 - r["Q1.f"]

    # Q2: 1,000 barrels at 80; margin 8,000, maintenance 6,000.
    loss = 1000 * (80 - 77)
    assert 8000 - loss < 6000
    r["Q2.call"] = 8000 - (8000 - loss)
    r["Q2.ret"] = 100 * -loss / 8000
    r["Q2.loss"] = 1000 * (80 - 70)

    # Q3: sigma_S 6, sigma_F 5, rho 0.8.
    r["Q3.h"] = 0.8 * 6 / 5
    r["Q3.res"] = 6 * sqrt(1 - 0.8**2)

    # Q4: roll from 70.7 down to 70 each month.
    r["Q4.roll"] = 100 * ((70 / 70.7) ** 12 - 1)

    # Check C3: r 4%, q 6% gives about 98.02 and 96.08.
    assert round(forward(100, 0.04, 0.06, 1), 2) == 98.02 and round(forward(100, 0.04, 0.06, 2), 2) == 96.08
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
