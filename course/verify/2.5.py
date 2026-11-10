"""Recompute every numeric answer in course/keys/2.5.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def taylor(pi, gap, rstar, target=2.0):
    return rstar + pi + 0.5 * (pi - target) + 0.5 * gap


def payment(loan, annual, years=30):
    m = annual / 12
    return loan * m / (1 - (1 + m) ** (-12 * years))


def results():
    r = {}
    r["C2.i1"], r["C2.i2"] = taylor(3, 0, 1), taylor(4, 0, 1)
    r["C2.r1"], r["C2.r2"] = r["C2.i1"] - 3, r["C2.i2"] - 4

    r["C3.p0"] = 4 / (0.07 - 0.03)
    r["C3.p1"] = 4 / (0.08 - 0.03)
    r["C3.ch"] = 100 * (r["C3.p1"] / r["C3.p0"] - 1)

    r["Q1.gap"] = 2 * (4.4 - 4.1)
    r["Q1.i"] = taylor(3.1, r["Q1.gap"], 1)
    r["Q1.i2"] = taylor(3.1, r["Q1.gap"], 0.5)
    r["Q1.i3"] = taylor(3.6, r["Q1.gap"], 1)

    i0 = 1 + 2 + 0.8 * (2 - 2)
    i1 = 1 + 2 + 0.8 * (4 - 2)
    r["Q2.di"] = i1 - i0
    r["Q2.dr"] = (i1 - 4) - (i0 - 2)

    r["Q3.i"] = taylor(0.5, -5, 0.5)

    r["Q4.p1"] = payment(400_000, 0.06)
    r["Q4.p2"] = payment(400_000, 0.07)
    r["Q4.ch"] = 100 * (r["Q4.p2"] / r["Q4.p1"] - 1)

    r["Q5.r0"] = (4 + 4) / 2
    r["Q5.r1"] = (4 + 3) / 2
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
