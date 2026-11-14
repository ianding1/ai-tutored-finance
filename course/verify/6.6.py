"""Recompute every numeric answer in course/keys/6.6.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def capital(g, s):
    """Figure 1-1: human and financial capital at the start of each age 25..65."""
    def wage(a):
        return 100 * (1 + g) ** (a - 25)

    hc, fc, f = [], [], 0.0
    for a in range(25, 66):
        hc.append(sum(wage(k) / 1.03 ** (k - a) for k in range(a, 65)))
        fc.append(f)
        if a <= 64:
            f = f * 1.04 + s * wage(a)
    return hc, fc


def results():
    r = {}
    hc, fc = capital(0.02, 0.15)
    shares = [round(100 * hc[a - 25] / (hc[a - 25] + fc[a - 25])) for a in (25, 40, 55, 64)]
    assert shares == [100, 90, 62, 11]

    # Q1: Treasury bills after federal tax vs a 2.9% mortgage.
    r["Q1.atb"] = 4.0 * (1 - 0.24)
    r["Q1.gap"] = r["Q1.atb"] - 2.9

    # Q2: 90 a year for 20 years at 2% real.
    pv = 90 * (1 - 1.02**-20) / 0.02
    r["Q2.pv"] = pv
    r["Q2.need"] = pv - 300

    # Q3: growing annuity, 200 growing 2%, discounted 3%, 35 years.
    h = 200 / (0.03 - 0.02) * (1 - (1.02 / 1.03) ** 35)
    r["Q3.hc"] = h
    r["Q3.sh"] = 100 * h / (h + 150)

    # Q4: emergency fund.
    r["Q4.fund"] = 9 * 10 - 6 * 4
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
