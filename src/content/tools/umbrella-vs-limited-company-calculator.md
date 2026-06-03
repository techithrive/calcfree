---
title: Umbrella vs Limited Company Calculator
slug: umbrella-vs-limited-company-calculator
draft: false
category: uk-contractor-tax
target_keyword: umbrella vs limited company calculator
search_intent: commercial
seo_title: Umbrella vs Limited Company Calculator | Take-Home Compared
meta_description: Compare your estimated take-home pay through an umbrella company versus your own limited company, based on your day rate and days worked.
hero_heading: Umbrella vs Limited Company Calculator
hero_subcopy: Two contractors on the same day rate can end up with very different take-home pay depending on how they're set up. This compares the two routes side by side.
quick_answer: Outside IR35, a limited company usually leaves you with more take-home than an umbrella because profit can be taken as dividends. Inside IR35, the gap largely disappears. Enter your day rate to see an estimate for your situation.
key_takeaways:
  - Outside IR35, a limited company usually keeps more of your day rate than an umbrella.
  - Inside IR35, the dividend advantage largely disappears and the two routes converge.
  - With an umbrella, employer NI and the apprenticeship levy come out of your assignment rate.
  - Billed days matter more than the headline day rate — be realistic about a full year.
inputs:
  - label: Day rate
    field_id: day_rate
    type: currency
    unit: "£"
    required: true
    help_text: Your gross daily rate before any deductions.
  - label: Days worked per year
    field_id: days_per_year
    type: number
    required: true
    help_text: A typical full year is around 220–230 working days after holidays.
  - label: Umbrella margin (per week)
    field_id: umbrella_margin_weekly
    type: currency
    unit: "£"
    required: false
    help_text: The umbrella's own fee, usually £15–£30 a week. Leave blank to assume £25.
  - label: This contract is inside IR35
    field_id: inside_ir35
    type: toggle
    unit: "Inside IR35"
    required: false
    help_text: Tick if the engagement has been assessed as inside IR35.
calculator_id: umbrella-vs-limited-company
assumptions: The limited-company figure assumes you are outside IR35, take a salary at the personal allowance with the rest as dividends, and can't claim the Employment Allowance (the usual position for a single director). The umbrella figure deducts the umbrella margin, employer National Insurance and the apprenticeship levy from your rate before income tax and employee NI. Pension contributions, expenses and any other personal income aren't included. It's a planning estimate, not a payslip.
source_label: HMRC — off-payroll working (IR35)
source_url: https://www.gov.uk/guidance/understanding-off-payroll-working-ir35
faqs:
  - question: Is an umbrella or a limited company better for me?
    answer: It depends mostly on IR35 status and how long you'll contract. Outside IR35 and contracting for a while, a limited company usually keeps more of your money. Inside IR35, or for a short stint where you want zero admin, an umbrella is often the simpler and similarly-priced choice.
  - question: Why does employer National Insurance come out of my umbrella pay?
    answer: When you work through an umbrella, the rate the agency pays is an assignment rate that has to cover the employer's costs too. So employer NI and the apprenticeship levy are taken from that rate before your salary is worked out. It feels like you're paying it because, in effect, you are.
  - question: What is the umbrella margin?
    answer: It's the umbrella company's own fee for running your payroll, usually a fixed amount per week or month. It's separate from tax, and it's worth comparing because it varies between providers.
  - question: Does IR35 really change the numbers this much?
    answer: Yes. Outside IR35 you can pay yourself in a tax-efficient salary-plus-dividends mix. Inside IR35 that route is effectively closed, so a limited company gives little advantage over an umbrella.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - cis-tax-refund-calculator
  - side-hustle-tax-calculator-uk
  - company-car-bik-calculator
related_blogs:
  - umbrella-vs-limited-company
  - ir35-explained
author: khurram-nisar
last_reviewed: 2026-06-03
---

## The two ways contractors get paid

If you contract in the UK, you're usually paid one of two ways. Through an **umbrella company**, you become their employee: they receive your assignment rate, take out the employer's costs and their margin, run PAYE, and pay you a net salary. Through your own **limited company**, you invoice clients, pay corporation tax on the profit, and take money out as a mix of salary and dividends.

The reason the take-home can differ so much is tax treatment. Dividends are taxed at lower rates than salary and aren't subject to National Insurance, so — when you're allowed to use that route — a limited company can leave more in your pocket. The catch is IR35.

## Where IR35 fits in

IR35 is the rule that decides whether you're genuinely in business on your own account or really working like an employee. If a contract is judged **inside IR35**, you're taxed much like an employee regardless of your company, and the dividend advantage largely vanishes. **Outside IR35**, the limited-company route is open and usually more efficient. This calculator models the limited-company side as an outside-IR35 arrangement and flags it clearly if you tick the inside-IR35 box.

## When the umbrella actually wins

It's not always about the headline take-home. An umbrella means no company accounts, no corporation tax return, no separate business bank account and no responsibility for getting the tax-efficiency right. For a short contract, a first contract, or anyone who values simplicity, that can be worth the smaller difference in pay. The numbers above show the gap; only you can weigh it against the admin.

## A note on being realistic about days

The single biggest swing in these figures is how many days you actually bill. A day rate looks great until you subtract holidays, gaps between contracts and the odd quiet spell. If you're comparing a contract against a permanent salary, use a realistic billed-days figure rather than a full 260-day year.
