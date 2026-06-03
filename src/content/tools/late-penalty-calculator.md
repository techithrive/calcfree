---
title: Late Filing & Late Payment Penalty Calculator
slug: late-penalty-calculator
draft: false
category: uk-contractor-tax
target_keyword: self assessment late filing penalty calculator
search_intent: transactional
seo_title: HMRC Late Filing & Payment Penalty Calculator | Self Assessment
meta_description: Estimate your HMRC Self Assessment penalties for filing or paying late, including the daily penalties, percentage charges and interest.
hero_heading: Late Filing & Late Payment Penalty Calculator
hero_subcopy: Missed the Self Assessment deadline? Penalties stack up the longer you leave it. This estimates what filing and paying late is likely to cost you.
quick_answer: A late Self Assessment return triggers an immediate £100 penalty even if you owe no tax, then £10 a day after three months, and 5% of the tax (or £300) at six and twelve months. Paying late adds 5% of the unpaid tax at 30 days, six months and twelve months, plus interest.
key_takeaways:
  - The £100 filing penalty applies as soon as the return is late, even with no tax owed.
  - After three months, £10-a-day penalties add up to £900 over 90 days.
  - Paying late adds 5% of the unpaid tax at 30 days, six months and twelve months.
  - Interest also accrues on unpaid tax, so the cost keeps growing until you pay.
inputs:
  - label: Tax owed
    field_id: tax_owed
    type: currency
    unit: "£"
    required: true
    help_text: The tax due for the return. Enter 0 if you owe nothing — filing penalties still apply.
  - label: How many months late
    field_id: months_late
    type: number
    unit: months
    required: true
    help_text: Roughly how many months past the deadline you are (or expect to be).
calculator_id: late-penalty
assumptions: "Estimates HMRC Self Assessment penalties: a £100 fixed filing penalty, £10-a-day penalties between 3 and 6 months (capped at 90 days), and the higher of 5% of the tax or £300 at 6 and 12 months. Late-payment penalties of 5% of unpaid tax apply at 30 days, 6 months and 12 months, plus approximate interest. Your exact position can differ, and HMRC may reduce penalties if you have a reasonable excuse."
source_label: GOV.UK — Self Assessment penalties
source_url: https://www.gov.uk/self-assessment-tax-returns/penalties
faqs:
  - question: Do I get a penalty if I owe no tax?
    answer: Yes. The £100 late-filing penalty applies as soon as your return is late, regardless of whether you owe any tax. Filing on time matters even in a year you owe nothing.
  - question: How much are the daily penalties?
    answer: Once your return is more than three months late, HMRC charges £10 a day for up to 90 days — a maximum of £900 — on top of the initial £100.
  - question: Can penalties be cancelled?
    answer: HMRC can cancel or reduce penalties if you have a reasonable excuse, such as a serious illness or bereavement. You appeal and explain the circumstances; routine forgetfulness usually isn't accepted.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - payment-on-account-calculator
  - side-hustle-tax-calculator-uk
related_blogs:
  - side-hustle-tell-hmrc
author: khurram-nisar
last_reviewed: 2026-06-03
---

## How Self Assessment penalties build up

The frustrating thing about HMRC penalties is that they're designed to escalate, so leaving a late return often costs far more than the tax itself. There are two separate streams: penalties for **filing** late and penalties for **paying** late. This tool estimates both, plus the interest that accrues on unpaid tax.

## Filing penalties

These apply **even if you owe no tax**, which catches a lot of people out:

- **£100** the moment the return is late.
- **£10 a day** once you're more than three months late, for up to 90 days — a further £900.
- At **six months** and again at **twelve months**, the higher of **5% of the tax due or £300**.

So a return that's a year late, with no tax owed, can still rack up well over £1,000 in filing penalties alone.

## Payment penalties and interest

Pay the tax late and there's a separate charge: **5% of the unpaid tax** at 30 days, again at six months, and again at twelve months. On top of that, **interest** runs on the unpaid amount the whole time, roughly tracking the Bank of England base rate plus a margin. A £2,000 bill paid seven months late can pick up several hundred pounds in payment penalties and interest. Enter your figures above to see an estimate.

## What to do if you're late

File as soon as you can — every milestone you cross adds more, so stopping the clock matters. If you genuinely couldn't file on time for a serious reason, you can appeal with a reasonable excuse. And going forward, the [payment on account calculator](/tools/payment-on-account-calculator/) and the [side hustle tax guide](/blog/side-hustle-tell-hmrc/) help you see the bill coming so the deadline never sneaks up again.

*General information, not tax advice. Penalty and interest rules change, and HMRC assesses your specific circumstances — check [GOV.UK](https://www.gov.uk/self-assessment-tax-returns/penalties) and appeal if you have a reasonable excuse.*
