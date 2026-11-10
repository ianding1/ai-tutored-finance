"""Recompute every numeric answer in course/keys/2.7.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""
from math import sqrt


def results():
    r = {}
    r["C1.ca"], r["C1.ca2"] = 18 - 21.6, 20 - 21.6

    r["C2.e10"] = 1.10 * (1.03 / 1.02) ** 10

    r["C3.f"] = 1.10 * 1.04 / 1.02
    r["C3.up"] = 100 * (1.02 * 1.03 - 1)
    r["C3.down"] = 100 * (1.02 * 0.97 - 1)
    r["C3.be"] = 100 * (1.04 / 1.02 - 1)

    r["C4.r"] = 100 * (1.10 * 0.92 - 1)
    r["C4.naive"] = 10 - 8

    r["Q1.ca1"], r["Q1.ca2"] = 20 - 23, 20 - 25

    r["Q2.de"] = 100 * (1.10 * 1.01 / 1.06 - 1)

    r["Q3.be"] = 100 * (1 - 1.005 / 1.04)
    r["Q3.loss"] = 100 * 1.04 * 0.9 - 100 * 1.005

    r["Q4.dep"] = 100 * (1.20 / 1.03 - 1)

    r["Q5.sd0"] = sqrt(16**2 + 8**2)
    r["Q5.sdneg"] = sqrt(16**2 + 8**2 + 2 * -0.3 * 16 * 8)
    r["Q5.sdb"] = sqrt(3**2 + 8**2)
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
