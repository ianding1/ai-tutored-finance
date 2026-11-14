"""Recompute every numeric answer in course/keys/6.9.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def wealth_path(k):
    """Figure 3-1: withdraw 40 at the start of each year, then earn 5%, or -30% in year k."""
    w, out = 1000.0, [1000.0]
    for t in range(1, 31):
        w = max(w - 40, 0) * (0.7 if t == k else 1.05)
        out.append(w)
    return out


def results():
    r = {}
    ends = {k: round(wealth_path(k)[-1]) for k in (1, 5, 10, 20, 30)}
    assert ends == {1: 148, 5: 353, 10: 558, 20: 845, 30: 1021}
    assert round(1000 * 1.05**29 * 0.7) == 2881

    # Q1: gap 55 at 3.5% and 4%.
    r["Q1.need"] = 55 / 0.035
    r["Q1.need4"] = 55 / 0.04

    # Q2: order of returns with withdrawals of 50.
    def run(rets):
        w = 1000.0
        for x in rets:
            w = (w - 50) * (1 + x)
        return w

    r["Q2.a"] = run([-0.2, 0.1, 0.3])
    r["Q2.b"] = run([0.3, 0.1, -0.2])

    # Q3: undiscounted break-even age, and the discounted one (about 83) quoted in the answer.
    r["Q3.be"] = 62 + 3720 * 8 / (3720 - 2100)

    def pv_gap(age):
        return sum(12 * 2100 / 1.02 ** (t - 62) - (12 * 3720 / 1.02 ** (t - 62) if t >= 70 else 0) for t in range(62, age))

    assert pv_gap(82) > 0 > pv_gap(83)

    # Q4: annuity versus withdrawals.
    r["Q4.pay"] = 500 * 0.07
    r["Q4.real"] = 500 * 0.07 / 1.03**20
    r["Q4.sw"] = 500 * 0.04
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
