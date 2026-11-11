"""Recompute every numeric answer in course/keys/0.4.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt
from statistics import NormalDist


def sample_sd(x):
    m = sum(x) / len(x)
    return sqrt(sum((v - m) ** 2 for v in x) / (len(x) - 1))


def results():
    r = {}
    N = NormalDist()
    # C1 uses the 68-95-99.7 rule: (1 - 0.68) / 2 and (1 - 0.95) / 2.
    r["C1.below"] = 100 * (1 - 0.68) / 2
    r["C1.above"] = 100 * (1 - 0.95) / 2
    r["C2.z"] = abs((-20 - 0) / 1)

    outcomes = [(225, 0.25), (90, 0.5), (36, 0.25)]
    r["C3.mean"] = sum(w * p for w, p in outcomes)
    r["C3.median"] = 100 * 1.5 * 0.6

    x = [12, -4, 8, 24]
    r["C4.mean"] = sum(x) / len(x)
    r["C4.s"] = sample_sd(x)

    se = 20 / sqrt(25)
    r["C5.se"] = se
    r["C5.lo"] = 6 - 1.96 * se
    r["C5.hi"] = 6 + 1.96 * se
    r["C6.n"] = (16 / 2) ** 2

    r["Q3.z"] = (0 - 7) / 15
    r["Q3.p"] = 100 * N.cdf(-0.47)

    r["Q4.r"] = 100 * (0.6 - 0.4) / 2
    r["Q4.mean"] = 100 * 1.1**20
    r["Q4.median"] = 100 * (1.6 * 0.6) ** 10
    r["Q4.median_h"] = 100 * (1.3 * 0.8) ** 10
    r["Q4.mean_h"] = 100 * 1.05**20
    r["Q3.z10"] = (0 - 7) / (15 / 10**0.5)
    r["Q3.p10"] = 100 * N.cdf(-1.48)
    r["Q5.n"] = __import__("math").ceil((1.96 * 6 / 3) ** 2)

    se5 = 6 / sqrt(5)
    r["Q5.se"] = se5
    r["Q5.t"] = 3 / se5
    r["Q6.false20"] = 20 * 0.05
    r["Q6.false100"] = 100 * 0.05
    # Values that the questions now give or no longer ask for.
    for k in ['Q4.r']:
        del r[k]
    # Values that the questions now give or no longer ask for.
    for k in ['C1.below', 'C1.above', 'C2.z', 'C3.mean', 'C3.median', 'C4.mean', 'C4.s', 'C5.se', 'C5.lo', 'C5.hi', 'C6.n', 'Q3.z', 'Q4.mean']:
        del r[k]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
