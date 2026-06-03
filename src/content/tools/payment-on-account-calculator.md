---
title: Payment on Account Calculator
slug: payment-on-account-calculator
draft: false
category: uk-contractor-tax
target_keyword: payment on account calculator
search_intent: transactional
seo_title: Self Assessment Payment on Account Calculator | January & July
meta_description: Work out your Self Assessment payments on account — what's due on 31 January and 31 July, and whether they apply to you at all.
hero_heading: Payment on Account Calculator
hero_subcopy: That bigger-than-expected January bill is usually payments on account. This works out what you'll owe in January and July, and whether they apply to you in the first place.
quick_answer: If your Self Assessment bill (income tax plus Class 4 NI, after tax collected at source) is over £1,000, HMRC asks for two advance payments of 50% each — one on 31 January, one on 31 July. The January total also includes any balancing payment for the year just ended.
key_takeaways:
  - Each payment on account is 50% of last year's net self-assessment liability.
  - They're due on 31 January and 31 July.
  - They don't apply if your net bill was £1,000 or less, or if over 80% of your tax was collected at source.
  - The 31 January total includes your first payment on account plus any balancing payment.
inputs:
  - label: Last year's Self Assessment bill
    field_id: last_bill
    type: currency
    unit: "£"
    required: true
    help_text: Income tax plus Class 4 NI from your SA302 (exclude capital gains and student loan).
  - label: Tax already collected at source
    field_id: tax_at_source
    type: currency
    unit: "£"
    required: false
    help_text: For example, tax taken through PAYE if you're also employed. Leave blank if none.
  - label: Balancing payment due (if known)
    field_id: balancing_payment
    type: currency
    unit: "£"
    required: false
    help_text: Any remaining tax for the year just ended, due on the same 31 January.
calculator_id: payment-on-account
assumptions: "Each payment on account is half of your net self-assessment liability (income tax plus Class 4 NI, less tax collected at source). Payments on account don't apply if that net figure is £1,000 or less, or if more than 80% of your tax was collected at source. Capital gains and student loan repayments aren't included in the payment-on-account calculation."
source_label: GOV.UK — Payments on account
source_url: https://www.gov.uk/understand-self-assessment-bill/payments-on-account
faqs:
  - question: Why is my January tax bill so much bigger than I expected?
    answer: Almost always because of payments on account. Your first year in Self Assessment can hit especially hard, because you pay the balancing amount for the year just ended plus a 50% advance towards the next year, all on 31 January.
  - question: When do payments on account not apply?
    answer: If your net Self Assessment bill was £1,000 or less, or if more than 80% of your tax was already collected at source (for example through PAYE), you don't make payments on account.
  - question: Can I reduce my payments on account?
    answer: Yes, if you expect your income to fall, you can apply to reduce them. But if you reduce them too far and end up owing more, HMRC charges interest on the shortfall.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - late-penalty-calculator
  - side-hustle-tax-calculator-uk
related_blogs:
  - side-hustle-tell-hmrc
author: khurram-nisar
last_reviewed: 2026-06-03
---

## The mystery January bill, explained

If your first Self Assessment bill was far bigger than the tax you thought you owed, **payments on account** are almost certainly why. They're HMRC's way of collecting tax in advance — a bit like how PAYE takes tax from an employee every month — by asking the self-employed to pre-pay next year's bill in two instalments.

## How they're worked out

Each payment on account is **half of your net self-assessment liability** from the previous year — that's your income tax plus Class 4 National Insurance, after any tax already collected at source. One payment falls on **31 January**, the other on **31 July**.

The sting in the first year is the timing. On 31 January you pay the **balancing payment** for the year just ended *and* your **first payment on account** for the next year — so it can feel like paying one and a half years' tax at once. Enter your figures above to see the January and July amounts separately.

## When they don't apply

You're off the hook for payments on account if your **net bill was £1,000 or less**, or if **more than 80%** of your tax was collected at source (common if you're also employed and only have a small amount of self-employed income). The calculator checks both conditions and tells you if none are due.

## Plan for it

The fix is boring but effective: set money aside as you earn. If you know roughly what to expect — and the [side hustle tax guide](/blog/side-hustle-tell-hmrc/) and [side hustle calculator](/tools/side-hustle-tax-calculator-uk/) can help you estimate the underlying bill — the January deadline stops being a shock. And if you do miss it, the [late filing and payment penalty calculator](/tools/late-penalty-calculator/) shows what that costs.

*General information, not tax advice. Your Self Assessment statement shows your actual payments on account — check it against this estimate, and see [GOV.UK](https://www.gov.uk/understand-self-assessment-bill/payments-on-account).*
