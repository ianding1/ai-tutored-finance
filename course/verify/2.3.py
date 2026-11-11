"""Recompute every numeric answer in course/keys/2.3.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def mult(r, c):
    return (1 + c) / (c + r)


def results():
    r = {}
    # C1: widget, base 100.
    r["C1.m1"], r["C1.m2"] = mult(0.1, 0), mult(0.1, 0.2)
    r["C1.d2"] = 100 * r["C1.m2"] / 1.2
    # Simulate the rounds of the widget to check the limit.
    q, total = 0.9 / 1.2, 0.0
    for t in range(2000):
        total += 100 * q ** t
    assert abs(total - 100 * r["C1.m2"]) < 1e-9

    # C2: bank balance sheet.
    r["C2.loss"] = 90 * 0.10
    r["C2.eq"] = 8 - r["C2.loss"]

    # C3: quantity theory, approximate form.
    r["C3.pi1"], r["C3.pi2"] = 7 - 3, 7 - 2 - 3

    # C4: Fisher.
    r["C4.r1"] = 100 * (1.05 / 1.02 - 1)
    r["C4.r2"] = 100 * (1.05 / 1.06 - 1)

    # Q1: r = 20%, then 25%.
    r["Q1.d"] = 1000 / 0.2
    r["Q1.l"] = r["Q1.d"] - 1000
    r["Q1.d2"] = 1000 / 0.25

    # Q2: base x4, money x1.5.
    r["Q2.ratio"] = 100 * 1.5 / 4

    # Q3: 40% money growth, 2% real growth, velocity +5%.
    r["Q3.approx"] = 40 + 5 - 2
    r["Q3.exact"] = 100 * (1.40 * 1.05 / 1.02 - 1)

    # Q4: 25% tax on nominal interest.
    r["Q4.a"] = 100 * (1 + 0.05 * 0.75) / 1.02 - 100
    r["Q4.pre"] = 100 * (1.09 / 1.06 - 1)
    r["Q4.b"] = 100 * (1 + 0.09 * 0.75) / 1.06 - 100
    r["Q4.eff"] = 100 * (round(r["Q4.pre"], 2) - round(r["Q4.b"], 2)) / round(r["Q4.pre"], 2)

    # Q5: FDIC limit 250,000.
    r["Q5.share"] = 100 * (1_000_000 - 250_000) / 1_000_000
    # Values that the questions now give or no longer ask for.
    for k in ['C1.d2', 'C4.r1', 'Q4.a', 'Q5.share']:
        del r[k]
    # Values that the questions now give or no longer ask for.
    for k in ['C1.m1', 'C1.m2', 'C2.loss', 'C2.eq', 'C3.pi1', 'C3.pi2', 'C4.r2']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
