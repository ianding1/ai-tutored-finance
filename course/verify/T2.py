"""Recompute every numeric answer in course/keys/T2.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def annuity(r, n):
    return (1 - (1 + r) ** -n) / r


def results():
    r = {}
    # Q5 (judge): equal yearly contributions, 7% except one -30% year.
    def fv(rets):
        w = 0.0
        for g in rets:
            w = (w + 1) * (1 + g)
        return w

    early, late = fv([-0.3] + [0.07] * 19), fv([0.07] * 19 + [-0.3])
    assert early > late and round(early, 1) == 42.5 and round(late, 1) == 28.7

    # Q7: 20% chance of 1,000 in 5 years; beta 0.4, rf 4%, MRP 5%; cost 50.
    rate = 0.04 + 0.4 * 0.05
    pv = 0.2 * 1000 / (1 + rate) ** 5
    r["Q7.pv"] = pv
    r["Q7.npv"] = pv - 50
    r["Q7.wrong"] = 0.2 * 1000 / 1.4**5 - 50
    assert r["Q7.npv"] > 0 > r["Q7.wrong"]

    # Q8: bond fund 4.5% taxed at 24%; mortgage 6.5%, not deductible.
    r["Q8.atb"] = 4.5 * (1 - 0.24)
    r["Q8.gap"] = 6.5 - r["Q8.atb"]

    # Q9: building blocks 1.5 + 0.5 + 1.8 + 2.4 = 6.2; T-bills 4.2; gamma 3, sigma 18%.
    nominal = 1.5 + 0.5 + 1.8 + 2.4
    erp = nominal - 4.2
    r["Q9.erp"] = erp
    r["Q9.w"] = 100 * (erp / 100) / (3 * 0.18**2)
    r["Q9.wh"] = 100 * 0.066 / (3 * 0.18**2)
    assert round(nominal, 1) == 6.2

    # Q10: operating 500 book / 80 profit, cash 200 / 8; market values 800 (beta 1.25) and 200.
    r["Q10.roe"] = 100 * (80 + 8) / (500 + 200)
    r["Q10.be"] = 800 / 1000 * 1.25 + 200 / 1000 * 0
    r["Q10.be2"] = 1.25
    assert abs(4 + r["Q10.be"] * 5 - 9) < 1e-9 and abs(4 + 1.25 * 5 - 10.25) < 1e-9

    # Q11: 800 thousand, 25 years, TIPS 1.8% real; adviser 3.5%.
    r["Q11.inc"] = 800 / annuity(0.018, 25)
    r["Q11.w"] = 800 / annuity(0.035, 25)

    # Q12: D1 = 5, r = 8%, price 100; analyst g = 4.5%.
    r["Q12.g"] = 100 * (0.08 - 5 / 100)
    r["Q12.v"] = 5 / (0.08 - 0.045)
    assert round(5 / (0.09 - 0.045)) == 111 and round(5 / (0.07 - 0.045)) == 200
    return r


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
