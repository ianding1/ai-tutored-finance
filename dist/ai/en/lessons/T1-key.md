# T1 Comprehensive Quiz 1: Foundations in Math, Micro and Macro: Key file (for the AI tutor only)

Do not reveal anything here before the learner has answered.

## Lesson facts relevant to the questions

- Comprehensive quiz T1 covers Lesson 0.1, "Compounding and the Time Value of Money" https://ianding1.github.io/ai-tutored-finance/en/lessons/0-1-time-value-of-money/ to Lesson 2.8, "Business Cycles and Asset Prices" https://ianding1.github.io/ai-tutored-finance/en/lessons/2-8-business-cycle-asset-prices/: math and statistics tools, microeconomics and macroeconomics. Most questions combine material from different stages; each stem is a situation that does not say which concept to use. What matters is whether the learner recognizes the concepts that apply, builds a simple model and draws the conclusion; there is little calculation. The learner may use a calculator or code, and the quiz starts with a formula sheet, which also includes some formulas no question uses. When grading, reasoning and reasons count more than arithmetic.

## Q1

A country already has a trade deficit. Its currency falls 10% against foreign currencies. Its exports are priced in its own currency and its imports in foreign currency. In the first few months after the fall, the quantity of imports the country buys and the quantity of its exports foreigners buy hardly change at all. In these months the trade deficit, measured in the home currency, widens.

**Reference answer**

True. Imports are priced in foreign currency, so after the fall each unit costs about 10% more in home currency; with the quantity almost unchanged, import spending in home currency rises by about 10%. Exports are priced in home currency and become cheaper for foreigners, but foreign demand hardly changes, so export earnings in home currency hardly change. With exports unchanged and import spending higher, net exports fall and the deficit widens. This is the same logic as a price rise raising revenue when demand is inelastic: spending equals price times quantity, and when quantity barely moves, spending moves with the price. Only after some time, when demand becomes more elastic (buyers switch to domestic goods, foreigners buy more exports), can the fall in the currency narrow the deficit.

**Grading points**

- States true and explains that the home-currency price of imports rises with the quantity almost unchanged, so import spending rises, while export earnings in home currency hardly change, so the deficit widens.
- Stating false (thinking a currency fall always improves the trade balance), or saying only that imports get dearer without explaining that spending is price times quantity: needs revision. A verdict alone: needs revision.

**Common errors**

- Thinking a fall in the currency at once narrows the trade deficit. When demand is inelastic in the short run, the home-currency price of imports rises with the quantity almost unchanged, so import spending rises and the deficit widens.

## Q2

Two countries have the same technology, population growth and depreciation rate and are both in their long-run steady states, but country A saves a much larger share of income than country B. Capital can now move freely between them. A has built up more capital and is richer, and investment there earns more, so capital will flow into A, and A will run a current account deficit.

**Reference answer**

False. Capital has a diminishing marginal product: other things equal, the more capital each worker has, the less output an extra unit adds. With its high saving rate, A has more capital per worker and higher output per person in its steady state, but a lower marginal product of capital (return on capital). With $y = Ak^{\alpha}$, for example, the marginal product of capital is $\alpha A k^{\alpha - 1}$, which falls as $k$ rises. Being richer means higher average output, not a higher marginal return. So with free capital mobility, investors move capital from A, where it earns less, to B, where it earns more, not the other way: A lends part of its saving to B, running a current account surplus while B runs a deficit. (In practice differences in risk and institutions can change this conclusion, but in the question the countries differ only in their saving rates.)

**Grading points**

- States false and explains with the diminishing marginal product of capital that A, with more capital per worker, earns less on an extra unit, so capital flows from A to B, A's saving exceeds its domestic investment, and A runs a current account surplus, not a deficit; distinguishes average output from the marginal return. Judging the direction of capital flows without the current account: needs revision.
- Stating true (taking richer to mean higher returns), or saying only that A grows more slowly without the marginal product: needs revision. A verdict alone: needs revision.

