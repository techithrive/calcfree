---
title: Salary vs Dividend Calculator
slug: salary-vs-dividend-calculator
draft: false
category: uk-contractor-tax
target_keyword: salary vs dividend calculator
search_intent: commercial
seo_title: Salary vs Dividend Calculator 2026/27 | UK Director
meta_description: Compare taking company profit as salary versus a small salary plus dividends for 2026/27. See the take-home difference after the April 2026 dividend rate rise.
hero_heading: Salary vs Dividend Calculator
hero_subcopy: For a single-director company, how should you take money out — all salary, or a small salary plus dividends? Enter the profit you want to extract and see which leaves more in your pocket this tax year.
quick_answer: For most single-director companies in 2026/27, a small salary at the personal allowance plus dividends still beats taking everything as salary — but the April 2026 dividend rate rise has narrowed the gap. Enter your company profit to see the take-home for each route side by side.
key_takeaways:
  - A low salary plus dividends usually still wins for a single director, but by less than before April 2026.
  - The dividend route pays corporation tax first, then dividend tax — the calculator nets both off.
  - An all-salary approach avoids corporation tax but pays income tax plus employee and employer NI.
  - This assumes no Employment Allowance (typical for a sole director) — a second employee can change the answer.
inputs:
  - label: Company profit to take out
    field_id: profit
    type: currency
    unit: "£"
    required: true
    help_text: Profit available before any salary, corporation tax or dividends — what you want to extract this year.
calculator_id: salary-vs-dividend
assumptions: "Compares (A) taking the whole amount as salary, against (B) a salary at the personal allowance plus dividends paid from profit after 19% small-profits corporation tax. Uses 2026/27 rates including the higher dividend rates. It assumes a single director with no Employment Allowance, no other income, England/Wales/NI thresholds (not Scottish bands), and ignores pensions, benefits and the corporation tax marginal band above £50,000."
source_label: GOV.UK — Running a limited company
source_url: https://www.gov.uk/running-a-limited-company
faqs:
  - question: Is salary or dividends better in 2026/27?
    answer: For a typical single-director company, a small salary at the personal allowance plus dividends usually still leaves more take-home than an all-salary approach. But the April 2026 dividend rate rise narrowed the advantage, so it's worth re-running your own numbers rather than assuming last year's plan still wins.
  - question: Why does the dividend route pay corporation tax?
    answer: Dividends are paid from company profit after corporation tax, so that tax comes off first. Salary, by contrast, is a deductible expense for the company but is then subject to income tax and National Insurance in your hands. The calculator accounts for both paths.
  - question: Does this include the Employment Allowance?
    answer: No. A single-director company with no other employees generally can't claim the Employment Allowance, so the calculator leaves it out. If your company has another employee on the payroll, your employer NI position changes and the comparison can shift.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - dividend-tax-calculator
  - corporation-tax-calculator
  - umbrella-vs-limited-company-calculator
related_blogs:
  - umbrella-vs-limited-company
author: khurram-nisar
last_reviewed: 2026-06-03
---

## The decision, in plain terms

If you run your own limited company, the money it makes isn't automatically yours — you have to take it out, and *how* you take it changes the tax. The two main routes are salary (a wage the company pays you) and dividends (a share of profit after corporation tax). For years the standard advice for a single director was the same: take a small salary up to the personal allowance, then top up with dividends. The April 2026 dividend rate rise didn't kill that advice, but it did make it a closer call than it used to be.

## Why the small-salary-plus-dividends route usually wins

A salary is a business expense, so it reduces the company's corporation tax bill. But in your hands it's hit by income tax *and* two layers of National Insurance — yours and the company's. Dividends skip National Insurance entirely. They do come out of post-corporation-tax profit, so the company pays 19% (at small-profit levels) first, but even after that the combined hit is often lower than the salary route. That's the whole reason directors structure their pay this way.

The calculator above models both paths for the profit you enter: the all-salary take-home, and the small-salary-plus-dividends take-home after corporation tax and the 2026/27 dividend rates. The difference is the number that actually matters.

## A worked example

Say your company has £60,000 of profit to extract. Taken entirely as salary, after income tax and employee and employer NI you keep roughly £41,200. Taken as a £12,570 salary plus dividends from the remaining profit (after corporation tax), you keep roughly £46,100 — about £4,900 more. That gap was wider before April 2026, which is exactly why it's worth checking rather than assuming.

## The mistakes that cost people money

The big one is paying dividends the company can't legally support. **Dividends can only come from distributable profit** — if you take more than the company has made after tax, HMRC can treat it as a director's loan, which carries its own tax charge. Another is forgetting the dividend tax sits on top of your salary, so a higher salary pushes more of your dividends into the 35.75% band. And a third is ignoring pensions: a company pension contribution can be more efficient than either salary or dividends for money you don't need right now.

For the dividend tax side of this in detail, use the [dividend tax calculator](/tools/dividend-tax-calculator/); for the company's own bill, the [corporation tax calculator](/tools/corporation-tax-calculator/); and for the bigger employment-structure question, the [umbrella vs limited company guide](/blog/umbrella-vs-limited-company/).

*General information, not personalised tax advice. Director remuneration interacts with pensions, other income and your company's specific position — confirm with an accountant and see [GOV.UK](https://www.gov.uk/running-a-limited-company).*
