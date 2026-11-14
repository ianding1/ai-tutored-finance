"""Recompute every numeric answer in course/keys/6.12.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, log, sqrt


def n(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def goal_prob(w, f, years):
    """Figure 2-1: probability (in %) of reaching the goal with stock share w and funded ratio f."""
    mu = 0.01 + w * 0.04
    s = w * 0.17
    if s == 0:
        return 100.0 if f >= 1 else 0.0
    m = log(1 + mu) - s * s / 2
    return 100 * n((log(f) + (m - log(1.01)) * years) / (s * sqrt(years)))


def results():
    r = {}
    table = {
        (1.0, 5): [100.0, 68.1, 66.3, 64.5, 62.6],
        (0.7, 5): [0.0, 0.1, 7.3, 18.9, 26.8],
        (1.0, 30): [100.0, 87.6, 84.9, 81.8, 78.4],
        (1.2, 5): [100.0, 99.2, 91.6, 84.4, 78.8],
    }
    for (f, t), vals in table.items():
        assert [round(goal_prob(w / 100, f, t), 1) for w in (0, 25, 50, 75, 100)] == vals

    # Q1: down payment of 120 in 4 years at 4%.
    pv = 120 / 1.04**4
    r["Q1.pv"] = pv
    r["Q1.f"] = 100 * 100 / pv

    # Q2: college in 18 years, funded ratio 80%.
    r["Q2.p60"] = goal_prob(0.6, 0.8, 18)
    r["Q2.p100"] = goal_prob(1.0, 0.8, 18)

    # Q3: overall stock share.
    r["Q3.w"] = 100 * (0 * 150 + 0.5 * 100 + 0.8 * 750) / 1000

    # Q4: present value at 1.8% and 0.8% real.
    r["Q4.pv"] = 200 / 1.018**10
    r["Q4.pv2"] = 200 / 1.008**10
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
