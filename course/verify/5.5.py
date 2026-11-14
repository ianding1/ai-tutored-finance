"""Recompute every numeric answer in course/keys/5.5.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def net_return(g, m):
    """Figure 3-1: yearly return after a management fee m and a 20% incentive fee (in %)."""
    return 0.8 * (g - m) if g > m else g - m


def results():
    r = {}
    # Figure 3-1 defaults quoted in the key and in check C3.
    n = net_return(10, 2)
    g20, n20 = 100 * 1.1**20, 100 * (1 + n / 100) ** 20
    assert round(n, 1) == 6.4 and round(100 * (10 - n) / 10) == 36
    assert round(g20) == 673 and round(n20) == 346 and round(100 * (g20 - n20) / (g20 - 100)) == 57

    # Q1: 2 and 20 with a high-water mark; +20%, -20%, +20%.
    nav, hwm = 100.0, 100.0
    for g in (0.2, -0.2, 0.2):
        nav *= 1 + g
        nav -= 0.02 * nav
        if nav > hwm:
            nav -= 0.2 * (nav - hwm)
            hwm = nav
    gross = 100 * 1.2 * 0.8 * 1.2
    r["Q1.net"] = nav
    r["Q1.share"] = 100 * (gross - nav) / (gross - 100)

    # Q2: IRR and reinvestment.
    r["Q2.irra"] = 100 * (1.6**0.5 - 1)
    r["Q2.irrb"] = 100 * (2.5 ** (1 / 8) - 1)
    r["Q2.fa"] = 160 * 1.08**6

    # Q3: unsmoothing with a = 0.6.
    factor = sqrt((1 - 0.6) / (1 + 0.6))
    r["Q3.vol"] = 8 / factor
    r["Q3.sr"] = 4.8 / 8
    r["Q3.srt"] = 4.8 / (8 / factor)

    # Q4: adding 5% bitcoin to 60/40.
    def var(ws, wb, wc):
        return (ws * 16) ** 2 + (wb * 6) ** 2 + (wc * 70) ** 2 + 2 * ws * wc * 0.4 * 16 * 70

    r["Q4.v0"] = sqrt(var(0.6, 0.4, 0))
    v1 = var(0.57, 0.38, 0.05)
    r["Q4.v1"] = sqrt(v1)
    cov_cp = 0.05 * 70**2 + 0.57 * 0.4 * 16 * 70
    r["Q4.rc"] = 100 * 0.05 * cov_cp / v1
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
