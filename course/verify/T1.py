"""Recompute every numeric answer in course/keys/T1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def annuity_pv(c, r, n):
    return c / r * (1 - (1 + r) ** -n)


def results():
    r = {}
    # Q1: 2% nominal for 10 years with 3% inflation, 100,000 invested.
    real = 100000 * (1.02 / 1.03) ** 10
    r["Q1.real"] = real
    r["Q1.loss"] = 100 * (1 - real / 100000)

    # Q6: b' = (1 + r) / (1 + g) b + d with nominal r = 3%, nominal g = 1.02 * 1.02 - 1, d = 2%.
    g = 1.02 * 1.02 - 1
    assert g > 0.03  # the rate is below nominal growth, so the ratio converges
    b_star = 0.02 * (1 + g) / (g - 0.03)
    b = 1.0
    for _ in range(10000):
        b = 1.03 / (1 + g) * b + 0.02
    assert abs(b - b_star) < 1e-9
    r["Q6.limit"] = 100 * b_star

    # Q7: 100 of 30-year mortgages at 3%, revalued at 5%; deposits 92.
    c = 100 * 0.03 / (1 - 1.03**-30)
    pv = annuity_pv(c, 0.05, 30)
    r["Q7.pv"], r["Q7.eq"] = pv, pv - 92

    # Q8: good assets 200, bad 40; project costs 20 and adds 25; half of each type.
    good, bad = 200 + 25, 40 + 25
    avg = (good + bad) / 2
    share = 20 / avg
    keep = good * (1 - share)
    assert keep < 200  # the good company does not issue shares
    r["Q8.avg"], r["Q8.share"], r["Q8.keep"] = avg, 100 * share, keep
    r["Q8.debt"] = good - 20
    assert r["Q8.debt"] > 200

    # Q9: a transfer is spent only in part in the first round: multiplier b / (1 - b).
    r["Q9.k"] = 0.9 / (1 - 0.9)

    # Q10: expected 7% minus 1% fee, sd 15%, gamma 3; certain alternative 4%.
    premium = 0.5 * 3 * 0.15**2
    ce = 0.07 - 0.01 - premium
    assert ce < 0.04 and 0.07 - premium < 0.04
    r["Q10.premium"], r["Q10.ce"] = 100 * premium, 100 * ce
    r["Q10.fee"] = 0.01 * 200000

    # Q11: 3% annual coupon, 10 years left, yield rises from 3% to 5%.
    r["Q11.price"] = annuity_pv(3, 0.05, 10) + 100 / 1.05**10

    # Q12: Qd = 1000 - 10P, short-run Qs = 40P - 1000, long-run supply flat at 40, tax 6.
    pb = (1000 + 1000 + 40 * 6) / 50
    assert (pb, pb - 6) == (44.8, 38.8)  # the short-run prices given in the question
    assert 1000 - 10 * 40 == 40 * 40 - 1000  # the starting point is the long-run equilibrium
    r["Q12.pl"] = 40 + 6
    r["Q12.ql"] = 1000 - 10 * r["Q12.pl"]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