**Common errors**

- Thinking a richer country with more capital also earns a higher return on capital and attracts capital. Capital has a diminishing marginal product, so the more capital per worker, the less an extra unit earns; with free mobility, capital flows from capital-rich to capital-poor countries.

## Q3

A regression on 50 years of annual data finds that the stock index's annual return has a significantly positive slope on real GDP growth in the same year. So if you forecast high real GDP growth next year, you should hold more stocks.

**Reference answer**

False. The regression describes stock returns and GDP growth moving together in the same year; it does not show that a GDP forecast can earn money. Stock prices reflect expectations: growth investors can foresee is already in the price, and prices react to growth surprises. If your forecast matches the market's consensus, it brings no extra return; only a forecast that differs from the market and is more accurate could help. Also, stock prices usually lead the economy, so part of the same-year correlation comes from prices that had already reflected expectations.

**Grading points**

- States false and points out that foreseeable growth is already in the price and only the part that differs from expectations affects returns, so a same-year correlation cannot be used to earn money from a forecast.
- Saying only that correlation is not causation, without explaining that expectations are already in prices, or stating true: needs revision. A verdict alone: needs revision.

**Common errors**

- Treating a same-period correlation as a relation that can be used to earn money, ignoring that foreseeable growth is already in prices and prices react only to surprises.

## Q4

The monthly log returns of an index over the past 20 years are independent with the same distribution. Estimating the mean yearly log return from these 240 monthly returns gives the same standard error (computed with the true standard deviation) as estimating it from the 20 yearly log returns: there are 12 times as many observations, but the estimate is no more precise.

**Reference answer**

True. Each year's log return is the sum of the log returns of its 12 months. Estimating the mean yearly return from monthly data means multiplying the monthly mean by 12: $12 \times \frac{1}{240}\sum_{\text{months}} \ell = \frac{1}{20}\sum_{\text{months}} \ell$, which is exactly the mean of the 20 yearly log returns, the same number.
The standard error gives the same result: let the standard deviation of the yearly log return be $\sigma$; with independent months, the monthly variance is $\frac{\sigma^2}{12}$. The standard error of the monthly mean is $\frac{\sigma/\sqrt{12}}{\sqrt{240}}$, and 12 times this is $\frac{12\,\sigma}{\sqrt{12}\sqrt{240}} = \frac{\sigma}{\sqrt{20}}$, the same as with yearly data.
The precision of an estimated mean return depends on how many years the data cover, not on how often it is observed: cutting a year into 12 parts also makes each part less volatile, and no information is added.

**Grading points**

- States true and shows that the two estimates are the same number, or computes that both standard errors are $\frac{\sigma}{\sqrt{20}}$.
- Thinking the monthly standard error is $\frac{1}{\sqrt{12}}$ of the yearly one (stating false), or only saying "the length of time is what matters" without an argument: needs revision. Only the verdict: needs revision.

**Common errors**

- Thinking that more observations always give a more precise estimate, so 240 monthly observations give about $\frac{1}{\sqrt{12}}$ of the standard error of 20 yearly ones. The precision of an estimated mean return depends on the length of time the data cover, not on how often it is observed.

## Q5

A household is risk averse; it insures its house and car. Its income moves up and down with the economy each year; it depends only on the state of the economy, not on the tax system. The household spends all its after-tax income every year and cannot borrow or save. The government replaces the fixed amount of tax the household paid each year with a tax at a fixed percentage of income, with the percentage set so that the household pays the same tax as before on average. This change makes the household better off.

**Reference answer**

True. With a fixed tax, after-tax income swings as much as pre-tax income. With a proportional tax, the household pays more in good years and less in bad ones; after-tax income is pre-tax income times $(1 - \tau)$, so its standard deviation shrinks in the same proportion, while the average tax is unchanged and so is expected after-tax income. With the same expected value and smaller swings, a risk-averse household with concave $u$ has higher expected utility. The proportional tax works like free income insurance: the extra tax in good years pays for the lower tax in bad years. This is what a proportional tax as an automatic stabilizer means for a household. (If the household could borrow and save to smooth consumption, the gain would be smaller, but it would not vanish.)

