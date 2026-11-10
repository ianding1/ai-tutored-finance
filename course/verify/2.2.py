"""Recompute every numeric answer in course/keys/2.2.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def steady(s, a=1 / 3, dn=0.06, A=1.0):
    k = (s * A / dn) ** (1 / (1 - a))
    return k, A * k ** a


def results():
    r = {}
    # C1: alpha 1/3, gK 3%, gL 1%, gY 2.5%.
    r["C1.ga"] = 2.5 - 3 / 3 - 2 / 3 * 1
    r["C1.gy"] = 2.5 - 1
    r["C1.deep"] = (3 - 1) / 3
    assert abs(r["C1.ga"] + r["C1.deep"] - r["C1.gy"]) < 1e-12

    # C2: widget s 0.2 -> 0.3 (widget uses alpha 0.3333).
    for i, s in ((1, 0.2), (2, 0.3)):
        k, y = steady(s, a=0.3333)
        r[f"C2.k{i}"], r[f"C2.y{i}"] = k, y

    # C3: r 8%, next dividend 1, growth 6% and 2%.
    r["C3.pa"], r["C3.pb"] = 1 / (0.08 - 0.06), 1 / (0.08 - 0.02)
    ra, rb = 1 / r["C3.pa"] + 0.06, 1 / r["C3.pb"] + 0.02
    assert abs(ra - 0.08) < 1e-12 and abs(rb - 0.08) < 1e-12
    r["C3.r"] = 100 * ra

    # Q2: s 0.2, delta 0.05, n 2% (and 1% before).
    r["Q2.k"], r["Q2.y"] = steady(0.2, dn=0.07)
    r["Q2.y0"] = steady(0.2, dn=0.06)[1]

    # Q3: golden rule.
    c = lambda s: (1 - s) * steady(s)[1]
    r["Q3.c1"], r["Q3.c2"], r["Q3.c3"] = c(0.2), c(1 / 3), c(0.5)
    assert all(c(1 / 3) >= c(x / 1000) for x in range(1, 1000))

    # Q4: growth of k at k = 2 and k = 6.
    g = lambda k: 0.2 * k ** (-2 / 3) - 0.06
    r["Q4.gp"], r["Q4.gr"] = 100 * g(2), 100 * g(6)

    # Q5: dilution.
    r["Q5.gps"] = 100 * (1.05 / 1.02 - 1)
    r["Q5.ret"] = 1.5 + r["Q5.gps"]
    r["Q5.naive"] = 1.5 + 5
    # Values that the questions now give or no longer ask for.
    for k in ['C1.gy', 'C2.k1', 'C2.k2', 'C3.r', 'Q3.c1', 'Q3.c2', 'Q3.c3']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
