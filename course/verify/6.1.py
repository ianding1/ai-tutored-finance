"""Recompute every numeric answer in course/keys/6.1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def paying_fund(w0, r, d, t, years):
    """After-tax value at sale of a fund paying out d of its value each year as taxable gains."""
    w, basis = w0, w0
    for _ in range(years):
        w *= 1 + r
        dist = d * w
        w -= t * dist
        basis += (1 - t) * dist
    return w - t * (w - basis)


def deferring_fund(w0, r, t, years):
    w = w0 * (1 + r) ** years
    return w - t * (w - w0)


def results():
    r = {}
    # Figure 3-1 defaults quoted in the key.
    assert round(deferring_fund(100, 0.07, 0.15, 30)) == 662
    assert round(paying_fund(100, 0.07, 0.04, 0.15, 30)) == 601

    # Q1: 100 thousand, 20 years, 7%, 5% payout, 15% tax.
    r["Q1.mf"] = paying_fund(100, 0.07, 0.05, 0.15, 20)
    r["Q1.etf"] = deferring_fund(100, 0.07, 0.15, 20)

    # Q3: closed-end fund payout rate at the market price.
    r["Q3.y"] = 100 * 0.06 * 20 / 17

    # Q4: equal-weight rebalancing after A rises 50%.
    wa = 1.5 / 3.5
    r["Q4.sell"] = 100 * (wa - 1 / 3)
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
