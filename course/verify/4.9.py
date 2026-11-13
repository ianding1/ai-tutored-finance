"""Recompute every numeric answer in course/keys/4.9.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def years_needed(ir):
    """Figure 2-1: years for the expected t-value IR * sqrt(T) to reach 1.96."""
    return (1.96 / ir) ** 2


def results():
    r = {}
    # Q1: market 9% / 16%, rf 3%; fund P 12% / 24%, beta 1.1.
    r["Q1.sp"] = (12 - 3) / 24
    r["Q1.alpha"] = 12 - (3 + 1.1 * 6)
    se = sqrt(24**2 - 1.1**2 * 16**2)
    ir = r["Q1.alpha"] / se
    r["Q1.ir"] = ir
    r["Q1.s"] = sqrt(((9 - 3) / 16) ** 2 + ir**2)
    assert abs(r["Q1.sp"] - 0.375) < 1e-12

    # Q2: 2,000 funds, 10 years, p = 0.5 a year; active return 2, tracking error 4.
    p = 0.5**10
    r["Q2.n"] = 2000 * p
    r["Q2.pa"] = 100 * (1 - (1 - p) ** 2000)
    r["Q2.t"] = 2 / 4 * sqrt(10)

    # Q3: 60 survivors at 7.5%, 40 closed at 3%.
    r["Q3.all"] = 0.6 * 7.5 + 0.4 * 3
    r["Q3.bias"] = 7.5 - r["Q3.all"]

    # Q4: beta 0.7, rf 0.
    r["Q4.a1"] = -20 - 0.7 * (-30)
    r["Q4.a2"] = 25 - 0.7 * 35

    # Check C3: about 43 years at IR 0.3, about 11 at 0.6.
    assert round(years_needed(0.3)) == 43 and round(years_needed(0.6)) == 11
    assert abs(years_needed(0.5) - 15.4) < 0.1
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