**Grading points**

- States true and explains that the proportional tax lowers the swings in after-tax income while leaving its expected value unchanged, so a risk-averse household (with concave utility) has higher expected utility; describing it as income insurance also counts.
- Stating false (thinking that an unchanged average tax leaves welfare unchanged), or saying only that a proportional tax is fairer without discussing the swings and risk aversion: needs revision. A verdict alone: needs revision.

**Common errors**

- Thinking that an unchanged average tax leaves the household's welfare unchanged. A proportional tax takes more in good years and less in bad ones, lowering the swings in after-tax income with the same expected value, which for a risk-averse household works like income insurance.

## Q6

A government's debt is 100% of GDP. The nominal interest rate on the debt is 3% a year forever, real GDP grows 2% a year forever, and inflation is 2% a year forever. Under these conditions, as long as the government runs a primary deficit of 2% of GDP every year, the debt-to-GDP ratio will rise without limit, because the economy's growth rate (2%) is below the interest rate (3%).

**Reference answer**

False. Debt and GDP are both nominal amounts, so the comparison is between the nominal interest rate and nominal growth, not between the nominal rate and real growth. Nominal GDP grows $1.02 \times 1.02 - 1 = 4.04\%$ a year, above the 3% interest rate (comparing in real terms gives the same answer: the real rate is about $\frac{1.03}{1.02} - 1 \approx 0.98\%$, below real growth of 2%). So by $b_{t+1} = \frac{1 + r}{1 + g} b_t + d$, existing debt shrinks by about 1% of itself relative to GDP each year, the more so the higher the ratio, until this exactly offsets the new deficit: $b^* = \frac{d(1 + g)}{g - r} = \frac{0.02 \times 1.0404}{0.0104} \approx 200\%$. The ratio rises gradually to about 200% but not without limit. This depends on the interest rate staying below nominal growth forever; at a high ratio the risk of higher rates is also larger.

**Grading points**

- States false and points out that the nominal rate must be compared with nominal growth (about 4.04%), or the real rate with real growth; explains that the ratio approaches a finite level (about 200%). Explaining the convergence correctly without the number also passes.
- Comparing the nominal rate with real growth and stating true, or a verdict alone: needs revision.

Numeric answers: limit = 200

**Common errors**

- Comparing the nominal interest rate with real growth and concluding that the debt ratio rises without limit. Debt and GDP are nominal, so the nominal rate must be compared with nominal growth; with the rate below nominal growth, the ratio approaches the finite level $\frac{d(1+g)}{g-r}$.

## Q7

Banks A and B have the same assets: a batch of 30-year fixed-rate mortgages just made, totaling 50 (hundred million dollars, as are all amounts below), at 4% a year; borrowers repay the same amount at the end of each year for 30 years. Both have liabilities of 46 and book equity of 4, and neither has bad loans. A's liabilities are 30-year time deposits that cannot be withdrawn early, which pay at the end of each year exactly 92% of that year's mortgage payments. B's liabilities are demand deposits that can be withdrawn at any time, mostly above the deposit insurance limit. Shortly after the loans are made, market interest rates rise to 6%, with no change in borrowers' default risk.
(a) How do the two banks' positions differ after the rise in rates? Show your calculation.
(b) A regulator says: "Both banks have book equity of 4 and no bad loans, so both are safe." Evaluate this statement.

**Reference answer**

