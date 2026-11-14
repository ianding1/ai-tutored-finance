# T3 Comprehensive Quiz 3: Derivatives and Household Investing: Key file (for the AI tutor only)

Do not reveal anything here before the learner has answered.

## Lesson facts relevant to the questions

- Comprehensive quiz T3 covers Lesson 5.1, "Forwards and Futures" https://ianding1.github.io/ai-tutored-finance/en/lessons/5-1-forwards-futures/ to Lesson 6.13, "Monitoring and Review" https://ianding1.github.io/ai-tutored-finance/en/lessons/6-13-monitoring-review/: derivatives and alternative assets, and household investing in practice; tools from Stages 0–4 may also be used. Most questions combine material from different stages; each stem is a situation that does not say which concept to use. What matters is whether the learner recognizes the concepts that apply, builds a simple model and draws the conclusion; there is little calculation. The learner may use a calculator or code, and the quiz starts with a formula sheet: the present value of an annuity, the Fisher equation; the cost-of-carry model $F = S e^{(r - q)T}$, covered interest parity, the minimum-variance hedge ratio; put–call parity, the Black–Scholes formula; the swap rate; the share of final wealth lost to fees $\approx 1 - e^{-fT}$; the present value of a growing annuity; the funded ratio; the Sharpe ratio, the variance of a two-asset portfolio, and the t-value of alpha $\approx IR\sqrt{T}$. Some of these formulas are used by no question. Tax rates and other rules in the questions are the 2026 US rules. When grading, reasoning and reasons count more than arithmetic.

## Q1

A financial planner says: "Option prices are computed as if the expected return on stocks equals the risk-free rate; that is how the market prices them. So when I estimate the probability that a client reaches a retirement goal in 20 years, I also assume stocks are expected to earn the risk-free rate, because that is most consistent with the market."

**Reference answer**

False. Risk-neutral pricing is a way to compute prices, not a forecast of actual outcomes. An option can be replicated with stock and borrowing, so its price does not depend on the stock's true expected return; taking expectations under risk-neutral probabilities and discounting at the risk-free rate gives the same price as taking expectations under true probabilities and discounting at a rate that includes a risk premium. Risk-neutral probabilities put more weight on bad outcomes; they reflect prices, not how likely events are. The probability of reaching a goal is a question about the distribution of outcomes in the real world, so it needs the true expected returns (including the equity premium) and volatilities of the capital market assumptions, for example in a Monte Carlo simulation. Assuming an expected return equal to the risk-free rate systematically understates the probability of success for portfolios with more stock. The planner is half right, though: computing the present value of a goal and the funded ratio by discounting at the risk-free rate is consistent with how the market prices cash flows.

**Grading points**

- OK: false, explaining that risk-neutral probabilities are a pricing device, that prices do not depend on true expected returns, and that the probability of success needs true expected returns (including the risk premium). Saying only that stocks are expected to earn more than the risk-free rate without the difference between pricing and forecasting, or only false, needs revision. (Noting that discounting the goal at the risk-free rate is right is a welcome extra.)

**Common errors**

- Thinking risk-neutral pricing means the market believes stocks are expected to earn the risk-free rate, and so using the risk-free rate to estimate the probability of reaching a goal; not separating pricing cash flows (where risk-free discounting and risk-neutral probabilities go together) from forecasting the probability of outcomes (which needs real expected returns).

## Q2

A household has 1 million dollars, 70% in a stock index fund, mostly in a taxable account with large unrealized gains. They want to bring stocks down to 60%, but plan to sell the stock next January, when one of them retires, their income falls and their long-term capital gains tax rate is lower. An adviser suggests selling S&P 500 index futures with a notional value of about 100,000 dollars now (their fund tracks the S&P 500) and closing the futures when they sell the stock next year. He says: "During these months, the risk and expected return of your portfolio will be almost the same as if you sold 100,000 dollars of stock now and bought Treasury bills."

**Reference answer**

