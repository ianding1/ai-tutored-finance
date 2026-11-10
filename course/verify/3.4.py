"""Recompute every numeric answer in course/keys/3.4.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def flows(coupon, n, face=100.0):
    return [(t, coupon * face / 100 + (face if t == n else 0)) for t in range(1, n + 1)]


def price(fl, y):
    return sum(cf / (1 + y) ** t for t, cf in fl)


def duration(fl, y):
    return sum(t * cf / (1 + y) ** t for t, cf in fl) / price(fl, y)


def results():
    r = {}
    b = flows(10, 3, 1000)
    assert abs(price(b, 0.08) - 1051.54) < 0.005
    r["C2.d"] = duration(b, 0.08)
    r["C2.dp"] = -round(r["C2.d"], 2) / 1.08 * 0.5

    b = flows(5, 10)
    p0 = price(b, 0.05)
    dm = duration(b, 0.05) / 1.05
    r["C3.a"] = 100 * (price(b, 0.07) / p0 - 1)
    r["C3.b"] = -dm * 2
    assert abs(100 * (price(b, 0.03) / p0 - 1) - 17.06) < 0.005

    liab = 10000 / 1.05**5
    assert abs(liab - 7835.26) < 0.005
    half = liab / 2
    r["C4.a6"] = half * (1.05 / 1.06) ** 2 + half * (1.05 / 1.06) ** 8
    r["C4.l6"] = 10000 / 1.06**5

    r["Q2.dp"] = 1.05 / 0.05
    assert abs(1 / 1.05**10 - 0.61) < 0.005

    r["Q3.roll"] = liab * 1.03**5
    r["Q3.long"] = liab * 1.05**10 / 1.03**5
    r["Q3.match"] = half * 1.05**2 * 1.03**3 + half * 1.05**8 / 1.03**3

    r["Q4.de"] = -6 * 0.02 * 100 - (-1 * 0.02 * 90)

    cz = lambda t: t * (t + 1) / 1.05**2
    r["Q5.cb"], r["Q5.cbb"] = cz(5), (cz(1) + cz(9)) / 2
    for dy, bullet, barbell in ((0.02, -9.00, -8.74), (-0.02, 10.09, 10.42)):
        f = 1.05 / (1.05 + dy)
        assert abs(100 * (f**5 - 1) - bullet) < 0.005
        assert abs(50 * (f - 1) + 50 * (f**9 - 1) - barbell) < 0.005
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
