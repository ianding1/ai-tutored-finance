"""Recompute every numeric answer in course/keys/4.4.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""

# Figure 2-1: analysts' expected returns (%) and betas of four stocks.
STOCKS = {"U": (0.6, 6.5), "V": (1.0, 8.0), "W": (1.5, 9.0), "X": (1.2, 11.0)}


def alpha(name, rf, mrp):
    b, e = STOCKS[name]
    return e - (rf + b * mrp)


def results():
    r = {}
    r["Q1.beta"] = 384 / 16**2
    r["Q1.req"] = 3 + r["Q1.beta"] * (8 - 3)

    r["Q2.bt"] = (1.2 - 0.4 * 0.6) / 0.6
    r["Q2.rs"], r["Q2.rfirm"] = 3 + 0.6 * 5, 3 + 1.2 * 5

    r["Q3.b"] = 0.5 * 30 / 15
    r["Q3.share"] = 100 * 0.5**2

    be = 0.8 * (1 + 1)
    re = 3 + be * 5
    r["Q4.be"], r["Q4.re"] = be, re
    r["Q4.wacc"] = 0.5 * re + 0.5 * 3
    assert abs(r["Q4.wacc"] - (3 + 0.8 * 5)) < 1e-9
    assert alpha("W", 3, 7) < alpha("W", 3, 5)
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
