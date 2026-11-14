# T2 Comprehensive Quiz 2: Financial Markets, Valuation and Investment Theory: Key file (for the AI tutor only)

Do not reveal anything here before the learner has answered.

## Lesson facts relevant to the questions

- Comprehensive quiz T2 covers Lesson 3.1, "Overview of the Financial System" https://ianding1.github.io/ai-tutored-finance/en/lessons/3-1-financial-system/ to Lesson 4.13, "Simulation and Backtesting Methods" https://ianding1.github.io/ai-tutored-finance/en/lessons/4-13-simulation-backtesting/: financial markets and security valuation, and investment theory and portfolio modeling; tools from Stages 0–2 may also be used. Most questions combine material from different stages; each stem is a situation that does not say which concept to use. What matters is whether the learner recognizes the concepts that apply, builds a simple model and draws the conclusion; there is little calculation. The learner may use a calculator or code, and the quiz starts with a formula sheet: present value, annuities, growing perpetuities, the Fisher equation; bond prices, modified duration and convexity; the Gordon model, the P/E ratio $\frac{1-b}{r-g}$, WACC; the CAPM, beta, the variance of a two-asset portfolio, the Sharpe ratio, the optimal risky share $\frac{\mu - r_f}{\gamma\sigma^2}$, compound growth $\approx \mu - \frac{\sigma^2}{2}$, the building blocks $E[R] \approx y + g + \pi + \Delta v$, the standard error $\frac{\sigma}{\sqrt{n}}$, and the t-value of alpha $\approx IR\sqrt{T}$. Some of these formulas are used by no question. When grading, reasoning and reasons count more than arithmetic.

## Q1

The market widely expects the Fed to cut rates by 1 percentage point next year. An investor says: "Long-term Treasury prices rise when rates are cut, so if I buy long-term Treasuries now, then as long as the cut happens as expected, my one-year return will be higher than holding short-term Treasuries because of the cut."

**Reference answer**

False. A cut that everyone expects is already reflected in today's yield curve: long-term yields are already priced on the expected rate path (the curve may be flat or inverted), and forward rates embody the expected cut. When the cut happens as expected, long-term rates do not fall further because of it, and long-term Treasury prices do not rise further because of it; by the expectations hypothesis, the one-year holding return equals that of short-term Treasuries. If long-term Treasuries earn somewhat more, that is the term premium, which has nothing to do with "expecting a cut". Long-term Treasuries gain extra only if the cut exceeds expectations, and lose if it falls short.

**Grading points**

- OK: false, explaining that the expected cut is already in current long-term yields (or forward rates), that a cut as expected brings no extra price gain, and that only the unexpected part affects returns (noting that any term premium has nothing to do with the cut is a plus). Saying only "rates are hard to predict", or only "false", needs revision.

**Common errors**

- Thinking an expected rate cut can still earn an excess return, ignoring that the yield curve already reflects the rate path the market expects; only cuts larger than expected bring extra price gains.

## Q2

A company announces a 2-for-1 stock split. The split changes none of the company's cash flows, yet on the announcement day the stock's abnormal return (adjusted for beta) is 3%, and it does not fall back afterwards. This is not inconsistent with a semi-strong-form efficient market.

**Reference answer**

True. The split itself does not change value, but the decision to announce it can convey information: managers usually split when they are confident about future earnings and expect the share price to stay high, which outside investors did not know (a signal). In an efficient market the price reacts at once to this new information on the announcement and then stops moving, which is the pattern here. It would contradict semi-strong efficiency only if the price kept rising or fell back predictably afterwards. (Early event studies used stock splits, with results consistent with this.)

**Grading points**

- OK: true, explaining that announcing a split can convey information about prospects, and that a one-time adjustment with no further drift fits an efficient market. Judging false because "cash flows did not change, so the price should not" needs revision.

**Common errors**

- Thinking that a price move on an announcement that does not change cash flows proves inefficiency, ignoring that the announcement itself may convey information about the future (a signal).

## Q3

A retiree switches all his bonds into a Treasury inflation-protected securities (TIPS) fund with an average duration of 8 years, saying: "Now my bonds can't lose money however interest rates move, because they adjust for inflation."

