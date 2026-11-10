"""Recompute every numeric answer in course/keys/2.6.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def debt_path(b, r, g, d, years):
    for _ in range(years):
        b = (1 + r) / (1 + g) * b + d
    return b


def stable_deficit(r, g, b=100.0):
    return (g - r) / (1 + g) * b


def results():
    res = {}
    b = 0.8
    res["C1.kg"] = 1 / (1 - b)
    res["C1.dg"] = 100 * res["C1.kg"]
    res["C1.dt"] = 100 * b / (1 - b)

    y = lambda g, r: 4 * (400 + g - 20 * r)
    assert y(400, 5) == 2800
    res["C2.y"] = y(500, 7)
    res["C2.dy"] = res["C2.y"] - 2800
    res["C2.di"] = (500 - 20 * 7) - (500 - 20 * 5)

    res["C3.b30"] = debt_path(100, 0.035, 0.04, 3, 30)
    res["C3.s1"] = stable_deficit(0.035, 0.04)
    res["C3.s2"] = stable_deficit(0.05, 0.04)

    res["C4.pv"] = 1000 * 1.05 / 1.05

    b = 0.75
    res["Q1.kt"] = -b / (1 - b)
    res["Q1.bb"] = (100 / (1 - b) - 100 * b / (1 - b)) / 100

    res["Q2.k0"] = 1 / (1 - 0.8)
    res["Q2.k"] = 1 / (1 - 0.8 * 0.75)
    res["Q2.dy0"], res["Q2.dy"] = -100 * res["Q2.k0"], -100 * res["Q2.k"]

    res["Q3.b1"] = debt_path(100, 0.04, 0.04, 3, 10)
    res["Q3.b2"] = debt_path(100, 0.05, 0.04, 3, 10)
    res["Q3.s"] = -stable_deficit(0.05, 0.04)
    res["Q3.d2"] = stable_deficit(0.04, 0.06)

    res["Q4.ns1"] = 200 - 200
    res["Q4.ns2"] = 0.25 * 200 - 200

    res["Q5.out"] = 100 * 1.143 / 7.396
    res["Q5.rev"] = 100 * 1.143 / 5.403
    res["Q5.add"] = 31 * 0.01
    res["Q5.prim"] = (7.396 - 5.403) - 1.143
    return res


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