True. By the cost-of-carry model, the index futures price is about $F = S e^{(r - q)T}$. Holding 100,000 dollars of stock and selling futures with the same notional value, the stock's price changes are offset by the futures gains and losses; the combination earns the dividend $q$ plus the excess of the futures price over spot, $r - q$, about the risk-free rate $r$ in total, the same as Treasury bills. So the stock risk of these 100,000 dollars is removed, and the portfolio is about 60% stock. The differences are small: futures are settled daily, so cash must be kept for margin (more is needed if stocks rise); contracts have a fixed size, so the notional value matches only roughly; and there is a little basis between the fund and the index. Futures gains and losses are taxed each year at market value, but the gains on the stock are postponed to next year at a lower rate, which is the point of the plan.

**Grading points**

- OK: true, using the cost-of-carry model (or the arbitrage relation) to explain that stock plus the futures sold is about a riskless asset earning about the risk-free rate; mentioning small differences such as margin, contract size or basis is a plus. Saying only that futures can hedge without explaining why the return equals the risk-free rate, or only true, needs revision. Judging it false because futures must add risk needs revision.

**Common errors**

- Thinking futures are only for speculation and add risk, or that only selling stock can reduce stock risk; not seeing that holding stock and selling index futures is, by the cost-of-carry model, about the same as holding Treasury bills.

## Q3

A single 62-year-old retiree has 1.2 million dollars, half in stocks and half in bonds. He decides to wait until 70 to claim Social Security and to pay his living costs during these 8 years from the portfolio's bonds, so at 70 the stock share of his portfolio will be far above 50%. His adviser says: "If you count Social Security too, your overall wealth has not become riskier; you will not necessarily need to sell stocks to bring the portfolio back to 50/50."

**Reference answer**