(a) The mortgages are an annuity: the annual payment is $C = \frac{50 \times 0.04}{1 - 1.04^{-30}} \approx 2.89$, worth $\frac{2.89}{0.06}\left(1 - 1.06^{-30}\right) \approx 39.80$ at 6%. A's liabilities pay 92% of the mortgage payments each year, so their cash flows match the assets and their market value falls in the same proportion: $0.92 \times 39.80 \approx 36.62$, leaving equity at market value of about $39.80 - 36.62 \approx 3.18$, still positive. B's liabilities are 46 of demand deposits whose value does not change with rates, so its equity at market value is about $39.80 - 46 \approx -6.20$: it is in fact insolvent.
(b) The statement is wrong. Book values are kept at cost and hide the losses caused by the change in rates. A's assets and liabilities have the same maturity, so a rise in rates lowers both, and its deposits cannot be withdrawn early; it is not in danger. B's assets take 30 years to come back while its deposits can leave at any time: uninsured depositors who fear that others will withdraw first and that they will not get their money back in full rush to withdraw; once everyone does, B must sell the mortgages at market value and the loss becomes real. B is already insolvent at market value, so the fear is well founded, and a rumor can start a run. Whether a bank is safe depends on whether the market values and maturities of its assets and liabilities match, not only on book equity and bad loans.

**Grading points**

- (a) Recognizes the mortgages as an annuity worth about 39.80 at 6%; A's liabilities lose value in the same proportion, leaving equity of about 3.18; B's equity is about −6.20. Discounting at 4%, or treating both banks' liabilities as unchanged in value: needs revision.
- (b) Points out that book values hide the losses from rates; explains that A, with matched maturities, is not in danger, while B's deposits can leave at any time and are uninsured, so each depositor withdraws if he expects others to, and the run fulfills itself. Saying only that B has lost money, without the mechanism of the run: needs revision.

Numeric answers: pv = 39.80, ea = 3.18, eb = -6.20

**Common errors**

- Judging whether a bank is safe only by book equity and bad loans, or not recognizing fixed-rate mortgages as an annuity and valuing them at the loan rate. Higher rates cut the market value of long-term assets; a bank whose liabilities match its assets in maturity loses little, while one funded by deposits that can leave at any time may be insolvent at market value and fail in a run.

## Q8

There are two kinds of company, half of each. A "good company" has existing assets worth 200 (million dollars), and a "bad company" has existing assets worth 40. Both kinds have a new project: investing 20 raises the company's value by 25 (a net present value of +5). Managers know which kind their company is and decide in the interest of the existing shareholders; outside investors cannot tell, know only that half are of each kind, and price new shares fairly given what they believe. The companies have no cash, so to invest they must first raise 20.

(a) Suppose investors believe that both kinds will issue new shares and price them accordingly. Will a good company issue new shares to invest? Show your calculation.

(b) If a good company can instead borrow 20 of risk-free debt (one period, ignoring interest, repaying 20 at the end), what happens? Compare with (a) and explain why.

**Reference answer**

(a) If both kinds issue, after investing a good company is worth 225 and a bad one 65, so investors price an issuer at the average $\frac{225 + 65}{2} = 145$. Raising 20 requires giving new shareholders $\frac{20}{145} \approx 13.79\%$. The old shareholders of a good company end up with $225 \times (1 - 13.79\%) \approx 193.97$, less than the 200 they have without investing. So a good company will not issue new shares: its shares are undervalued at the average: the new shareholders put in only 20 but receive about $13.79\% \times 225 \approx 31.03$ of value, a net gain of about 11.03, more than the project's net present value of 5.
In the end only bad companies issue new shares (for their old shareholders, issuing at the average value is a bargain), so the belief that both kinds issue cannot hold. Two values must be kept apart here: the value investors estimate beforehand from the average (145), and the true value once the company's type is known (225 or 65); the old shareholders of a good company lose the part of this gap that goes to the new shareholders. Investors can work this out too and read a share issue as a sign of "I am a bad company"; this is exactly why share prices often fall when companies announce an issue. The good company gives up a project with a positive net present value, an efficiency loss caused by adverse selection.
(b) Yes. Borrowing 20 and investing makes the company worth 225, and after repaying 20 the old shareholders get 205, more than the 200 without investing. Risk-free debt requires repaying only 20, so its value does not depend on which kind the company is; investors do not need to judge the company's type, and the good company does not have to hand undervalued shares to new shareholders. The less the value of a financing instrument depends on the company's inside information, the smaller the adverse-selection problem; this is one reason companies usually use internal funds and debt first and issue new shares last.

