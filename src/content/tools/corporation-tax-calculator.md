---
title: Corporation Tax Calculator
slug: corporation-tax-calculator
draft: false
category: uk-contractor-tax
target_keyword: corporation tax calculator
search_intent: commercial
seo_title: Corporation Tax Calculator UK | With Marginal Relief
meta_description: Work out your company's corporation tax, including marginal relief between the lower and upper profit limits. Enter your taxable profit for an estimate.
hero_heading: Corporation Tax Calculator
hero_subcopy: Company profit isn't taxed at a single flat rate. This works out your corporation tax including marginal relief, and shows the effective rate you'll actually pay.
quick_answer: Companies pay corporation tax at the small profits rate on profits up to £50,000 and the main rate above £250,000, with marginal relief in between giving an effective rate that rises gradually. Enter your taxable profit to see the tax and your effective rate.
key_takeaways:
  - Profits up to the lower limit are taxed at the small profits rate; above the upper limit at the main rate.
  - Between the two, marginal relief applies, so the effective rate climbs gradually.
  - Associated companies share the profit limits, which can push you into marginal relief sooner.
  - The figure here is corporation tax only — dividend and salary taxes are separate.
inputs:
  - label: Taxable profit
    field_id: profit
    type: currency
    unit: "£"
    required: true
    help_text: Your company's profit after allowable expenses and salaries.
  - label: Number of associated companies
    field_id: associated_companies
    type: number
    required: false
    help_text: Leave at 0 if none. Associated companies share the profit limits.
calculator_id: corporation-tax
assumptions: "Applies the small profits rate up to the lower limit, the main rate above the upper limit, and marginal relief in between. If you enter associated companies, the limits are divided across them. It assumes a standard 12-month accounting period and doesn't handle ring-fence profits, capital allowances timing or group relief."
source_label: HMRC — Corporation Tax rates
source_url: https://www.gov.uk/corporation-tax-rates
faqs:
  - question: What is marginal relief?
    answer: It's a tapering relief for profits between the lower and upper limits. Instead of jumping straight from the small profits rate to the main rate, the effective rate rises gradually across that band.
  - question: How do associated companies affect my corporation tax?
    answer: The profit limits are shared between associated companies. If you have one associated company, each company's limits are halved, which can push you into marginal relief or the main rate at a lower profit.
  - question: Is this my total tax bill?
    answer: No. This is corporation tax on company profit only. If you then take money out as salary or dividends, those have their own personal tax — see the related tools.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - ir35-take-home-calculator
  - umbrella-vs-limited-company-calculator
related_blogs:
  - umbrella-vs-limited-company
author: khurram-nisar
last_reviewed: 2026-06-03
---

## How corporation tax actually works

It's a common surprise that company profit isn't taxed at one flat rate. There's a **small profits rate** on profits up to the lower limit, the **main rate** on profits above the upper limit, and a stretch in between where **marginal relief** applies — so the effective rate climbs gradually rather than jumping. This calculator handles all three and tells you the effective rate you're really paying.

## A worked example

A company with £40,000 of taxable profit sits under the lower limit, so it pays the small profits rate — £7,600 at 19%. A company with £120,000 of profit lands in the marginal-relief band: the main rate applies, reduced by relief, giving roughly £28,050 and an effective rate around 23.4%. Above £250,000, it's simply the main rate. Enter your own profit above to see where you fall.

## The associated companies trap

If you control more than one company, the profit limits are **shared** between them. Two associated companies each get half the limits — so a profit that would have sat comfortably in the small profits rate on its own can be pushed into marginal relief or the main rate. If that applies to you, enter the number of associated companies so the limits are adjusted.

## Where this fits

Corporation tax is only the first step in getting money out of a company. After it's paid, what's left can be drawn as dividends, which carry their own personal tax — that's the mechanism behind the [umbrella vs limited company comparison](/tools/umbrella-vs-limited-company-calculator/) and the [IR35 take-home calculator](/tools/ir35-take-home-calculator/). Together they show the full journey from contract income to money in your pocket.

*General information, not tax advice. Corporation tax has many edge cases — capital allowances, group relief, non-standard accounting periods — so confirm with an accountant. See [HMRC's corporation tax guidance](https://www.gov.uk/corporation-tax-rates).*
