"""Recompute every numeric answer in course/keys/3.5.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def curve(lr, tp, s1=4.0, decay=0.7):
    """Figure 3-1: yields (with premium, expectations only) for maturities 1..10, in percent."""
    full, eh, sf, se = [], [], 0.0, 0.0
    for t in range(1, 11):
        e = lr + (s1 - lr) * decay ** (t - 1)
        se += e
        sf += e + tp * (t - 1) / 9
        eh.append(se / t)
        full.append(sf / t)
    return full, eh


def results():
    r = {}
    f = 1.04**2 / 1.03 - 1
    r["C1.f"] = 100 * f
    p0, p1 = 100 / 1.04**2, 100 / (1 + f)
    r["C1.p0"], r["C1.p1"] = p0, p1
    r["C1.ret"] = 100 * (p1 / p0 - 1)

    full, eh = curve(3, 2)
    r["C2.y10"], r["C2.e10"] = full[9], eh[9]
    assert full[0] == 4 and full[9] > 4

    r["C4.ride"] = 100 * (1.03**2 / 1.02 - 1)

    f2 = 1.035**2 / 1.03 - 1
    f3 = 1.04**3 / 1.035**2 - 1
    r["Q1.f2"], r["Q1.f3"] = 100 * f2, 100 * f3
    r["Q1.e2"], r["Q1.e3"] = 100 * f2 - 0.5, 100 * f3 - 1

    p0 = 100 / 1.04**2
    r["Q2.up"] = 100 * (100 / 1.05 / p0 - 1)
    r["Q2.down"] = 100 * (100 / 1.03 / p0 - 1)

    r["Q3.avg"] = 4.3 - 0.5

    r["Q4.dp"] = 9 * 0.5
    # Values that the questions now give or no longer ask for.
    for k in ['C1.f', 'C1.p0', 'C1.p1', 'C1.ret', 'C2.y10', 'C2.e10', 'C4.ride']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