**Reference answer**

False. A TIPS principal adjusts with the CPI, removing inflation uncertainty, but its price depends on the real yield. When real rates rise, TIPS prices fall too, by about the duration times the change in the real yield: a 1-point rise in real yields cuts a fund with an 8-year duration by about 8% (TIPS funds lost noticeably in 2022, when real rates rose sharply). Only by holding to maturity, or for a horizon matching the duration, does he lock in a roughly certain real return.

**Grading points**

- OK: false, explaining that TIPS remove inflation risk but still fall by about the duration when real rates rise (an estimate of about 8% is fine). Saying only "all bonds are risky" without separating inflation risk from real-rate risk needs revision.

**Common errors**

- Thinking inflation-protected bonds are immune to all interest-rate changes; they remove only inflation uncertainty, and their prices still move with duration when real rates change.

## Q4

Two stock funds have the same beta and the same arithmetic average annual return; A holds only 15 stocks and has more firm-specific risk, while B is well diversified. Over the long run, A's compound growth rate (that is, the growth of median wealth) is lower than B's.

**Reference answer**

True. Long-run compound growth is about $\mu - \frac{\sigma^2}{2}$, and $\sigma^2 = \beta^2\sigma_M^2 + \sigma^2(e)$. With the same $\mu$ and beta, A has larger firm-specific variance, larger total variance, more volatility drag and lower compound growth. Firm-specific risk is not rewarded (the arithmetic average is no higher), yet it drags down long-run wealth all the same, so lack of diversification has a long-run cost even with the same average return. (Mean wealth grows at the arithmetic average and is the same for both; what differs is the typical outcome.)

**Grading points**

- OK: true, explaining with compound growth $\approx \mu - \frac{\sigma^2}{2}$ and total variance including firm-specific variance. Holding that the same beta and average return give the same result needs revision.

**Common errors**

- Thinking that unrewarded firm-specific risk merely "adds nothing" and does no harm to long-run wealth; ignoring that all volatility drags down compound growth.

## Q5

A young person puts the same amount into a retirement account at the start of each year for 20 years. In one of the 20 years the account falls 30%, the worst year, and the other years' returns are fixed. Compare two cases: the crash comes in year 1, or in year 20 (only the returns of these two years are swapped; the other years are unchanged). With the crash in year 1, his wealth at the end of year 20 is higher.

**Reference answer**

True. With ongoing contributions, in year 1 the account holds only the first contribution, so the crash hits just that, and later contributions buy at low prices; in year 20 the account holds 20 contributions and their gains, and the crash hits everything accumulated. For example, with 7% in every other year and 1 dollar a year, the account ends at about 42.5 dollars if the crash is in year 1 and about 28.7 if it is in year 20. This is the opposite of withdrawals in retirement, where an early crash is worse. The effect of the order of returns depends on whether money is flowing in or out, and on how large the account is when the crash comes.

**Grading points**

- OK: true, explaining that the account's size differs when the crash comes (only one contribution in year 1), and noting that this is the opposite of the withdrawal phase. Judging false by carrying over the withdrawal result needs revision.

**Common errors**

- Carrying sequence-of-returns risk from the withdrawal phase mechanically into the saving phase and thinking an early crash is always worse; not seeing that with regular contributions an early crash hits while little has been invested, and later contributions buy at low prices.

## Q6

A company has paid out half its profits as dividends each year. It announces that from now on it will use the same amount of cash to buy back shares at the market price and pay no dividends. An analyst says: "Buybacks also return cash to shareholders, so I put the buyback amount per share into the Gordon model as the 'dividend'; and since fewer shares make earnings per share grow faster, I also raise the growth rate to the post-buyback growth of earnings per share. The value comes out higher than before, which shows that switching to buybacks creates value for shareholders." (Ignore taxes and signals.)

**Reference answer**

