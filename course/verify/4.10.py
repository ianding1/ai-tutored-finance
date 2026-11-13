"""Recompute every numeric answer in course/keys/4.10.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt

TRUE_MU = [3, 4, 6, 7]
EST_MU = [1, 8, 3, 10]
SIGMA = 20


def weights(w):
    """Figure 4-1: weights proportional to estimates shrunk toward their average."""
    avg = sum(EST_MU) / len(EST_MU)
    m = [(1 - w) * e + w * avg for e in EST_MU]
    return [v / sum(m) for v in m]


def sharpe(x, mu):
    return sum(a * b for a, b in zip(x, mu)) / (SIGMA * sqrt(sum(a * a for a in x)))


def results():
    r = {}
    # Q1: sigma 18, 10 years, 2,520 daily observations.
    r["Q1.se"] = 18 / sqrt(10)
    r["Q1.sesd"] = 18 / sqrt(2 * 2520)
    r["Q1.years"] = (18 / 1) ** 2

    # Q2: 10 identical assets at 6%, estimation sd 4, E[max of 10 std normals] about 1.54.
    r["Q2.exp"] = 6 + 1.54 * 4
    r["Q2.bias"] = 1.54 * 4

    # Q3: sigma_A 15, sigma_B 25, rho 0.2.
    cov = 0.2 * 15 * 25
    wa = (25**2 - cov) / (15**2 + 25**2 - 2 * cov)
    r["Q3.wa"] = wa
    r["Q3.sd"] = sqrt(wa**2 * 225 + (1 - wa) ** 2 * 625 + 2 * wa * (1 - wa) * cov)

    # Q4: equal weights, sigma 20, rho 0.5 and 0.9.
    r["Q4.n"] = 20 * sqrt((1 + 0.5) / 2)
    r["Q4.c"] = 20 * sqrt((1 + 0.9) / 2)

    # Figure 4-1 numbers quoted in check C4 and the context.
    t = [round(sharpe(weights(k / 10), TRUE_MU), 3) for k in range(11)]
    e = [round(sharpe(weights(k / 10), EST_MU), 3) for k in range(11)]
    assert t[0] == 0.466 and t[7] == 0.508 and t[10] == 0.5 and max(t) == t[7]
    assert e[0] == 0.66 and e[10] == 0.55 and all(a >= b for a, b in zip(e, e[1:]))
    assert round(sqrt(sum(m * m for m in TRUE_MU)) / SIGMA, 3) == 0.524
    assert [round(v, 2) for v in [m / sum(TRUE_MU) for m in TRUE_MU]] == [0.15, 0.2, 0.3, 0.35]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
