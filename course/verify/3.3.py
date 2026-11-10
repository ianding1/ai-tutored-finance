"""Recompute every numeric answer in course/keys/3.3.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def annuity(r, n):
    return (1 - (1 + r) ** -n) / r


def price(coupon, y, n, face=1000.0):
    return coupon * annuity(y, n) + face / (1 + y) ** n


def solve(f, lo, hi):
    flo = f(lo)
    for _ in range(200):
        mid = (lo + hi) / 2
        if (f(mid) > 0) == (flo > 0):
            lo, flo = mid, f(mid)
        else:
            hi = mid
    return (lo + hi) / 2


def results():
    r = {}
    p0 = price(60, 0.05, 5)
    r["C1.p"] = p0

    r["C2.p4"], r["C2.p6"] = price(5, 0.04, 10, 100), price(5, 0.06, 10, 100)
    assert abs(price(5, 0.05, 10, 100) - 100) < 1e-9
    r["C2.up"], r["C2.down"] = r["C2.p4"] - 100, 100 - r["C2.p6"]

    r["C3.p1"] = price(60, 0.05, 4)
    r["C3.ret"] = 100 * (60 + r["C3.p1"] - p0) / p0
    r["C3.p1b"] = price(60, 0.06, 4)
    r["C3.retb"] = 100 * (60 + r["C3.p1b"] - p0) / p0

    pc = 60 / 1.04 + 1060 / 1.05**2
    r["C4.p"] = pc
    r["C4.ytm"] = 100 * solve(lambda y: 60 / (1 + y) + 1060 / (1 + y) ** 2 - pc, 0.0, 0.2)

    r["C5.f"] = 100 * (1.05**2 / 1.04 - 1)

    r["Q1.p"] = 2 * annuity(0.0225, 20) + 100 / 1.0225**20
    r["Q1.ear"] = 100 * (1.0225**2 - 1)

    z = lambda y, n: 100 / (1 + y) ** n
    r["Q2.p30"] = z(0.05, 30)
    r["Q2.dn30"] = 100 * (z(0.06, 30) / z(0.05, 30) - 1)
    r["Q2.up30"] = 100 * (z(0.04, 30) / z(0.05, 30) - 1)
    r["Q2.dn2"] = 100 * (z(0.06, 2) / z(0.05, 2) - 1)
    r["Q2.up2"] = 100 * (z(0.04, 2) / z(0.05, 2) - 1)

    spot = [0.03, 0.05, 0.06]

    def from_spot(c):
        return sum(c / (1 + spot[t]) ** (t + 1) for t in range(3)) + 100 / (1 + spot[2]) ** 3

    def ytm(c, p):
        return 100 * solve(lambda y: sum(c / (1 + y) ** (t + 1) for t in range(3)) + 100 / (1 + y) ** 3 - p, 0.0, 0.2)

    r["Q3.pl"], r["Q3.ph"] = from_spot(2), from_spot(10)
    r["Q3.yl"], r["Q3.yh"] = ytm(2, r["Q3.pl"]), ytm(10, r["Q3.ph"])

    r["Q4.f"] = 100 * (1.04**2 / 1.03 - 1)

    fv = 60 * (1.03**5 - 1) / 0.03
    r["Q5.fv"] = fv
    r["Q5.r"] = 100 * (((1000 + fv) / p0) ** 0.2 - 1)
    # Intermediate values that the questions now give or no longer ask for.
    for k in ['C2.p4', 'C2.p6', 'C3.p1', 'C3.p1b', 'C3.ret', 'C4.ytm', 'Q2.p30']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