False. The analyst counts the buyback twice. One can value the total cash paid to shareholders: the total payout equals the old total dividends and grows at the same rate, so the value is unchanged; or one can value per share: the remaining shareholders receive no dividends, but the shrinking share count makes per-share value grow faster. Treating the buyback amount per share as a dividend already counts the cash that selling shareholders receive; raising the growth rate to the per-share growth counts the benefit of fewer shares a second time. Buying back at the market price only hands cash to some shareholders; neither the company's cash flows nor shareholders' total return changes (in the building blocks, the dividend yield falls by as much as per-share growth rises). So, ignoring taxes and signals, switching to buybacks creates no value.

**Grading points**

- OK: false, pointing out the double counting (treating buybacks as payouts and also using the post-buyback per-share growth rate), and explaining that buying back at the market price changes neither the company's cash flows nor shareholders' total return. Saying only "buybacks create no value" without identifying the analyst's mistake needs revision.

**Common errors**

- Treating buybacks as payouts while also using the faster post-buyback per-share growth, counting the buyback twice; or thinking a stock that stops paying dividends must lose value under the dividend discount model.

## Q7

A large drug company is considering paying 50 million dollars today for a small biotech company. The biotech has a single drug in development: in 5 years there is a 20% chance its clinical trial succeeds, in which case the rights to the drug are expected to sell for 1 billion dollars (the actual price will vary with the valuation of drug stocks at the time); otherwise it is worth nothing. Similar biotech assets have a beta of about 0.4. The risk-free rate is 4% and the market risk premium 5%.
(a) What is the NPV of the acquisition (in millions of dollars)?
(b) A board member says: "With only a 20% chance of success, the risk is huge, so we should use a 40% discount rate." He applies 40% to the expected cash flow of (a). By his method, what is the NPV? Evaluate his statement.

**Reference answer**

(a) The expected cash flow is $20\% \times 1{,}000 = 200$ million dollars. By the CAPM, the discount rate is $4\% + 0.4 \times 5\% = 6\%$. The present value is $\frac{200}{1.06^5} \approx 149.45$, and NPV $\approx 149.45 - 50 = 99.45$ million dollars, so it should buy.
(b) At 40%: $\frac{200}{1.4^5} - 50 \approx -12.81$ million dollars, which would turn down a project with an NPV of about 100 million. His mistake is basing the discount rate on total risk: whether the trial succeeds depends on the drug, not on the market (the part of the sale price that moves with the market is the systematic risk, already reflected in the beta of 0.4), and for a large company holding many drugs in development (and its diversified shareholders) it diversifies away; the chance of failure is already in the expected cash flow (times 20%), and raising the discount rate counts it twice. The discount rate should reflect only systematic risk. (Some investors combine the 1-billion success value with a very high discount rate; the numbers sometimes come out close, but only because two errors offset.)

**Grading points**

- (a) OK: uses the expected cash flow of 200 and the CAPM rate of 6%, a present value of about 149.45 and an NPV of about 99.45 million dollars. Discounting the success value of 1,000, or using a very high rate, needs revision.
- (b) OK: an NPV of about −12.81, explaining that trial success is diversifiable firm-specific risk, that failure is already in the expected cash flow, that a high rate counts it twice, and that the rate should reflect only systematic risk. Saying only "40% is too high" without the reason needs revision. (Noting that risk means something different for an undiversified founder is a welcome extra.)

Numeric answers: pv = 149.45, npv = 99.45, wrong = -12.81

**Common errors**

- Using a very high discount rate because the project is likely to fail and its total risk is large; confusing total risk with systematic risk, or using the cash flow in case of success instead of the expected cash flow.

## Q8

A household has a 300,000-dollar fixed-rate mortgage at 6.5% with 25 years left; they take the standard deduction, so mortgage interest is not tax-deductible. Besides an emergency fund of six months set aside separately, they hold 100,000 dollars in an investment-grade bond fund in a taxable account, with a yield to maturity of 4.5%, its interest taxed at a 24% marginal rate; they also hold stocks in retirement accounts. They are considering using the 100,000 dollars to prepay the mortgage. Their financial adviser says: "Don't prepay. The bond fund diversifies your stock risk; putting the money into the house is not diversified." Evaluate the adviser's statement.

**Reference answer**

