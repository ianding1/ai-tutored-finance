"""Recompute every numeric answer in course/keys/2.4.yaml.

results() returns {"<question id>.<name>": value}. CI compares each value with the
`expected` string in the key file, rounded to the number of decimals written there.
"""


def adas(d, s):
    """Figure 3-1: AD Y = 100 + D - 0.5 (P - 100); SRAS P = 100 + S + (Y - 100)."""
    gap = (d - 0.5 * s) / 1.5
    y, p = 100 + gap, 100 + s + gap
    assert abs(y - (100 + d - 0.5 * (p - 100))) < 1e-9
    return y, p


def is_curve(r, g=400, t=400):
    # Y = 200 + 0.75 (Y - T) + 500 - 20 r + G
    return (200 - 0.75 * t + 500 - 20 * r + g) / 0.25


def results():
    res = {}
    res["C1.y1"], res["C1.y2"] = is_curve(5), is_curve(6)

    res["C2.y1"], res["C2.p1"] = adas(-6, 0)
    res["C2.y2"], res["C2.p2"] = adas(0, 6)

    pe, pis = 2.0, []
    for _ in range(3):
        pi = pe - 0.5 * (3.5 - 4.5)
        pis.append(pi)
        pe = pi
    res["C3.pi1"], res["C3.pi2"], res["C3.pi3"] = pis

    res["Q1.dy"] = is_curve(5, g=500) - is_curve(5)
    res["Q1.k"] = res["Q1.dy"] / 100
    assert is_curve(6, g=500) - is_curve(5) == 320

    res["Q2.y"], res["Q2.p"] = adas(-4, 0)
    res["Q2.s"] = 2 * -4
    y, res["Q2.p2"] = adas(-4, res["Q2.s"])
    assert abs(y - 100) < 1e-9

    res["Q3.gap"] = -2 * (6 - 4.5)
    res["Q3.loss"] = 30 * 0.03

    res["Q4.u"] = 4.5 + 2 / 0.5
    res["Q4.pts"] = 2 * (res["Q4.u"] - 4.5)
    res["Q4.gdp"] = 2 * res["Q4.pts"]

    res["Q5.d"] = 0.5 * 6
    y, res["Q5.p"] = adas(res["Q5.d"], 6)
    assert abs(y - 100) < 1e-9
    res["Q5.y"] = 100 - 6
    res["Q5.d2"] = 1.5 * (res["Q5.y"] - 100) + 0.5 * 6
    y, p = adas(res["Q5.d2"], 6)
    assert abs(p - 100) < 1e-9 and abs(y - res["Q5.y"]) < 1e-9
    return res


if __name__ == "__main__":
    for k, v in results().items():
        print(k, round(v, 4))