True. Delaying Social Security is like using the payments forgone during these 8 years (here paid for from the portfolio's bonds) to buy a larger, inflation-adjusted lifetime income. That income is like a real annuity without default risk, a bond-like asset in total household wealth (even safer than a nominal bond). He traded one safe asset (bonds) for another (more Social Security), so the share of safe assets in total wealth does not fall much, and his longevity risk falls. If his original 50/50 was chosen for the risk his total wealth could bear, the higher stock share of the portfolio just reflects this trade, and he does not need to sell stocks to go back; risk should be judged on total wealth including the present value of Social Security. Of course, if what he cares about is the portfolio itself (for example, money for heirs), or he has other large spending needs, he can think about it separately.

**Grading points**

- OK: true, explaining that delaying is like trading bonds for an inflation-adjusted lifetime income that is bond-like in total wealth, so the risk of total wealth does not rise much and the portfolio need not be mechanically rebalanced. Judging false from the portfolio's stock share alone, or only true, needs revision.

**Common errors**

- Looking only at the stock and bond shares of the portfolio, not counting inflation-adjusted lifetime income (Social Security, pensions) as a bond-like asset in total household wealth; thinking that trading bonds for more lifetime income makes the household riskier.

## Q4

The stock market has fallen 30% in three months. An investor plans to convert 100,000 dollars (the value after the fall) in his traditional IRA to a Roth IRA, paying the tax from cash in his taxable account. He says: "Right after a crash is a good time to convert: for the same number of fund shares, I pay much less tax now, and when the market recovers, the whole recovery is tax-free. So converting now is a better deal than waiting a few months, when the market may already have recovered." Assume his marginal tax rate is 24% both when he converts and when he withdraws in retirement, and that his income and tax bracket this year do not depend on the market.

**Reference answer**

False. Money in a traditional account is taxed at 24% when withdrawn, so in effect 24% of the account belongs to the government and the investor owns 76%, and the growth of his 76% is already untaxed. Converting means using cash equal to 24% to buy back the government's share at today's market price. When the price is low, buying back the same number of shares costs less, but what he buys is the same number of shares, now worth less; in an efficient market, today's price is a fair price and the expected return from here is the same as at other times, so the value of this trade does not depend on the price level. The same holds for converting now versus in a few months: if the market recovers, converting later costs more tax, but the shares converted are worth more too, in the same proportion; converting now is better only if he believes the recovery will be faster or larger than the market expects, which is market timing. (Comparing with three months ago is hindsight.) "The whole recovery is tax-free" is also only half the story: if the market keeps falling, he bears the whole fall alone, whereas without converting the government shares 24% of it. What decides whether converting pays is the tax rate: it helps when the rate at conversion is below the rate at withdrawal; when the two are equal, any benefit comes from other factors (for example, paying the tax from taxable cash, which effectively puts more money in a tax-free account, but this has nothing to do with a crash). Timing matters only through tax rates, for example when a crash lowers someone's income for the year so that more shares can be converted within a lower bracket; the question rules this out.

**Grading points**

- OK: false, explaining that converting buys back the government's share of the account at the market price (or that with equal tax rates the after-tax results grow in the same proportion whatever the price at conversion), that a low-price conversion helps only if prices recover more than the market expects, which is market timing, and that tax rates are what matter. Saying only that the market may fall further, or only false, needs revision.

**Common errors**

- Thinking a Roth conversion after a fall is "buying low" with a tax-free recovery; not seeing that a share of the traditional account equal to the tax rate belongs to the government, and that converting only buys back that share at the market price, so the price level does not make the trade better or worse; the tax rates at conversion and at withdrawal do.

## Q5

A financial adviser charges clients 1% of assets a year, and the funds he chooses for them have an average expense ratio of 0.3%. His capital market assumptions are: over the next 10 years, the clients' 60/40 portfolio earns a nominal 5% a year, and inflation is 2.5% a year. He says: "Total costs of 1.3% take only about a quarter of the expected return; clients keep most of it."

**Reference answer**

False. By the Fisher equation, the portfolio's expected real return is $\frac{1.05}{1.025} - 1 \approx 2.44\%$. The part of the return that only matches inflation does not add to the client's purchasing power, while the costs come out of the purchasing power the client actually gains: 1.3% is about 53.3% of the expected real return, so the client keeps less than half, not three quarters. Compared with the part of the return above the risk-free rate (the pay for bearing risk), the share is higher still. Comparing costs with the nominal return is money illusion. Over 10 years, the costs reduce final wealth by about $1 - e^{-0.013 \times 10} \approx 12\%$, an even larger share of the real gain. The adviser's services (planning, tax and behavioral help) may be worth the price, but their cost should be measured against the real return.

**Grading points**

- OK: false, computing a real return of about 2.44% (the approximation 2.5% is fine) and costs of about 53.3% (or about 52%) of it, and explaining that costs should be compared with the real (or excess) return and that comparing with the nominal return is money illusion. Judging it true from the nominal return, saying only that the costs are high, or only false, needs revision.

Numeric answers: real = 2.44, share = 53.3

**Common errors**

- Comparing costs with the nominal return and so understating their effect (money illusion); costs come out of the real return the investor actually keeps (or out of the part above the risk-free rate).

## Q6

A hedge fund's prospectus says: the fund keeps its assets in Treasury bills, and at the start of each month it signs contracts with several large banks and receives a fee up front; if the S&P 500 index falls more than 7% during the month, the fund pays the banks the part of the fall beyond 7% (on the contract amount), and otherwise pays nothing. The fund calls this "providing liquidity to the market and collecting insurance premiums". Over the past 8 years it has lost money in only 3 months and has a Sharpe ratio of 2.0, compared with about 0.7 for the stock index over the same period. An analyst says: "Even if all these data are accurate, this Sharpe ratio very likely overstates the fund's risk-adjusted performance."

**Reference answer**

True. These contracts are short 1-month puts with a strike 7% below the index: selling such out-of-the-money puts brings in a premium every month, and the fund loses heavily only when the index falls more than 7% within a month, and then the loss can be many times the premium. Its return distribution is left-skewed with fat tails: in an 8-year sample without a crash (or with very few), returns are smooth and the sample volatility is far below the risk actually borne; the Sharpe ratio measures risk only by volatility and is therefore overstated. This return is mainly pay for bearing the risk of a market crash (out-of-the-money puts usually have higher implied volatility, showing that investors pay extra for such protection), not stock-picking skill; and its losses come exactly when stocks crash and other assets fall too, which is worse than returns with the same volatility. Such a fund should be judged by its option positions, stress scenarios (for example, the loss if the index falls 20% in a month) and maximum drawdown, not by the Sharpe ratio alone.

**Grading points**

- OK: true, recognizing the contracts as short out-of-the-money puts and explaining that they give a left-skewed distribution with occasional large losses, that volatility in a sample without a crash understates the risk, and that the Sharpe ratio looks only at volatility; noting that this is pay for bearing crash risk, that losses come in market crashes, or that stress tests are needed is a plus. Saying only that past performance does not predict the future, or only true, needs revision.

**Common errors**

- Taking the high Sharpe ratio of an option-selling strategy, measured in a sample without a crash, as evidence of skill or low risk; not knowing that its return is pay for bearing rare crashes, with a left-skewed, fat-tailed distribution, so the sample volatility understates the risk.

## Q7

An engineer has worked at a listed company for 6 years and holds 10,000 vested employee stock options: strike 40 dollars, 4 years to expiry, not transferable. They are non-qualified options (NSOs): at exercise, the difference between the stock price and the strike is taxed as wage income. The company's stock is now 100 dollars, pays no dividend and has a volatility of about 35%; the continuously compounded risk-free rate is 4%. He also holds 3,000 company shares from vested RSUs, with a cost basis of about 95 dollars a share. The options and these shares together are about 55% of his household's financial assets.
(a) For an investor who can trade and hedge freely, what is each option worth by the Black–Scholes formula? How much of that is time value? Where does this time value mainly come from?
(b) Worried about his concentration, he plans to exercise all the options now and sell the shares. A colleague says: "Options on a stock that pays no dividend should never be exercised early; exercising early throws the time value away." Evaluate the colleague's statement and give your advice.

**Reference answer**

(a) $d_1 = \frac{\ln(100/40) + (0.04 + 0.35^2/2) \times 4}{0.35 \times 2} \approx 1.888$, $d_2 \approx 1.188$, $C \approx 100 \times N(1.888) - 40 e^{-0.16} N(1.188) \approx 66.97$ dollars. The intrinsic value is 60, so the time value is about 6.97 dollars. By put–call parity, $C = S - K e^{-rT} + P$, so the time value $= K(1 - e^{-rT}) + P$: about $40 \times (1 - e^{-0.16}) \approx 5.91$ dollars is the interest from paying the strike 4 years later, and the remaining 1.05 dollars or so is the value of the put with the same strike (protection if the stock falls below 40). The option is deep in the money, so its time value comes mainly from paying the strike later.
(b) The colleague's rule has a condition: the holder can sell the option or reduce its risk by hedging. For such an investor, exercising early gives 60 while selling or holding is worth about 66.97, so he should not exercise early. This engineer cannot sell the options, the company usually forbids hedging, and he bears a large amount of firm-specific risk; his salary and career also depend on the company (his human capital is highly correlated with his financial assets), and this risk cannot be diversified and earns no reward. So exercising early can be rational: he gives up about 6.97 dollars per option (about 70,000 dollars for 10,000 options, about 10% of their value) in exchange for much lower risk.
But a cheaper first step is to sell the 3,000 RSU shares: selling them gives up no time value, and with a cost basis close to the market price the tax is small. If the concentration is still too high after that, he can exercise part of the options in stages (the spread at exercise is taxed as ordinary income, so spreading exercises over several years also avoids very high income and tax rates in one year). He can also hold fewer other tech stocks while he cannot sell, lowering his overall concentration. In short, "never exercise early" holds only for someone who can sell or hedge freely.

**Grading points**

- (a) OK: an option value of about 66.97 and a time value of about 6.97 dollars, explaining that the time value is mainly the interest from paying the strike later (about 5.91) and the rest the value of the put (protection). Giving only the numbers without where the time value comes from needs revision.
- (b) OK: pointing out that the rule against early exercise assumes the holder can sell or hedge, which employee options do not allow, so exercising early to diversify can be rational; and that he should first sell the RSU shares (no time value lost, little tax) and then exercise in stages. Following the colleague's rule, or exercising all options at once without first considering selling the RSU shares, needs revision.

Numeric answers: c = 66.97, tv = 6.97, interest = 5.91

**Common errors**

- Applying "an American call on a non-dividend stock should never be exercised early" mechanically without asking its condition (the holder can sell or hedge the option); or the reverse, exercising all options at once to diversify without first using the cheaper way (selling company shares already held).

## Q8

Three years ago a household committed 400,000 dollars to a private equity fund. The fund has so far called 160,000 dollars, which the latest quarterly report values at 170,000 dollars; the remaining 240,000 dollars is expected to be called in stages over the next three or four years, and after each notice the household must pay within two weeks or lose most of its interest in what it has already invested. The household's other financial assets are 700,000 dollars in a stock index fund and 150,000 dollars in cash, which is set aside for a home down payment in two years.
They say: "The private fund is only about 17% of our assets and its value is very stable, so even if stocks crash, it will not affect our plan to buy a home." Evaluate this statement.

**Reference answer**

At current values, financial assets total $700 + 150 + 170 = 1{,}020$ thousand dollars. Counting the uncalled 240 thousand dollars, the private fund investment is $170 + 240 = 410$ thousand dollars, $\frac{410}{1{,}020} \approx 40.2\%$. The uncalled commitment is a liability that must be paid: on the household balance sheet, it should be subtracted from liquid assets, or treated as money that is certain to go into the private fund later.
The statement has three problems. First, the true private equity exposure is about 40%, not 17%, and the 240,000 dollars must be paid from the index fund or the cash, like a loan. Second, the fund decides when to call capital without regard to the household's situation, and calls often come after markets fall (funds buy companies when prices are low). If stocks fall 30%, the index fund is worth only about 490,000 dollars, but the calls must still be paid; the household must either sell stocks at the bottom or use the down-payment cash. Not paying loses most of its interest in what it has invested; selling the fund interest on the secondary market usually means a large discount when markets are down. Third, the "stable value" is only the smoothing of quarterly appraisals; the companies the fund holds are hit by recessions too, so its true risk is close to or above that of stocks, and after a stock crash the private fund's share at appraised value actually rises. So the down-payment money should be kept separately in safe assets such as Treasury bills, without counting on selling stocks when it is needed; liquid funds should be set aside for the uncalled commitment; and whether the household can bear this risk and the lack of liquidity (which an illiquidity premium should pay for) should be judged on an exposure of about 40%.

**Grading points**

- OK: pointing out that the uncalled commitment is a liability that must be paid, so the true exposure is about 40% (any reasonable denominator, as long as the 240,000 dollars is counted), that calls ignore markets and often come after falls, so that in a crash the household may have to sell stocks low or use the down payment; and that the stable value comes from smoothing. Advice to keep the down payment in safe assets and set aside funds for calls. Saying only that private funds are illiquid, without the conflict between the commitment and the down payment, or still measuring the exposure as 17%, needs revision.

**Common errors**

- Measuring the share of the private fund only by the value of what has been called, ignoring that the uncalled commitment is a liability that must be paid; thinking that because the fund's marks are smooth it cannot affect other goals, ignoring that capital calls ignore market conditions and often come when markets have fallen.

## Q9

A household is renewing its home insurance and has two choices: a deductible of 1,000 dollars with an annual premium of 2,400 dollars, or a deductible of 5,000 dollars with an annual premium of 1,800 dollars. According to data for their area, the probability of a claim in a year is about 4%, and claim losses almost always exceed 5,000 dollars. The household has a 30,000-dollar emergency fund and about 300,000 dollars of financial assets.
A neighbor says: "The lower the deductible, the safer; paying a bit more premium for peace of mind is well worth it." Which deductible should this household choose? Give your reasons, and explain under what conditions the lower deductible could be reasonable.

**Reference answer**

The higher deductible saves $2{,}400 - 1{,}800 = 600$ dollars a year. In a claim they pay $5{,}000 - 1{,}000 = 4{,}000$ dollars more, so the expected extra payment is $4\% \times 4{,}000 = 160$ dollars a year. The premium saved is $\frac{600}{160} = 3.75$ times the expected extra payment.
Seen the other way, the lower deductible is an extra layer of insurance: the insurer pays the part of the loss between 1,000 and 5,000 dollars (like an option spread), whose expected value is only 160 dollars a year, yet it costs 600 dollars more, a loading of about 2.75 times the expected payout. Risk-averse people are willing to pay extra for insurance, but how much extra (the risk premium) shrinks quickly as the risk gets small relative to wealth: for a household with a 30,000-dollar emergency fund and 300,000 dollars of financial assets, a 4,000-dollar loss is about 1.3% of wealth, and by the approximation $\frac{1}{2}\gamma\frac{\sigma^2}{W}$ of Lesson 1.4, "Choice Under Uncertainty" https://ianding1.github.io/ai-tutored-finance/en/lessons/1-4-choice-under-uncertainty/, even with relative risk aversion of 3 the risk premium of this layer is only a few dollars. So this layer is worth far less than 600 dollars; over the long run, saving 600 and expecting to pay 160 more saves about 440 dollars a year on average. Insurance is best for large losses one cannot bear; losses of a few thousand dollars are best covered by the emergency fund. The lower deductible could be reasonable if the household had no emergency fund and could only borrow on a high-rate credit card after a loss; if the claim probability were much higher than the insurer assumes in its price (for example, a very old house or an area with frequent disasters that the premium does not reflect); or if a 4,000-dollar loss would hit the household hard (low income, little wealth).

**Grading points**

- OK: comparing the premium difference (600 dollars) with the expected extra payout (about 160 dollars, about 3.75 times), explaining that the lower deductible costs 600 dollars more for an expected payout of 160, and that for a household with an emergency fund the cost of this small risk is tiny, so it is not worth it; and giving at least one condition under which a lower deductible is reasonable (no emergency fund, an underestimated claim probability, a loss large relative to wealth), choosing the higher deductible. Saying only that it depends on one's attitude to risk, without comparing the price with the expected payout, needs revision.

Numeric answers: extra = 160, ratio = 3.75

**Common errors**

- Thinking a lower deductible is always safer and the extra premium always worth it; not comparing the extra premium with the extra expected payout, and not considering that for a household with an emergency fund a loss of a few thousand dollars carries a very small cost of risk.

## Q10

The prospectus of a "buffer ETF" says: over a one-year outcome period, if the S&P 500 index (price, excluding dividends) falls, the fund is protected from the first 10% of the fall: when the index falls by 10% or less the fund's return is 0, and when it falls by more the fund bears only the part beyond 10%; if the index rises, the fund's return is at most 14%. The buffer and the cap apply before fees; the fund's expense ratio is 0.8%. Its marketing says: "We provide downside protection with options, but investors do not pay any option premium." The index's dividend yield is about 1.5% a year.
(a) Write the fund's one-year return as a set of positions in the index (excluding dividends) and options. If over the year the index price falls 25%, or rises 30%, what is the fund's return after its fee?
(b) Evaluate the marketing claim. For a 58-year-old investor worried about a crash before retirement, what alternatives are there to swapping all his stocks for this fund?

**Reference answer**

(a) Let the index be 100 now. The fund is equivalent to: holding the index (excluding dividends); buying a put with strike 100; selling a put with strike 90 (so only the fall from 100 to 90 is protected); and selling a call with strike 114 (so the return is at most 14%). If the index falls 25%, the fund's return is $-25\% + 10\% - 0.8\% = -15.8\%$ (an index fund's total return would be about $-25\% + 1.5\% = -23.5\%$). If the index rises 30%, the fund's return is $14\% - 0.8\% = 13.2\%$ (an index fund's about $30\% + 1.5\% = 31.5\%$).
(b) "No option premium" only means the fund does not charge investors separately, not that the protection is free: the cost of buying the put spread is paid with the premium from selling the call, and the investor pays with all the upside above 14%. In addition, the options are on the index price, so the investor gives up a dividend of about 1.5% a year (in pricing, dividends make calls cheaper and puts dearer, so the cap must be set lower), plus the 0.8% fee. Because out-of-the-money index puts are usually expensive (the volatility skew), this protection often costs a good deal. The protection holds only for the whole outcome period: an investor who buys in the middle gets a different buffer and cap from the prospectus. And it covers only the first 10%, so in a crash he still bears most of the loss.
For this investor, a more direct approach is to lower his stock share according to his goals and risk tolerance, for example by putting the money he will need in the next few years in bonds or a TIPS ladder and lowering his stock share gradually along a glide path. Lowering the stock share also reduces losses in a crash, but has no cap, gives up no dividends and costs much less. If he does want to use options, he should first compare this fund's cap with the result of holding less stock and more bonds with the same money, to see whether the price of this protection is reasonable.

