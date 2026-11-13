"""Recompute every numeric answer in course/keys/4.6.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, sqrt


def phi(z):
    return 0.5 * (1 + erf(z / sqrt(2)))


def capm_alpha(s, h, smb=2, hml=3):
    """Figure 3-1: CAPM alpha of a fund with market beta 1 and three-factor alpha 0."""
    return s * smb + h * hml


def results():
    r = {}
    # Q1: A (beta 1.2, 11%), B (beta 0.6, 6.5%), rf 3%.
    w = 1.2 / 0.6
    r["Q1.repl"] = w * 6.5 + (1 - w) * 3
    r["Q1.profit"] = 100 * (11 - r["Q1.repl"]) / 100
    assert abs(1.2 - w * 0.6) < 1e-12

    # Q2: loadings s 0.6, h 0.5; premia SMB 1.5, HML 2.8; three-factor alpha 0.1; fees 1.2 vs 0.25.
    r["Q2.tilt"] = 0.6 * 1.5 + 0.5 * 2.8
    assert abs(r["Q2.tilt"] + 0.1 - 2.4) < 1e-9
    r["Q2.net"] = 0.1 - 1.2 + 0.25

    # Q3: HML sd 12 a year, 15 years.
    se = 12 / sqrt(15)
    r["Q3.se"] = se
    r["Q3.p"] = 100 * phi(-4 / se)
    r["Q3.p2"] = 100 * phi(-2 / se)

    # Q4: loadings 1, 0.8, 0.6; factor sds 16, 10, 11.
    r["Q4.vol"] = sqrt(16**2 + 0.8**2 * 10**2 + 0.6**2 * 11**2)
    r["Q4.te"] = sqrt(0.8**2 * 10**2 + 0.6**2 * 11**2)

    # Check C3: CAPM alpha goes from 2.8 to -0.2.
    assert abs(capm_alpha(0.5, 0.6) - 2.8) < 1e-9 and abs(capm_alpha(0.5, -0.4) + 0.2) < 1e-9
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
