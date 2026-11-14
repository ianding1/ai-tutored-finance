"""Recompute every numeric answer in course/keys/5.4.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def swap_value(notional, fixed, market, years):
    """Value to the fixed payer just after a settlement date, flat curve, annual compounding."""
    bond = sum(notional * fixed / (1 + market) ** t for t in range(1, years + 1))
    bond += notional / (1 + market) ** years
    return notional - bond


def results():
    r = {}
    # Figure 2-1 readout values quoted in the key.
    assert round(swap_value(100, 0.04, 0.05, 5), 2) == 4.33
    assert round(swap_value(100, 0.04, 0.03, 5), 2) == -4.58
    assert round(swap_value(100, 0.04, 0.05, 2), 2) == 1.86
    assert round(swap_value(100, 0.04, 0.05, 8), 2) == 6.46

    # Q1: 80 million, pay 3%, 2 years left, market 5%.
    r["Q1.v"] = swap_value(80, 0.03, 0.05, 2)

    # Q2: spot rates 3%, 3.5%, 4%.
    z = [1 / 1.03, 1 / 1.035**2, 1 / 1.04**3]
    s = (1 - z[2]) / sum(z)
    r["Q2.s"] = 100 * s
    r["Q2.gift"] = (s - 0.035) * 100 * sum(z)

    # Q3: comparative advantage.
    r["Q3.gain"] = (6.0 - 4.0) - (1.0 - 0.3)
    r["Q3.b"] = 1.0 + 4.35

    # Q4: bond plus CDS.
    r["Q4.ret"] = 6.0 - 1.5
    r["Q4.ex"] = 6.0 - 1.5 - 4.0
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
