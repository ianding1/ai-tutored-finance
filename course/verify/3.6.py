"""Recompute every numeric answer in course/keys/3.6.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def real_value(nominal, real, pi, years=10):
    """Figure 4-1: real value after `years` of 100 in a nominal zero and in a TIPS zero (rates in %)."""
    return 100 * ((1 + nominal / 100) / (1 + pi / 100)) ** years, 100 * (1 + real / 100) ** years


def results():
    r = {}
    p = (0.98 * 100 + 0.02 * 40) / 1.04
    r["C1.p"] = p
    r["C1.y"] = 100 * (100 / p - 1)

    r["C3.t24"] = 3 / (1 - 0.24)
    r["C3.t37"] = 3 / (1 - 0.37)

    r["C4.be"] = 100 * (1.042 / 1.019 - 1)
    r["C4.nom"], r["C4.tips"] = real_value(4.2, 1.9, 4)

    r["Q1.er"] = 7.5 - 0.04 * (1 - 0.4) * 100

    r["Q2.cum"] = 100 * (1 - 0.98**5)

    r["Q3.tr"] = 4.2 * (1 - 0.37)
    r["Q3.co"] = 4.9 * (1 - 0.37 - 0.093)

    r["Q4.inc"] = 1000 * 1.03 * 0.015 + 30

    r["Q5.dp"] = -4.8 * 2
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
