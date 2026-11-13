"""Recompute every numeric answer in course/keys/4.12.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import erf, exp, sqrt


def phi(z):
    return 0.5 * (1 + erf(z / sqrt(2)))


def human(age):
    """Figure 3-1: present value at 2% real of a salary of 1 a year until 65."""
    return (1 - 1.02 ** -(65 - age)) / 0.02


def financial(age):
    """Figure 3-1: savings of 15% of salary at a 4% real return from age 25."""
    return 0.15 * (1.04 ** (age - 25) - 1) / 0.04


def share(age, w, theta):
    f, h = financial(age), human(age)
    if f <= 0:
        return 1.0
    return max(0.0, min(1.0, (w * (f + h) - theta * h) / f))


def results():
    r = {}
    # Q1: log excess return mean 3.38, sd 18.
    m, s = 3.38, 18
    r["Q1.p1"] = 100 * phi(-m / s)
    r["Q1.p35"] = 100 * phi(-m * sqrt(35) / s)
    r["Q1.w1"] = 100 * (1 - exp((m - 1.645 * s) / 100))
    r["Q1.w35"] = 100 * (1 - exp((m * 35 - 1.645 * s * sqrt(35)) / 100))
    assert abs(m - (5 - 18**2 / 200)) < 1e-9

    # Q2: target 40% of total wealth.
    r["Q2.s30"] = 100 * 0.4 * (60 + 1200) / 60
    r["Q2.s60"] = 100 * 0.4 * (900 + 150) / 900
    r["Q2.b60"] = 100 * (0.4 * (900 + 150) - 0.5 * 150) / 900
    assert 0.5 * 1200 > 0.4 * (60 + 1200)

    # Q3: withdraw 50 at the start of each year.
    def run(rets, wd):
        x = 1000.0
        for g in rets:
            x = (x - wd) * (1 + g)
        return x

    assert abs(run([-0.3, 0.2, 0.2], 0) - 1008) < 1e-9 and abs(run([0.2, 0.2, -0.3], 0) - 1008) < 1e-9
    r["Q3.a"] = run([-0.3, 0.2, 0.2], 50)
    r["Q3.b"] = run([0.2, 0.2, -0.3], 50)

    # Q4: risk premium 5%, sigma 18%, gamma 3, 10-year variance ratio 0.7.
    vol = 18 * sqrt(0.7)
    r["Q4.vol"] = vol
    r["Q4.w"] = 100 * 0.05 / (3 * (vol / 100) ** 2)
    r["Q4.w0"] = 100 * 0.05 / (3 * 0.18**2)

    # Figure 3-1 numbers quoted in check C3 and the context.
    assert round(100 * share(50, 0.4, 0)) == 100 and round(100 * share(55, 0.4, 0)) == 83
    assert round(100 * share(65, 0.4, 0)) == 40 and round(100 * share(50, 0.4, 0.3)) == 61
    assert round(100 * 0.05 / (4 * 0.0324)) == 39
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
