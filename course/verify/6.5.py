"""Recompute every numeric answer in course/keys/6.5.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def taxable_stock(w, years, g=0.05, dy=0.02, td=0.15, tg=0.15):
    """Taxable stock fund: price growth g, dividend yield dy taxed at td and reinvested, tg on the gain at sale."""
    basis = w
    for _ in range(years):
        d = w * dy
        w = w * (1 + g) + d * (1 - td)
        basis += d * (1 - td)
    return w - tg * (w - basis)


def results():
    r = {}
    # Figure 2-1 values quoted in the key and in check C2.
    g30 = 1.07**30
    assert [round(x) for x in (100 * g30 * 0.78, 100 * 0.76 * g30, taxable_stock(76, 30))] == [594, 579, 481]
    assert round(100 * g30 * 0.76) == round(100 * 0.76 * g30) == 579

    # Q1: 10 thousand dollars, 32% now, 22% later.
    r["Q1.tr"] = 10 * g30 * 0.78
    r["Q1.roth"] = 10 * 0.68 * g30

    # Q2: asset location over 20 years.
    a = 250 * 1.05**20 * 0.76 + taxable_stock(250, 20, g=0.055, dy=0.015)
    b = 250 * 1.07**20 * 0.76 + 250 * (1 + 0.05 * 0.68) ** 20
    r["Q2.a"] = a
    r["Q2.b"] = b

    # Q3: ESPP 15% discount on the purchase-date price.
    r["Q3.ret"] = 100 * 15 / 85
    r["Q3.at"] = 100 * 15 * (1 - 0.32) / 85

    # Q4: harvesting a 20,000 dollar loss against 15% gains, 20 years at 7%.
    now = 20000 * 0.15
    pv = now / 1.07**20
    r["Q4.now"] = now
    r["Q4.pv"] = pv
    r["Q4.net"] = now - pv
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