**Grading points**

- (a) Priced at the average of 145 (computing it as the average value before investment, 120, plus the new money of 20 and the net present value of 5, is also fine); new shareholders' share about 13.79%; old shareholders of a good company about 193.97 < 200, so it does not issue; explains that the shares are undervalued and the value given away exceeds the net present value of 5, so a positive-NPV project is lost. Only "the NPV is positive, so it invests": needs revision.
- (b) Old shareholders get 205 > 200, so it invests; explains that the value of risk-free debt does not depend on the company's type, so no pricing at the average and no dilution are needed. Finding 205 without explaining why debt escapes adverse selection, or holding that debt is riskier and therefore worse: needs revision.

Numeric answers: avg = 145, share = 13.79, keep = 193.97, debt = 205

**Common errors**

- Thinking that a project with a positive net present value will always be undertaken; or not noticing that when new shares are priced at the average value, the old shareholders of a good company give part of its value to the new shareholders.

## Q9

A researcher regresses the yearly change in total consumption on the change in disposable income, using 40 years of annual data; the slope is 0.9 and $R^2$ is high. He proposes that the government give every household a one-time payment, for one year only, financed by issuing bonds: "The marginal propensity to consume is 0.9, so the multiplier is about 10: each dollar paid out raises output by about 10 dollars." Assume interest rates do not change and there are no taxes that vary with income and no imports. Evaluate the researcher's reasoning.

**Reference answer**

The reasoning has two problems, and its conclusion overstates the effect.
First, even if the marginal propensity to consume really is 0.9, the payment is not direct spending: households spend 0.9 of it, and only that 0.9 starts the income–consumption cycle. The multiplier is $\frac{0.9}{1 - 0.9} = 9$, as for a tax cut, not the 10 of government purchases.
Second, the regression slope probably overstates the propensity to spend this one-time payment. For example: (1) most income changes in the regression are lasting (changes in jobs and wages), and households set consumption by long-run income; a one-time payment raises lifetime wealth only a little, so with consumption smoothing they spend only a small part of it. (2) The payment is financed by bonds to be repaid with later taxes; households that can borrow and foresee the taxes will save it. (3) The slope is not a causal effect: part of total income itself comes from consumption (more spending raises output and income), and common causes such as confidence, wealth and interest rates push income and consumption together, all of which bias the slope up. Households that cannot borrow will spend more, but they are only part of the population. So the actual multiplier may be far below 9.

**Grading points**

- Core: points out that the regression slope overstates households' propensity to spend this one-time payment, with at least one reason about behavior (consumption smoothing or future taxes); also giving a reason about the regression itself (reverse causality or common causes) is better. Saying only that correlation is not causation without specifics, or accepting 0.9 as the propensity to spend a one-time payment: needs revision.
- Noting that even with a propensity of 0.9 the transfer multiplier is 9, not 10, is an extra finding, not required to pass; if it is missing, mention it in the feedback.

Numeric answers: k = 9

**Common errors**

- Using the government-purchases multiplier $\frac{1}{1-b}$ for a transfer; or taking the regression slope of consumption on income as the propensity to spend a one-time payment, ignoring consumption smoothing, future taxes, and reverse causality and common causes in the regression.

## Q10

A client has 200,000 dollars in cash, which is all of her financial assets; she also has a fixed-rate mortgage at 4% with a balance of 200,000 dollars. Her financial adviser charges 1% a year of the assets he manages (here, 1% of 200,000 dollars), deducted from the return at the end of the year. He advises her not to pay off the mortgage but to let him invest the 200,000 dollars in a stock portfolio: "This portfolio has an expected return of 7% a year, higher than the 4% mortgage rate, so investing pays more." The standard deviation of the portfolio's yearly return is 15%. The client has CRRA utility with a coefficient of relative risk aversion $\gamma = 3$, and the 200,000 dollars can be treated as her wealth. Compare one year only and ignore taxes. Evaluate the adviser's advice: which choice is better for this client?

