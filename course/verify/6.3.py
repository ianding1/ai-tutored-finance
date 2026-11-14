"""Recompute every numeric answer in course/keys/6.3.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, sqrt


def n(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def beat(f, s, years):
    """Probability (in %) that a fund with no skill, cost f and tracking error s beats its index."""
    return 100 * n(-f * sqrt(years) / s)


def results():
    r = {}
    # Figure 3-1 values quoted in the key and in check C3.
    assert [round(beat(1, 5, t), 1) for t in (1, 10, 20)] == [42.1, 26.4, 18.6]
    assert [round(beat(1, 10, t), 1) for t in (1, 10, 20)] == [46.0, 37.6, 32.7]
    # Persistence under random rankings.
    assert round(100 * 0.25**4, 1) == 0.4 and round(505 * 0.25**4) == 2

    # Q1: active investors lag by their average cost.
    r["Q1.gap"] = -0.80

    # Q2: credit overweight contribution.
    r["Q2.credit"] = 0.20 * 2.5

    # Q3: survivors who beat, as a share of all original funds.
    r["Q3.share"] = 36 * 0.25

    # Q4: Jensen alpha.
    r["Q4.alpha"] = 13 - (2 + 1.2 * (12 - 2))
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
