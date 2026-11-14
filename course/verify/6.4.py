"""Recompute every numeric answer in course/keys/6.4.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def brinson(wp, rp, wb, rb):
    rbt = sum(w * r for w, r in zip(wb, rb))
    alloc = sum((p - b) * (r - rbt) for p, b, r in zip(wp, wb, rb))
    sel = sum(p * (x - r) for p, x, r in zip(wp, rp, rb))
    total = sum(w * r for w, r in zip(wp, rp)) - rbt
    assert abs(alloc + sel - total) < 1e-9
    return alloc, sel, total


def results():
    r = {}
    # Figure 3-1 defaults: weight 50% in A at 15%; benchmark 30/70 at 20/5.
    a, s, t = brinson([0.5, 0.5], [15, 5], [0.3, 0.7], [20, 5])
    assert (round(a, 1), round(s, 1), round(t, 1)) == (3.0, -2.5, 0.5)

    # Q1: three sectors.
    a, s, t = brinson([0.5, 0.2, 0.3], [20, 8, -4], [0.3, 0.2, 0.5], [25, 5, -5])
    r["Q1.alloc"], r["Q1.sel"], r["Q1.total"] = a, s, t

    # Q2: factor contributions relative to the market.
    fc = 0.6 * 4 + (-0.3) * (-2)
    r["Q2.fc"] = fc
    r["Q2.alpha"] = 3 - fc

    # Q3: net excess return at 1 and 8 billion dollars.
    r["Q3.n1"] = 2 - 0.4 * 1 - 0.9
    r["Q3.n8"] = 2 - 0.4 * 8 - 0.7

    # Q4: liquidity mismatch.
    r["Q4.s1"] = 100 * 30 / (100 - 20)
    r["Q4.loss"] = 100 * 30 * 0.2 / (100 - 20 - 40)
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
