"""Recompute every numeric answer in course/keys/6.7.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
import math


def return_path(seed=6, years=40):
    """Figure 4-1: the fixed simulated path, same generator as src/scripts/widgets/rebalance.ts."""
    x = seed

    def u():
        nonlocal x
        x = (1664525 * x + 1013904223) % 4294967296
        return (x + 0.5) / 4294967296

    out = []
    for _ in range(years):
        u1, u2, u3, u4 = u(), u(), u(), u()
        z1 = math.sqrt(-2 * math.log(u1)) * math.cos(2 * math.pi * u2)
        z2 = math.sqrt(-2 * math.log(u3)) * math.cos(2 * math.pi * u4)
        out.append((0.07 + 0.17 * z1, 0.04 + 0.06 * z2))
    return out


def simulate(path, band):
    s, b, n, w = 60.0, 40.0, 0, [0.6]
    for rs, rb in path:
        s *= 1 + rs
        b *= 1 + rb
        if band is not None and abs(s / (s + b) - 0.6) > band:
            tot = s + b
            s, b, n = 0.6 * tot, 0.4 * tot, n + 1
        w.append(s / (s + b))
    return w, n


def results():
    r = {}
    p = return_path()
    w, _ = simulate(p, None)
    assert round(100 * w[-1]) == 80 and round(100 * max(w)) == 90
    assert [simulate(p, b / 100)[1] for b in (1, 5, 10)] == [36, 10, 4]

    # Q1: drift and the volatility-harvesting example.
    s, b = 0.6 * 1.3, 0.4 * 0.95
    r["Q1.w"] = 100 * s / (s + b)
    r["Q1.sell"] = 500 * (s - 0.6 * (s + b))
    r["Q1.bonus"] = 100 * ((0.5 * 1.5 + 0.5) * (0.5 * (2 / 3) + 0.5) - 1)

    # Q2: 60% US (16%) and 40% international (18%), correlation 0.8.
    r["Q2.sd"] = math.sqrt(0.36 * 256 + 0.16 * 324 + 2 * 0.6 * 0.4 * 0.8 * 16 * 18)

    # Q3: expected returns of two mixes.
    r["Q3.e60"] = 0.6 * 5 + 0.4 * 4
    r["Q3.e30"] = 0.3 * 5 + 0.7 * 4

    # Q4: tax on selling 100 with half of it gain, at 15%.
    r["Q4.tax"] = 100 * 0.5 * 0.15
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