**Grading points**

- (a) OK: holding the index, buying a put at 100, selling a put at 90 and selling a call at 114 (or an equivalent description of the payoff); the fund about −15.8% and 13.2%. Computing from the prospectus without writing the options needs revision.
- (b) OK: pointing out that the protection is paid for with the upside given up by selling the call and with the dividends given up (plus the fee), so it is not free; and proposing alternatives such as lowering the stock share and holding bonds or TIPS for the money needed in the next few years. Saying only that the expense ratio is high, or only that the cap limits returns without explaining that it is the price of the protection, needs revision.

Numeric answers: down = -15.8, up = 13.2

**Common errors**

- Believing that downside protection "with no option premium" is free; not breaking the product into the index, the puts bought and the calls sold, and so not seeing that the protection is paid for with the upside and the dividends given up.

## Q11

A 65-year-old retiree has a chronic heart condition, and his doctor estimates his life expectancy at about 80. Beyond Social Security, his basic living costs need 40,000 dollars a year from his investments (in today's purchasing power, paid at year end). TIPS of all maturities have a real yield of 2.0%. An insurer quotes a single payment of 750,000 dollars for an annuity paying 40,000 dollars a year, adjusted for inflation, for life.
(a) How much does a TIPS ladder providing this spending for 15 years (to age 80) and for 30 years (to age 95) cost today (in thousands of dollars)?
(b) His financial adviser says: "Annuities have mortality credits, so they are much cheaper than providing for yourself: 750,000 dollars buys income for life, while providing for yourself with a TIPS ladder to 95 costs much more. So basic living costs should definitely be fully annuitized." Evaluate whether this advice suits this retiree, and give your advice.

**Reference answer**

(a) 15 years: $40 \times \frac{1 - 1.02^{-15}}{0.02} \approx 514.0$ thousand dollars; 30 years: $40 \times \frac{1 - 1.02^{-30}}{0.02} \approx 895.9$ thousand dollars.
(b) Annuity prices are set by the lifespans of the people who buy annuities. Buyers tend to be in better health and to live longer than average (adverse selection), and insurers price for that. The price of 750,000 dollars is below the TIPS ladder to 95 because, in this pool, the money left by those who die early pays those who live long (mortality credits); for one person, the value of the deal depends on how long he himself lives. For this retiree, with a life expectancy of about 80, the annuity is worth roughly what a 15-year ladder costs (about 514,000 dollars) given his own lifespan, far below its price of 750,000, so on average he would give up a lot of money to other, longer-lived buyers. Fully annuitizing is therefore a poor deal for him; the adviser's comparison applies only to someone whose lifespan is like that of the annuity pool.
But he still has longevity risk: the doctor's estimate is only an average, and he may live to 90. A better approach: use a TIPS ladder for the spending of the earlier years (for example, to 80 or 85); for the later years, consider delaying Social Security (which follows the same rules for everyone and is not priced by health, although delaying is also worth less to someone with a short life expectancy and should be considered together with a spouse's situation), or buying a deferred annuity that starts paying only at 85, insuring the long-life case for much less money; the rest can go to heirs. If his health problem can be documented, some insurers also offer "impaired life" annuities with higher payments, which are worth comparing.

