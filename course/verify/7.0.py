"""Consistency checks for the household file of the capstone project (course/project/household-a.yaml).

7.0 has no numeric answers; results() is empty, and the asserts check that the totals and the
figures quoted in the file agree with each other.
"""

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]


def rows(data, section):
    sec = next(s for s in data["sections"] if s["id"] == section)
    out = {}
    for r in sec["rows"]:
        label = r[0]["en"] if isinstance(r[0], dict) else r[0]
        out[label.strip("*")] = r[1]
    return out


def results():
    data = yaml.safe_load((ROOT / "course/project/household-a.yaml").read_text(encoding="utf-8"))
    cf = rows(data, "cash-flow")
    spending = ["Mortgage payments (principal and interest)", "Property tax and home insurance", "Childcare",
                "Car loan payments", "Lisa, whole life premium", "Other living costs (food, transport, health, travel and so on)"]
    total = sum(cf[k] for k in spending)
    assert total == cf["Total spending"] == 13000 * 12
    # Mark's "about 8,000 a month" excludes the mortgage and childcare.
    assert round((total - cf[spending[0]] - cf["Childcare"]) / 12, -2) == 8100
    cash_income = cf["Mark, base salary"] + cf["Mark, bonus"] + cf["Lisa, salary"]
    cash_tax = cf["Federal income tax, Social Security and Medicare taxes"] - 19800
    assert round(0.22 * cf["Mark, RSUs vested"]) == 19800
    deducted = cf["Mark, 401(k) (pre-tax)"] + cf["Lisa, 403(b) (pre-tax)"] + cf["Lisa, pension contribution (pre-tax, required)"] + cf["Mark, ESPP"]
    assert cash_income - cash_tax - deducted - total == cf["Cash added to checking and savings over the year"]
    assert cf["Mark, 401(k) (pre-tax)"] == 0.06 * cf["Mark, base salary"]
    assert cf["Mark, ESPP"] == 0.10 * cf["Mark, base salary"]
    assert cf["Lisa, pension contribution (pre-tax, required)"] == 0.09 * cf["Lisa, salary"]
    assert round(cf["Mark, ESPP"] / 0.85, -2) == 25300

    # Mortgage: 650,000 over 30 years at 2.875%, refinanced 5 years ago.
    r = 0.02875 / 12
    pmt = 650000 * r / (1 - (1 + r) ** -360)
    assert round(pmt) == 2697 and round(pmt) * 12 == cf[spending[0]]
    bal = 650000
    for _ in range(60):
        bal = bal * (1 + r) - pmt
    bs = rows(data, "balance-sheet")
    assert abs(bal - bs["Mortgage"]) < 100
    rc = 0.074 / 12
    car = 26000 * rc / (1 - (1 + rc) ** -36)
    assert round(car) == 808 and round(car) * 12 == cf["Car loan payments"]

    assets = [k for k in bs if k not in ("Assets", "Total assets", "Liabilities", "Mortgage", "Car loan", "Total liabilities", "Net worth")]
    assert sum(bs[k] for k in assets) == bs["Total assets"]
    assert bs["Mortgage"] + bs["Car loan"] == bs["Total liabilities"]
    assert bs["Total assets"] - bs["Total liabilities"] == bs["Net worth"]
    ra = rows(data, "retirement-accounts")
    assert ra["Mark, 401(k): S&P 500 index fund"] + ra["Mark, 401(k): large-cap growth fund"] == bs["Mark, 401(k)"]
    return {}


if __name__ == "__main__":
    print(results() or "ok")
