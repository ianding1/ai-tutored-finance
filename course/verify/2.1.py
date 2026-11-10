"""Recompute every numeric answer in course/keys/2.1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def results():
    r = {}
    # C1: C 700, I 200, G 180, X 120, M 150; then +50 of unsold goods.
    y = 700 + 200 + 180 + (120 - 150)
    r["C1.y"], r["C1.inv"] = y, y + 50

    # C2: apples and oranges, year 1 prices as the base.
    n1 = 100 * 1 + 50 * 2
    n2 = 110 * 1.2 + 50 * 2.4
    r2 = 110 * 1 + 50 * 2
    r["C2.n1"], r["C2.n2"], r["C2.r2"] = n1, n2, r2
    r["C2.g"], r["C2.d"] = 100 * (r2 / n1 - 1), 100 * n2 / r2

    # C3: half the budget on A; A's price +60%.
    r["C3.fixed"] = 0.5 * 60
    r["C3.util"] = 100 * (sqrt(1.6) - 1)
    r["C3.gap"] = r["C3.fixed"] - r["C3.util"]

    # C4: population 250, employed 150, unemployed 7; then 2 stop looking.
    r["C4.u"], r["C4.lfpr"] = 100 * 7 / 157, 100 * 157 / 250
    r["C4.u2"], r["C4.lfpr2"] = 100 * 5 / 155, 100 * 155 / 250

    # Q2: three firms.
    r["Q2.gdp"] = 200 + (500 - 200) + (900 - 500)
    assert r["Q2.gdp"] == (150 + 200 + 250) + (50 + 100 + 150) == 900

    # Q3: A's price +44%.
    r["Q3.fixed"], r["Q3.util"] = 22, 100 * (sqrt(1.44) - 1)
    r["Q3.gap"] = r["Q3.fixed"] - r["Q3.util"]

    # Q4: participation 80% under 65 and 40% at 65+; share of 65+ 20% then 30%.
    r["Q4.before"] = 100 * (0.8 * 0.8 + 0.2 * 0.4)
    r["Q4.after"] = 100 * (0.7 * 0.8 + 0.3 * 0.4)

    # Q5: quarterly growth 0.2%, 0.8%, 0.5%, -0.1%.
    r["Q5.ann"] = 100 * (0.999**4 - 1)
    r["Q5.yoy"] = 100 * (1.002 * 1.008 * 1.005 * 0.999 - 1)
    # Values that the questions now give or no longer ask for.
    for k in ['C1.y', 'C2.n1', 'C2.n2', 'C2.r2', 'C3.fixed', 'C4.u', 'C4.lfpr', 'Q3.fixed', 'Q3.util', 'Q3.gap']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
