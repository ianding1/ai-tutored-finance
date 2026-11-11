"""Recompute every numeric answer in course/keys/3.10.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def multiple(g, roic, wacc):
    """Figure 3-1: value / next year's NOPAT = (1 - g / ROIC) / (WACC - g), rates in %."""
    return (1 - g / roic) / ((wacc - g) / 100)


def results():
    r = {}
    r["C1.f"] = 200 * (1 - 0.25) + 40 - 70 - 20

    r["C2.w"] = 0.6 * 10 + 0.4 * 5 * (1 - 0.25)

    r["C3.m"], r["C3.m0"], r["C3.mlow"] = multiple(3, 15, 8), multiple(0, 15, 8), multiple(3, 6, 8)

    fcf = [100, 110, 120]
    pv = sum(c / 1.08 ** (t + 1) for t, c in enumerate(fcf))
    tv = 120 * 1.03 / (0.08 - 0.03)
    ev = pv + tv / 1.08**3
    r["Q1.ev"], r["Q1.ps"] = ev, (ev - 500) / 100
    r["Q1.share"] = 100 * tv / 1.08**3 / ev

    r["Q2.fcfe"] = 100 - 20 * (1 - 0.25) + 10

    r["Q3.w0"] = 0.8 * 9 + 0.2 * 4 * 0.75
    r["Q3.w1"] = 0.5 * 12 + 0.5 * 5.2 * 0.75

    r["Q4.v16"], r["Q4.naive"] = 100 * multiple(4, 16, 8), 100 / 0.04
    r["Q4.over"] = 100 * (r["Q4.naive"] / r["Q4.v16"] - 1)
    # Values that the questions now give or no longer ask for.
    for k in ['C1.f', 'C2.w', 'C3.m', 'C3.m0', 'C3.mlow']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
