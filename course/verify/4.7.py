"""Recompute every numeric answer in course/keys/4.7.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""

NEWS, SPEED = 5, 0.3


def car(k, day):
    """Figure 3-1: cumulative abnormal return with day-0 reaction share k."""
    return 0 if day < 0 else NEWS - NEWS * (1 - k) * (1 - SPEED) ** day


def results():
    r = {}
    # Q1: beta 1.3, alpha 0.
    mkt = [0.5, -1.0, 0.8, 0.2]
    stock = [0.9, 6.2, 1.5, 0.1]
    ar = [s - 1.3 * m for s, m in zip(stock, mkt)]
    r["Q1.ar0"] = ar[1]
    r["Q1.car"] = sum(ar)
    assert abs(ar[2] - 0.46) < 1e-9 and ar[2] / 2 < 0.25

    # Q2: 50 independent useless rules, P(t > 1.96) = 2.5%.
    r["Q2.exp"] = 50 * 0.025
    r["Q2.p"] = 100 * (1 - 0.975**50)
    assert abs(20 * 0.15 - 3) < 1e-9

    # Q3: team costs 2 million a year, adds 0.3 points.
    r["Q3.gain"] = 500 * 0.003
    r["Q3.size"] = 2 / 0.003

    # Check C3: with k = 0.6 the CAR rises about 2 points after day 0.
    assert abs((car(0.6, 10) - car(0.6, 0)) - 2) < 0.1
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
