"""Recompute every numeric answer in course/keys/6.11.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def results():
    r = {}
    # Figure 1-1 values quoted in the key.
    assert [round(1000 / 1.03**t) for t in (10, 20, 30)] == [744, 554, 412]
    assert [round(1000 / 1.05**t) for t in (10, 20, 30)] == [614, 377, 231]

    # Q1: 2 million in 30 years at 3% inflation; real return from 7% nominal.
    r["Q1.pv"] = 2000 / 1.03**30
    r["Q1.real"] = 100 * (1.07 / 1.03 - 1)

    # Q2: ladders of 40 a year for 10 years.
    r["Q2.tips"] = 40 * (1 - 1.018**-10) / 0.018
    r["Q2.fixed"] = 40 * (1 - 1.042**-10) / 0.042
    r["Q2.nom3"] = sum(40 * 1.03**t / 1.042**t for t in range(1, 11))

    # Q3: I bond composite rate.
    f, i = 0.014, 0.0204
    r["Q3.comp"] = 100 * (f + 2 * i + f * i)

    # Q4: duration approximation for a 2 percentage point rise in rates.
    r["Q4.bl"] = -7 * 0.02 * 300
    r["Q4.ml"] = 8 * 0.02 * 400
    r["Q4.net"] = r["Q4.bl"] + r["Q4.ml"]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
