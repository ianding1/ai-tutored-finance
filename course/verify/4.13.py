"""Recompute every numeric answer in course/keys/4.13.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, exp, log, sqrt


def phi(z):
    return 0.5 * (1 + erf(z / sqrt(2)))


def quantile(mu, sigma, t, z):
    """Figure 1-1: wealth per dollar at standard-normal quantile z."""
    return exp((mu - sigma**2 / 2) * t + z * sigma * sqrt(t))


def results():
    r = {}
    mu, s, T = 0.07, 0.18, 30
    m = mu - s**2 / 2
    # Q1: 100 thousand dollars.
    r["Q1.med"] = 100 * exp(m * T)
    r["Q1.mean"] = 100 * exp(mu * T)
    r["Q1.p"] = 100 * phi((log(4) - m * T) / (s * sqrt(T)))
    assert round(100 * 1.07**30) == 761

    # Q2: parameter uncertainty, SE of mu 2 points.
    sd0 = s * sqrt(T)
    sd1 = sqrt(s**2 * T + (0.02 * T) ** 2)
    r["Q2.sd1"] = sd1
    r["Q2.q0"] = exp(m * T - 1.645 * sd0)
    r["Q2.q1"] = exp(m * T - 1.645 * sd1)
    assert round(sd0, 2) == 0.99

    # Q3: turnover 60% a month, 0.3% per unit.
    r["Q3.cost"] = 0.6 * 12 * 0.3

    # Q4: SE of a Sharpe ratio about 1/sqrt(T).
    r["Q4.se_in"] = 1 / sqrt(10)
    r["Q4.se_out"] = 1 / sqrt(5)
    assert round(0.9 / sqrt(0.1 + 0.2), 2) == 1.64

    # Figure 1-1 numbers quoted in the checks and context.
    assert round(exp(mu * T), 2) == 8.17 and round(quantile(mu, s, T, 0), 2) == 5.02
    assert round(quantile(mu, s, T, -1.645), 2) == 0.99 and round(100 * phi(-m * T / (s * sqrt(T))), 1) == 5.1
    assert round(quantile(mu, 0.30, T, 0), 2) == 2.12
    assert round(100 * phi((log(exp(mu * T)) - m * T) / (s * sqrt(T)))) == 69
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