**Grading points**

- (a) OK: about 514.0 and 895.9 thousand dollars.
- (b) OK: pointing out that annuities are priced on the lifespans of buyers (who tend to live longer), that mortality credits come from sharing within the pool, and that for someone with a short life expectancy the annuity is worth less than its price (for example, compared with the 15-year ladder), so full annuitization does not suit him; while noting that he still has longevity risk, and advising a TIPS ladder plus protection for the later years (a deferred annuity, delaying Social Security and so on). Saying only that an annuity leaves nothing to heirs without comparing his lifespan with the pricing, or ignoring longevity risk entirely, needs revision.

Numeric answers: l15 = 514.0, l30 = 895.9

**Common errors**

- Thinking that because of mortality credits an annuity is cheaper than providing for oneself for everyone; not knowing that annuity prices are set by the lifespans of the people who buy annuities (often longer than average), so they are a poor deal for someone with a short life expectancy.

## Q12

An American household plans to move to Germany in 3 years and will then need 300,000 euros to buy an apartment (the price is roughly agreed). They have set aside 300,000 dollars for it, now all in US Treasuries. The exchange rate is 1 euro = 1.10 dollars; 3-year US Treasuries yield 4.0% a year and 3-year German government bonds 2.2% a year (both compounded annually). A bank can provide a 3-year euro forward contract.
(a) By no-arbitrage, what 3-year forward exchange rate should the bank quote? What is the goal worth today in dollars (in thousands)? What is their funded ratio?
(b) They say: "The forward rate is more expensive than today's rate, so locking it in is a bad deal; dollar rates are higher than euro rates, and the extra interest from holding Treasuries for three years will make up for it. Besides, Treasuries are the safest asset." Evaluate this statement, and explain what the riskless approach for this goal is.

