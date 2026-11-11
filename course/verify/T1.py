"""Recompute every numeric answer in course/keys/T1.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def annuity_pv(c, r, n):
    return c / r * (1 - (1 + r) ** -n)


def results():
    r = {}
    # Q6: b' = (1 + r) / (1 + g) b + d with nominal r = 3%, nominal g = 1.02 * 1.02 - 1, d = 2%.
    g = 1.02 * 1.02 - 1
    assert g > 0.03  # the rate is below nominal growth, so the ratio converges
    b_star = 0.02 * (1 + g) / (g - 0.03)
    b = 1.0
    for _ in range(10000):
        b = 1.03 / (1 + g) * b + 0.02
    assert abs(b - b_star) < 1e-9
    r["Q6.limit"] = 100 * b_star

    # Q7: 50 of 30-year mortgages at 4%, revalued at 6%. A's liabilities pay 92% of each mortgage
    # payment; B's are 46 of demand deposits.
    c = 50 * 0.04 / (1 - 1.04**-30)
    pv = annuity_pv(c, 0.06, 30)
    r["Q7.pv"], r["Q7.ea"], r["Q7.eb"] = pv, pv - 0.92 * pv, pv - 46
    assert abs(0.92 * annuity_pv(c, 0.04, 30) - 46) < 1e-9  # A's liabilities are 46 at book value

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

    # Q11: 3% annual coupon, 10 payments left; the real rate is unchanged and expected inflation
    # rises from 2% to 4%, so the nominal rate goes from 3% to about 5% (approximate Fisher).
    r["Q11.price"] = annuity_pv(3, 0.05, 10) + 100 / 1.05**10
    i = 1.03 / 1.02 * 1.04 - 1  # exact Fisher, also accepted
    assert abs(annuity_pv(3, i, 10) + 100 / (1 + i) ** 10 - 84.42) < 0.005

    # Q12: Qd = 1200 - 20P, long-run supply flat at 30, tax 5; short-run prices given in the question.
    assert 1200 - 20 * 33.75 == 60 * 28.75 - 1200  # consistent with short-run supply Qs = 60P - 1200
    assert 1200 - 20 * 30 == 60 * 30 - 1200  # the starting point is the long-run equilibrium
    r["Q12.pl"] = 30 + 5
    r["Q12.ql"] = 1200 - 20 * r["Q12.pl"]
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