**Reference answer**

Paying off the mortgage is better. The comparison must be made on the same basis:
First, paying off the mortgage saves 4% interest a year, equivalent to a certain 4% return with no risk.
Second, after the 1% fee, the investment's expected return is only 6%.
Third, the investment return is risky. By the CRRA approximation, the proportional risk premium is about $\frac12\gamma\sigma^2 = \frac12 \times 3 \times 0.15^2 = 3.375\%$, so the certainty-equivalent return of investing is about $6\% - 3.375\% = 2.625\%$, below the certain 4%. (This is an approximation for small risks; the gap is large enough that an exact expected-utility calculation gives the same conclusion. Even without the fee, $7\% - 3.375\% = 3.625\%$ is below 4%.)
The adviser compares a risky expected return directly with a risk-free return and leaves out his own fee. This also reflects the principal-agent problem: he charges a fee on the assets he manages, so he earns about 2,000 dollars a year if she invests and nothing if she pays off the mortgage, and his comparison shows only the numbers that favor investing.

**Grading points**

- Recognizes that paying off the mortgage is a certain 4% return; subtracts the fee to get about 6%; uses $\frac12\gamma\sigma^2$ to get a risk premium of about 3.375% and a certainty-equivalent return of about 2.625%, and concludes that paying off the mortgage is better. Only comparing 7% or 6% with 4%: needs revision.
- Points out that the adviser's fee tilts him toward recommending investment (the principal-agent problem). Leaving this out still passes if the first point is complete; point it out in the feedback.

Numeric answers: premium = 3.375, ce = 2.625

**Common errors**

- Not recognizing that paying off the mortgage is a certain return, and comparing a risky expected return directly with a risk-free rate (7% > 4%), ignoring the adviser's fee and the risk premium; or not noticing that the way the adviser is paid tilts the recommendation toward investing.

## Q11

A country's central bank has always targeted 2% inflation, and the public believes it. The bank announces that from today the target is 4%. The public believes the new target at once and expects inflation of 4% every year from now on. A commentator says: "Since the higher inflation is expected by everyone, no one is hurt by it."
An investor bought last year a government bond with face value 100 and a 3% annual coupon. A coupon was paid today, and 10 more remain, the last together with the principal. Before the announcement, nominal rates at all maturities were 3%. Suppose real rates are the same before and after the announcement. After the announcement, roughly what is the bond's price? Use this to evaluate the commentator's statement: who loses and who gains?

**Reference answer**

With the real rate unchanged and expected inflation up 2 percentage points, the Fisher equation puts the nominal rate at about 5% (about 5.02% with the exact $1 + i = (1 + r)(1 + \pi)$). The price is about $\sum_{t=1}^{10} \frac{3}{1.05^t} + \frac{100}{1.05^{10}} \approx 84.56$ (about 84.42 at 5.02%), a fall of about 15%.
For contracts signed later, 4% inflation is expected and is built into nominal rates, so no one is hurt. But the announcement itself is a surprise for nominal contracts signed earlier and priced on the old expectations: holders of nominal assets such as fixed-rate bonds and deposits lose, and nominal debtors such as the government and fixed-rate mortgage borrowers gain (the real value of their repayments falls). So the statement holds only for new contracts made after the announcement; what matters is whether the inflation was expected before or after a contract was signed.

**Grading points**

- Uses the Fisher equation to put the nominal rate at about 5% and the price at about 84.56 (about 84.42 with the exact formula also counts). Treating the nominal rate as unchanged: needs revision.
- Points out that the announcement is a surprise for existing nominal contracts, so holders of nominal assets lose and nominal debtors gain, and only new contracts are unaffected. Agreeing with the commentator without separating existing contracts: needs revision.