**Reference answer**

(a) The forward rate is $F = 1.10 \times \left(\frac{1.04}{1.022}\right)^3 \approx 1.1592$ dollars per euro, about 5.4% above the spot rate. The goal's value today: discount at the euro risk-free rate and convert to dollars, $\frac{300}{1.022^3} \times 1.10 \approx 309.1$ thousand dollars (equivalently, $\frac{300 \times 1.1592}{1.04^3}$). The funded ratio is $\frac{300}{309.1} \approx 97.0\%$.
(b) The forward rate is above the spot rate exactly because of the gap between the two interest rates: the extra interest earned in dollars just offsets the extra dollars paid under the forward (covered interest parity). Locking in the rate is not "expensive", and the extra interest on dollar Treasuries is not an extra gain; they are two sides of the same thing. Without locking in, how many euros they get in 3 years depends on the exchange rate then, which often moves 8% to 10% a year, and the high-rate currency cannot be counted on to depreciate by the rate gap (uncovered interest parity often fails). For a goal priced in euros that must be met, dollar Treasuries are not a riskless asset: they are riskless in dollars, but bear the full exchange-rate risk in euros. The riskless approach is to hold euro riskless assets matching the goal's horizon, such as 3-year German government bonds (about 309.1 thousand dollars locks in 300,000 euros), or to hold dollar Treasuries and buy a 3-year euro forward; the two are equivalent. With a funded ratio of about 97.0%, they need to save about 9,000 dollars more (or accept a slightly smaller apartment budget), rather than close the gap by bearing exchange-rate risk.

**Grading points**

- (a) OK: a forward rate of about 1.1592, a present value of about 309.1 thousand dollars and a funded ratio of about 97.0%. Discounting 300,000 euros converted at the spot rate with the dollar rate needs revision.
- (b) OK: pointing out that the forward premium equals the rate gap, so locking in has no extra cost and the extra dollar interest is no extra gain; that for a euro goal dollar Treasuries carry exchange-rate risk, and the riskless approach is euro riskless assets or dollar Treasuries plus a forward; and that the shortfall should be closed by saving more or adjusting the goal. Saying only that exchange rates may change, without explaining where the forward premium comes from, needs revision.

Numeric answers: fwd = 1.1592, pv = 309.1, fr = 97.0

**Common errors**

- Seeing a forward rate above the spot rate as a cost of locking in the exchange rate, or thinking the higher dollar rate earns extra; not knowing the forward premium is only the interest-rate gap (covered interest parity), and not knowing that for a goal priced in euros, dollar Treasuries are not the riskless asset.