The statement is wrong. A mortgage is a negative bond: the household pays a fixed 6.5% each year. Prepaying 100,000 dollars saves a certain 6.5% in interest every year from then on, which is like buying a bond yielding 6.5% with no default risk and no interest-rate risk, and the saving is not taxed. The bond fund's after-tax yield is only $4.5\% \times (1 - 24\%) \approx 3.42\%$, and its price moves with interest rates. Holding both the bond fund and the mortgage amounts to borrowing at 6.5% to buy bonds yielding 3.42%, losing about 3.08 percentage points a year with nothing to compensate for it. Prepaying is not "putting money into the house": the household bears the house-price risk whether or not it prepays; prepaying only reduces debt (lowers leverage), so the household's total risk actually falls. The mix of stocks and a "riskless asset" remains; the riskless part is now the reduced mortgage. What does need considering is liquidity: money put into the house is hard to take out again, so the emergency fund must come first (here it is set aside separately); also, a fixed-rate mortgage helps the borrower if inflation rises unexpectedly, which prepaying gives up, but that has nothing to do with "diversification".

**Grading points**

- OK: recognizes that prepaying earns a riskless, untaxed 6.5%, compares it with the bond fund's after-tax 3.42% (a gap of about 3.08 percentage points), explains that prepaying lowers leverage rather than reducing diversification, and mentions conditions such as liquidity (the emergency fund). Agreeing with the adviser, or comparing only 6.5% with 4.5% while ignoring taxes and what the risk means, needs revision.

Numeric answers: atb = 3.42, gap = 3.08

**Common errors**

- Seeing mortgage prepayment as "investing less" or "less diversification", not recognizing that prepaying is like buying a riskless bond that yields the mortgage rate; ignoring after-tax returns in the comparison.

## Q9

An automated advisory platform sets clients' stock shares by $w^* = \frac{\mu - r_f}{\gamma\sigma^2}$. Using a historical sample of its own choosing, in which US stocks had an arithmetic average excess return over short-term Treasuries of 6.6% and a volatility of 18%, it recommends about 68% in stocks for a client with $\gamma = 3$. Today's market data: the 10-year Treasury yields 4.4% and short-term Treasuries 4.2%; the S&P 500's CAPE is about 35, and stocks have returned about 13% a year over the past 10 years; the dividend yield is 1.5% and the net buyback yield 0.5%; expected inflation is about 2.4%; long-run real growth of earnings per share is widely expected to be about 1.8%.
Evaluate the platform's approach, and give the range of stock shares you consider more reasonable, with reasons.

**Reference answer**

The 6.6% in the platform's sample includes past valuation gains and lower interest rates at the time, and need not represent today's expectation. By the building blocks (assuming unchanged valuation), the nominal expected stock return is about $1.5 + 0.5 + 1.8 + 2.4 = 6.2\%$; minus the 4.2% on short-term Treasuries, the forward-looking premium is only about 2 percentage points. In the formula: $w^* = \frac{0.02}{3 \times 0.18^2} \approx 20.6\%$, against $\frac{0.066}{3 \times 0.0324} \approx 67.9\%$ with the historical premium. (The building blocks give roughly a compound return; adding about $\frac{\sigma^2}{2} \approx 1.6$ points to convert to an arithmetic average gives a premium of about 3.6% and a share of about 37%. A CAPE of about 35 signals high valuations; if valuations fall, the forward premium is lower still; the 13% of the past 10 years is partly the valuation rise that cannot be extrapolated.) Moving the premium from 2% to 6.6% moves the optimal share from about 21% to about 68%: the share is proportional to the premium and extremely sensitive to this hardest-to-estimate input. Neither premium is precise: the historical average has a standard error of about 2 points, and the forward estimate depends on assumptions about growth and valuation. The sensible approach is not to apply any single point estimate mechanically but to use a range (for example a premium of 2% to 5%, giving about 20% to 50%), compare with institutions' long-run forecasts, and consider the client's other circumstances (human capital, horizon, income needs); nor should the allocation swing with each year's estimate. The platform's problem is not the formula but treating a very uncertain, possibly outdated historical average as a certain input.

**Grading points**

