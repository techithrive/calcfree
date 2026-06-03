---
title: IR35 Take-Home Calculator
slug: ir35-take-home-calculator
draft: false
category: uk-contractor-tax
target_keyword: ir35 take home calculator
search_intent: commercial
seo_title: IR35 Take-Home Calculator | Inside vs Outside Compared
meta_description: See the difference IR35 makes to your take-home pay. Compare your estimated annual take-home inside vs outside IR35 from your day rate.
hero_heading: IR35 Take-Home Calculator
hero_subcopy: An IR35 determination can be worth thousands a year. This compares your estimated take-home pay inside versus outside IR35, so you can see exactly what the decision costs you.
quick_answer: Outside IR35 you can pay yourself a small salary plus dividends, keeping more of your day rate. Inside IR35 you're taxed broadly like an employee and that advantage disappears. On a typical contract the gap runs into thousands of pounds a year.
key_takeaways:
  - Outside IR35 uses a salary-plus-dividends mix; inside IR35 is taxed like PAYE employment.
  - The difference on a single contract is often several thousand pounds a year.
  - Inside IR35, employer NI and the apprenticeship levy effectively come out of your rate.
  - For medium and large clients, the client decides your status, not you.
inputs:
  - label: Day rate
    field_id: day_rate
    type: currency
    unit: "£"
    required: true
    help_text: Your gross daily rate before deductions.
  - label: Days worked per year
    field_id: days_per_year
    type: number
    required: true
    help_text: A realistic full year is around 220–230 billed days after holidays and gaps.
calculator_id: ir35-take-home
assumptions: "The outside-IR35 figure assumes a limited company taking a salary at the personal allowance plus dividends, with no Employment Allowance (typical for a single director). The inside-IR35 figure is modelled like PAYE, where employer National Insurance and the apprenticeship levy come out of the assignment rate before income tax and employee NI. Expenses, pensions and other income aren't included."
source_label: HMRC — off-payroll working (IR35)
source_url: https://www.gov.uk/guidance/understanding-off-payroll-working-ir35
faqs:
  - question: Why does inside IR35 reduce my take-home so much?
    answer: Inside IR35 you lose the ability to take profit as dividends, which avoid National Insurance. You're taxed broadly like an employee, and the assignment rate also has to absorb employer NI and the apprenticeship levy.
  - question: Who decides my IR35 status?
    answer: For medium and large clients, and across the public sector, the client decides and issues a status determination. With small clients, the responsibility generally stays with your own company.
  - question: Does an umbrella change the IR35 position?
    answer: Through an umbrella you're already taxed as an employee via PAYE, so IR35 doesn't change your position. That's why umbrellas are common for inside-IR35 roles.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - umbrella-vs-limited-company-calculator
  - corporation-tax-calculator
related_blogs:
  - ir35-explained
  - umbrella-vs-limited-company
author: khurram-nisar
last_reviewed: 2026-06-03
---

## What this calculator shows

IR35 is the rule that decides whether you're genuinely in business for yourself or really working like an employee. The financial consequence is blunt: **outside IR35** you can pay yourself the tax-efficient way — a modest salary plus dividends — while **inside IR35** you're taxed much like an employee and that efficiency disappears. This tool puts a number on the gap for your specific day rate.

## A worked example

Take a contractor on £450 a day working 220 days — an assignment value of £99,000. Outside IR35, after a small salary, corporation tax and dividend tax, the take-home lands materially higher than inside IR35, where the whole amount runs through PAYE and absorbs employer National Insurance and the apprenticeship levy first. The difference on a contract like that is typically several thousand pounds a year. Put your own rate in above to see your figure.

## Why the gap exists

The advantage outside IR35 comes from **dividends**, which are taxed at lower rates than salary and aren't subject to National Insurance. Inside IR35, you can't use that route, and the assignment rate has to cover the employer's costs before your pay is even calculated. It's the same mechanism that drives the [umbrella vs limited company comparison](/tools/umbrella-vs-limited-company-calculator/) — IR35 status is the hinge the whole decision turns on.

## How to use the result

Treat the difference as the real value of an outside-IR35 determination. If a client offers an inside-IR35 contract at the same rate as an outside one elsewhere, this is the gap you're weighing. If you're unsure which side of the line a contract sits, the [IR35 explainer](/blog/ir35-explained/) walks through the factors — control, substitution and mutuality of obligation — that decide it.

*General information, not tax or legal advice. IR35 is fact-specific and the cost of getting it wrong can be high — take professional advice and check [HMRC's guidance](https://www.gov.uk/guidance/understanding-off-payroll-working-ir35).*