Numeric answers: price = 84.56

**Common errors**

- Thinking that "expected inflation" hurts no one, ignoring that the announcement itself surprises nominal contracts signed under the old expectations and moves wealth from holders of nominal assets to nominal debtors.

## Q12

A perfectly competitive industry has market demand $Q_d = 1200 - 20P$. In the long run firms can enter and exit freely, all firms (including potential entrants) have the same costs, and the minimum of long-run average cost is 30; changes in the size of the industry do not affect input prices. The industry is currently in long-run equilibrium at a price of 30. The government imposes a tax of 5 dollars per unit, paid by the firms. In the short run (with the number of firms fixed), the price buyers pay rises to 33.75 dollars and the price firms receive falls to 28.75 dollars.
(a) What happens in the long run? Find the long-run price buyers pay and the quantity traded. Someone says: "This tax is levied on companies, so in the end it is borne by their shareholders." Evaluate this statement.
(b) The firms in this industry are all listed companies. On the day the government announces the tax, how do their share prices change? Explain why, using your conclusion in (a), and say what the size of the change depends on.

**Reference answer**

(a) In the short run, the 28.75 firms receive is below the minimum long-run average cost of 30, so economic profit is negative and some firms exit. Exit reduces supply until the price firms receive returns to 30 and economic profit returns to 0: with free entry and exit and constant costs, long-run supply is perfectly elastic at 30. In the long run $P_s = 30$, $P_b = 35$ and $Q = 1200 - 700 = 500$.
The statement holds only for the short run: during the adjustment, existing firms receive less than average cost, and their shareholders bear losses. But in the long run the price firms receive returns to 30, and buyers bear the whole tax. (This relies on the assumption that the industry's size does not affect input prices; if a smaller industry made some inputs cheaper, the owners of those inputs would still bear part.) Who pays a tax does not decide who bears it; the longer the time, the more elastic supply and the more of the tax passes to buyers.
(b) A share price reflects the present value of all future profits. On the day of the announcement investors foresee the losses during the adjustment (firms receive less than average cost until enough firms have left), so share prices fall at once, by about the present value of these transition losses; in the long run economic profit returns to 0 and later profits are unaffected. So shareholders bear the transition losses, not the long-run tax. The size of the fall depends on how fast the adjustment is (the slower the exit, the longer the losses last), on the short-run elasticities of supply and demand (which set the firms' short-run share) and on the discount rate. If firms' capital can be used in other industries, exit is easier and the loss smaller; if it is specific to this industry, exiting firms also bear a fall in the value of their assets. If the market had expected the tax before the announcement, prices already reflected this loss and the change on the day is smaller.

**Grading points**

- (a) Derives from free entry and constant costs that $P_s$ returns to 30 in the long run; $P_b = 35$, $Q = 500$; evaluation: shareholders bear part in the short run, buyers bear the whole tax in the long run, and the split depends on elasticity, not on who pays. Using the short-run prices for the long run, or agreeing that shareholders bear it without distinguishing the short and long run: needs revision.
- (b) Explains that share prices fall at once on the announcement, by about the present value of the transition losses, while long-run profits are unaffected; names at least one factor that sets the size (speed of adjustment, short-run elasticities, discount rate or how specific the capital is). Holding that share prices do not change (because buyers bear the tax in the long run), or that they fall by the long-run tax: needs revision.

Numeric answers: pl = 35, ql = 500

**Common errors**

- Thinking that if buyers bear the tax in the long run, shareholders are not affected at all; or that share prices fall by the long-run tax. Share prices reflect the present value of the transition losses as soon as the tax is announced.
- Thinking that every tax causes a deadweight loss, or that whoever pays a tax bears it. The deadweight loss comes from the fall in the quantity traded; the split of the burden depends on how each side responds to the price and changes over time.