- OK: estimates a forward premium of about 2% from current shareholder yield, growth and inflation (giving about 20.6%; converting to an arithmetic average for about 3.6% and about 37% is also correct; using the CAPE of about 35 to infer that valuations may fall and choosing a lower share, such as about 15%, is also correct), compares with about 67.9% from the historical premium, points out that the optimal share is extremely sensitive to the premium and that both estimates are very uncertain, and gives a reasoned range or robust approach. Accepting 68% directly, using the past 10 years' 13% as the expectation, or simply switching to a new point estimate without discussing uncertainty, needs revision.

Numeric answers: erp = 2, w = 20.6, wh = 67.9

**Common errors**

- Setting the allocation from the historical average equity premium, not knowing how sensitive the optimal stock share is to the assumed premium, and not estimating a forward-looking premium from current yields and growth.

## Q10

A company with no debt has 500 of book capital in its operating business, earning 80 a year after tax; it also holds 200 in cash earning 8 a year in interest (ignore taxes for simplicity). At market value, the operating business is worth 800 with a beta of 1.25, and the cash is worth 200. The risk-free rate is 4% and the market risk premium 5%. An activist investor says: "The 200 of idle cash drags ROE down from the operating business's 16%, destroying shareholder value. The company should pay it all out as a special dividend; ROE would return to 16%, and with an unchanged P/E the share price would rise."
Evaluate this statement. Under what circumstances might paying out the cash really raise shareholder value?

**Reference answer**

Today's ROE is $\frac{80 + 8}{500 + 200} \approx 12.57\%$, and 16% after the payout. But a lower ROE does not mean value is destroyed: cash earns little because it carries no risk. At market value, the equity beta is $\frac{800}{1{,}000} \times 1.25 + \frac{200}{1{,}000} \times 0 = 1$, giving a cost of equity of $4\% + 1 \times 5\% = 9\%$; after the payout the equity is all operating business, with a beta of 1.25 and a cost of equity of $4\% + 1.25 \times 5\% = 10.25\%$. ROE rises, but so do risk and the required return. Shareholders already own the 200 of cash: after the payout the share price falls by 200 in total (by the dividend per share), shareholders hold 200 more in cash, and their total wealth is unchanged; the assumption of an "unchanged P/E" also fails, because the equity is riskier and its P/E should fall. This is the Modigliani–Miller idea: rearranging assets does not create value.
Paying out can really raise value when: (1) managers might waste the cash on negative-NPV acquisitions or projects (the principal–agent problem), so the market discounts the cash, and the discount disappears after the payout; (2) interest on cash held by the company bears corporate income tax, and shareholders holding it themselves may pay less tax; (3) announcing the payout signals management's confidence in future cash flows. These, not the change in ROE, are the reasons to support a payout.

**Grading points**

- OK: finds an ROE of about 12.57%, uses market-value weights to show the equity beta rising from about 1 to 1.25 and the cost of equity rising with it, explains that the payout itself does not change shareholders' total wealth and that the P/E would not stay the same; and gives at least one case where paying out could really add value (agency problems, taxes, signals). Agreeing with the activist, or saying only "ROE is a poor measure" without explaining the change in risk, needs revision.

Numeric answers: roe = 12.57, be = 1, be2 = 1.25

**Common errors**

- Thinking a lower ROE means value is destroyed; ignoring that cash is low-risk and lowers the equity beta and the required return at the same time, so paying out cash does not by itself create value.

## Q11

A 65-year-old retiree has 800,000 dollars in a retirement account (ignore taxes) and wants the same income, in today's purchasing power, at the end of each year for the next 25 years. Treasury inflation-protected securities (TIPS) of all maturities have a real yield of 1.8%. His financial adviser says: "A 60/40 stock–bond portfolio has an expected real return of about 3.5%; at that rate you can withdraw about 48,500 dollars a year, much more than with bonds."
(a) If he buys a set of TIPS maturing year by year (a ladder), how much real income can he receive for certain each year (in thousands of dollars)?
(b) Evaluate the adviser's statement. How would you advise him to arrange the 800,000 dollars?

**Reference answer**

