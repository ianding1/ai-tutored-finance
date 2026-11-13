"""Recompute every numeric answer in course/keys/4.5.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def results():
    r = {}
    # Q1: R^2 = 0.25 for both stocks, so rho_iM = 0.5; observed pairwise correlation 0.6.
    rho_m = sqrt(0.25)
    r["Q1.rho"] = rho_m * rho_m
    r["Q1.lim"] = 0.6  # limit of sigma^2/n + (1 - 1/n) c with c = 0.6 sigma^2, in units of sigma^2
    r["Q1.mod"] = 0.25  # beta^2 sigma_M^2 = R^2 sigma^2
    n = 40
    assert abs((1 / n + (1 - 1 / n) * 0.6) - 0.61) < 1e-9

    # Q2: intercept 0.8% a month, residual sd 6% a month, 60 months.
    se = 6 / sqrt(60)
    r["Q2.se"] = se
    r["Q2.t"] = 0.8 / se
    r["Q2.months"] = (1.96 * 6 / 0.8) ** 2
    assert 0.8 - 1.96 * se < 0 < 0.8 + 1.96 * se

    # Q3: precision-weighted average of 1.9 (SE 0.45) and 1.2 (SE 0.1).
    w1, w2 = 1 / 0.45**2, 1 / 0.1**2
    b = (w1 * 1.9 + w2 * 1.2) / (w1 + w2)
    r["Q3.beta"] = b
    r["Q3.diff"] = (3 + 1.9 * 5) - (3 + b * 5)
    assert round(w1 / (w1 + w2), 3) == 0.047 and round(3 + b * 5, 2) == 9.16

    # Q4: 100 million yuan, beta 1.2, 25 stocks with firm-specific volatility 35%.
    r["Q4.short"] = 1.2 * 1
    r["Q4.vol"] = 35 / sqrt(25)
    r["Q4.mexp"] = 0.15 * 18
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
