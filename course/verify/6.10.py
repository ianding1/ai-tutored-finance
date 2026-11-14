"""Recompute every numeric answer in course/keys/6.10.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
import math

RETURNS = [0.20, 0.25, 0.15, -0.30, -0.10, 0.25, 0.20, 0.10]


def irr(flows, lo=-0.9, hi=0.9):
    def npv(x):
        return sum(f / (1 + x) ** i for i, f in enumerate(flows))

    for _ in range(200):
        m = (lo + hi) / 2
        if npv(m) > 0:
            lo = m
        else:
            hi = m
    return lo


def dollar_weighted(k):
    """Figure 3-1: 100 at the start, then 20 + 100 k (last year's return) at the start of each later year."""
    flows, v = [-100.0], 100.0
    for t, r in enumerate(RETURNS):
        if t > 0:
            f = 20 + k * 100 * RETURNS[t - 1]
            v += f
            flows.append(-f)
        v *= 1 + r
    flows.append(v)
    return irr(flows, -0.5, 0.5)


def results():
    r = {}
    tw = math.prod(1 + x for x in RETURNS) ** (1 / len(RETURNS)) - 1
    assert round(100 * tw, 2) == 7.57
    assert [round(100 * dollar_weighted(k), 2) for k in (0, 1, 2)] == [7.39, 6.51, 5.85]

    # Q1: margin call level.
    r["Q1.drop"] = 100 * (1 - (50 / 0.75) / 100)

    # Q2: two days of +10% and -10%.
    r["Q2.i"] = 100 * (1.1 * 0.9 - 1)
    r["Q2.l"] = 100 * (1.2 * 0.8 - 1)

    # Q3: break-even accuracy for market timing.
    stay = 0.7 * 20 + 0.3 * (-15)

    def timer(p):
        return 0.7 * (20 * p + 3 * (1 - p)) + 0.3 * (3 * p - 15 * (1 - p))

    slope = timer(1) - timer(0)
    p = (stay - timer(0)) / slope
    assert abs(timer(p) - stay) < 1e-9 and abs(stay - 9.5) < 1e-9
    r["Q3.p"] = 100 * p

    # Q4: time-weighted and dollar-weighted returns.
    r["Q4.twr"] = 100 * (math.sqrt(1.5 * 0.6) - 1)
    r["Q4.dwr"] = 100 * irr([-100, -200, 350 * 0.6])
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
