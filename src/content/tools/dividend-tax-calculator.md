---
title: Dividend Tax Calculator
slug: dividend-tax-calculator
draft: false
category: uk-contractor-tax
target_keyword: dividend tax calculator
search_intent: commercial
seo_title: Dividend Tax Calculator 2026/27 | UK
meta_description: Work out the tax on your dividends for 2026/27 using the new higher rates. Enter your dividends and other income to see the tax and your take-home.
hero_heading: Dividend Tax Calculator
hero_subcopy: Dividend tax rates went up in April 2026, so a strategy that worked last year might cost you more now. Enter your figures to see what you'll actually pay this tax year.
quick_answer: For 2026/27 the dividend tax rates are 10.75% (basic), 35.75% (higher) and 39.35% (additional), after a £500 tax-free allowance. Dividends stack on top of your other income, so your salary decides which band they fall into. Both the basic and higher rates rose by 2 points from April 2026.
key_takeaways:
  - 2026/27 dividend rates are 10.75% basic, 35.75% higher, 39.35% additional.
  - The first £500 of dividends is tax-free; so is anything covered by your personal allowance.
  - Dividends are taxed on top of your other income, so salary determines the band.
  - The April 2026 rise means many directors pay more than in 2025/26 for the same dividends.
inputs:
  - label: Dividend income
    field_id: dividends
    type: currency
    unit: "£"
    required: true
    help_text: Total dividends you'll receive this tax year.
  - label: Other income (salary, etc.)
    field_id: other_income
    type: currency
    unit: "£"
    required: false
    help_text: Salary or other income that uses your bands first. Leave blank if none.
calculator_id: dividend-tax
assumptions: "Uses the 2026/27 dividend rates and the £500 dividend allowance, with dividends taxed on top of your other income (which is assumed to use the personal allowance and bands first). It applies England/Wales/NI thresholds and doesn't model Scottish income tax bands, the personal savings allowance, or personal allowance taper interactions beyond the standard reduction."
source_label: GOV.UK — Tax on dividends
source_url: https://www.gov.uk/tax-on-dividends
faqs:
  - question: What are the dividend tax rates for 2026/27?
    answer: 10.75% if the dividends fall in the basic-rate band, 35.75% in the higher-rate band, and 39.35% in the additional-rate band. The basic and higher rates rose by 2 percentage points from 6 April 2026; the additional rate is unchanged.
  - question: How much can I take in dividends tax-free?
    answer: The first £500 of dividends each year is covered by the dividend allowance and taxed at 0%. On top of that, any dividends that fall within your unused personal allowance (up to £12,570) are also tax-free.
  - question: Why did my dividend tax go up this year?
    answer: From 6 April 2026 the basic and higher dividend rates increased by 2 points. If your dividends are the same as last year, you'll pay more — roughly £20 more per £1,000 of dividends in the basic and higher bands.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - salary-vs-dividend-calculator
  - corporation-tax-calculator
  - umbrella-vs-limited-company-calculator
related_blogs:
  - umbrella-vs-limited-company
author: khurram-nisar
last_reviewed: 2026-06-03
---

## What changed in April 2026

If you take dividends from your own company, the most important thing to know about this tax year is simple: **the rates went up**. From 6 April 2026 the basic dividend rate rose from 8.75% to **10.75%**, and the higher rate from 33.75% to **35.75%**. The additional rate stayed at 39.35%. The £500 tax-free allowance is unchanged.

That sounds small, but it adds up. For every £1,000 of dividends in the basic or higher band, you now pay about £20 more than you did last year. A director taking £30,000 of dividends can easily be several hundred pounds worse off for doing exactly what they did in 2025/26.

## How dividends are actually taxed

The part people get wrong is thinking dividends have their own separate allowance ladder. They don't. **Dividends sit on top of your other income.** Your salary and any other earnings use up your personal allowance and basic-rate band first; the dividends then fall into whatever band is left.

So a director on a £12,570 salary has their whole basic-rate band (up to £50,270) available for dividends at 10.75%. Someone already earning £45,000 from a job has very little basic-rate room left, so most of their dividends are taxed at 35.75%. Enter both figures above and the calculator works out the split for you.

## A worked example

Take a £12,570 salary plus £30,000 of dividends. The first £500 of dividends is tax-free, and the remaining £29,500 all fits inside the basic-rate band, taxed at 10.75% — about £3,171. Last year that same £29,500 would have been taxed at 8.75%, roughly £2,581. Same dividends, nearly £600 more tax. That's the April 2026 change in a nutshell.

## What to do about it

There's no clever trick that makes the rise disappear, but a few things genuinely help: making sure you're using the full £500 allowance and your personal allowance, considering whether a pension contribution from the company makes sense, and — if you're weighing salary against dividends — re-running the numbers, because the gap between the two has narrowed. The [salary vs dividend calculator](/tools/salary-vs-dividend-calculator/) does exactly that comparison, and the [umbrella vs limited company guide](/blog/umbrella-vs-limited-company/) covers the bigger structural decision.

*General information, not tax advice. Dividend taxation interacts with your wider income — confirm your position with an accountant and see [GOV.UK](https://www.gov.uk/tax-on-dividends).*