(a) The yearly income $C$ satisfies $800 = C \times \frac{1 - 1.018^{-25}}{0.018}$, so $C \approx 40.02$ thousand dollars: each year's maturing TIPS principal plus interest pays exactly that year's real income, with no interest-rate or inflation risk (the duration of each piece matches each payment).
(b) The adviser's number is a 3.5% annuity: $\frac{800}{(1 - 1.035^{-25}) / 0.035} \approx 48.54$ thousand dollars, based on the expected return; it lasts 25 years only if the portfolio earns exactly 3.5% real every year. Actual returns vary: judged by the median rather than the mean, long-run compound returns fall short of 3.5% (volatility drag); and a crash early in retirement, with ongoing withdrawals, can empty the account early (sequence-of-returns risk). So the "much more", 8,500 dollars a year, is bought with the risk of running out of money; it is not free. The TIPS ladder's 40,000 dollars is certain. Sensible advice: first cover essential spending with a TIPS ladder (or annuities, Social Security and so on) to form a riskless floor, then invest the rest in risky assets for spending that can be adjusted; or, if he holds 60/40 entirely, be ready to withdraw less after market falls. He should also consider living past 90 (a lifetime annuity can hedge longevity risk).

**Grading points**

- (a) OK: about 40.02 thousand dollars a year from the TIPS ladder.
- (b) OK: recognizes that the adviser's about 48.54 is an annuity at the expected 3.5%, says an expectation is not a guarantee, that volatility and sequence risk can exhaust the money early, so the extra withdrawal is bought with risk; and gives advice built on a floor (matching essential spending with riskless assets) or explains the need for flexible withdrawals. Saying only "stocks are risky" without what it means for this plan needs revision.

Numeric answers: inc = 40.02, w = 48.54

**Common errors**

- Computing how much can be withdrawn from the expected return of risky assets, treating an expectation as a guarantee; not knowing that maturity-matched inflation-protected bonds can lock in a riskless real income.

## Q12

A mature company's stock trades at 100 dollars. An analyst expects free cash flow per share next year (all paid out to shareholders) of 5 dollars, growing 4.5% a year forever after, with a cost of equity of 8%. She writes: "My model gives an intrinsic value of about 143 dollars, 43% above the price. That is a 43% alpha, so we should buy heavily."
Evaluate her conclusion.

**Reference answer**

Her value is $\frac{5}{0.08 - 0.045} \approx 142.86$ dollars, and the arithmetic is fine, but the conclusion is not reliable. First, ask what the price implies: $100 = \frac{5}{0.08 - g}$ gives $g = 3\%$. Her disagreement with the market is only perpetual growth of 3% versus 4.5%, and 4.5% nominal growth forever is not conservative for a mature company (close to the whole economy's nominal growth). Second, the perpetual-growth model is extremely sensitive to $r - g$: a cost of equity of 9% instead of 8% gives $\frac{5}{0.045} \approx 111$; 7% gives 200. So wide a range means the 43% gap is well within estimation error. Third, "a 43% alpha" mixes up concepts: even if she is right, it is a one-time gain as the price converges to value, which must be spread over the years convergence takes to give an annual alpha, and that time is uncertain; if the price never converges, she earns only the gap between the implied return and 8% each year (at the market price, $\frac{5}{100} + 4.5\% = 9.5\%$, about 1.5 points more). Finally, many analysts can do the same calculation, so a large undervaluation from a simple model more likely comes from her assumptions (overconfidence) than from information the market cannot see. The sensible approach is to run a sensitivity analysis, identify how her assumptions differ from those the market implies, and ask what information she has that the market lacks; without good reasons, she should not buy heavily.

**Grading points**

- OK: finds that the price implies growth of about 3% (or equivalently explains that the disagreement is only about growth), points out the model's extreme sensitivity to $r - g$ (for example the effect of a 1-point change in the discount rate), and explains that a valuation gap is not an annual alpha and, from market efficiency or overconfidence, why the 43% is unreliable. Recomputing 142.86 and agreeing with her, or saying only "the model is uncertain" without quantifying it or discussing the implied assumptions, needs revision.

Numeric answers: g = 3, v = 142.86

**Common errors**

- Treating the gap between one's own valuation and the price as a sure excess return; not knowing that perpetual-growth models are extremely sensitive to the growth and discount rates, and not asking what assumptions the market price implies. Treating a one-time valuation gap as an annual alpha.
