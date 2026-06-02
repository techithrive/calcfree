---
title: CIS Tax Refund Calculator
slug: cis-tax-refund-calculator
draft: false
category: uk-contractor-tax
target_keyword: cis tax refund calculator
search_intent: transactional
seo_title: CIS Tax Refund Calculator | Estimate Your Rebate
meta_description: Work out roughly how much CIS tax you might get back. Enter your earnings, expenses and the tax already deducted to see an estimated refund.
hero_heading: CIS Tax Refund Calculator
hero_subcopy: If you work under the Construction Industry Scheme, your contractor takes tax off before you're paid — and most subcontractors have paid too much. This works out a rough estimate of what you might be owed.
quick_answer: Most CIS subcontractors are owed a refund because tax is deducted at 20% from their gross pay before expenses are taken into account. Enter your figures below to see an estimate.
key_takeaways:
  - Most CIS subcontractors overpay tax because deductions ignore expenses and the personal allowance.
  - Your refund is roughly the CIS tax deducted minus the income tax and Class 4 NI actually due on your profit.
  - You can usually claim back up to four tax years through Self Assessment.
  - Allowable expenses (tools, mileage, insurance, PPE) increase your refund.
inputs:
  - label: Total gross earnings
    field_id: gross
    type: currency
    unit: "£"
    required: true
    help_text: Your total income for the year before any CIS deduction.
  - label: Allowable expenses
    field_id: expenses
    type: currency
    unit: "£"
    required: false
    help_text: Tools, materials you paid for, mileage, public liability insurance, protective gear and so on.
  - label: CIS tax already deducted
    field_id: cis_deducted
    type: currency
    unit: "£"
    required: true
    help_text: The total shown on your CIS statements (usually 20% of your labour).
calculator_id: cis-tax-refund
assumptions: This estimate treats your CIS work as your only self-employed income for the year, applies the standard personal allowance, income tax bands and Class 4 National Insurance, and assumes Class 2 NI is covered by credit. It does not handle student loans, other income, or anything unusual in your tax code. Always check the result against your own records and HMRC.
source_label: HMRC — Construction Industry Scheme
source_url: https://www.gov.uk/what-is-the-construction-industry-scheme
faqs:
  - question: Why do CIS subcontractors usually get a refund?
    answer: Your contractor deducts tax from your gross pay before your expenses are taken off, and the deduction doesn't take your personal allowance into account. Once your real costs and allowance are applied, the tax actually due is often lower than what was deducted — so the difference comes back.
  - question: How far back can I claim a CIS refund?
    answer: You can usually go back up to four tax years. The sooner you file, though, the sooner you're paid and the easier it is to find your records.
  - question: Do I need an accountant to claim?
    answer: No. You claim through your Self Assessment tax return. An accountant can help if your situation is complicated or you'd rather not deal with it yourself, but plenty of subcontractors file their own.
  - question: What records do I need?
    answer: Your CIS payment and deduction statements, invoices, and receipts for the expenses you want to claim. Keep them for at least the period HMRC can ask about.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - umbrella-vs-limited-company-calculator
  - side-hustle-tax-calculator-uk
related_blogs:
  - cis-deductions-explained
  - cis-allowable-expenses
author: khurram-nisar
last_reviewed: 2026-06-02
---

## How the refund is worked out

Under the Construction Industry Scheme, contractors take tax off your labour before they pay you — usually 20% if you're registered, or 30% if you're not. That deduction is a rough advance payment of your tax bill. The problem is it's taken from your gross pay, before any of your costs are considered, and it ignores your tax-free personal allowance. By the end of the year, the tax you actually owe is often a fair bit lower.

This calculator takes your gross earnings, subtracts the expenses you can claim, and works out the income tax and Class 4 National Insurance due on what's left. It then compares that to the CIS tax already taken off your pay. If you've overpaid, the difference is your estimated refund.

## A quick worked example

Say you earned £32,000 over the year and had £6,000 of CIS tax deducted. You spent £3,000 on tools, van fuel and insurance. Your taxable profit is £29,000. After the personal allowance, the income tax and Class 4 NI on that come to well under the £6,000 already taken — so you'd be looking at a meaningful refund. Change the numbers above to match your own situation.

## What counts as an allowable expense

The honest rule of thumb is: costs you had to pay to do the work. For most subcontractors that means tools and equipment, materials you bought yourself, mileage or van running costs, public liability insurance, protective clothing and safety gear, and a reasonable share of phone and admin costs. Personal spending doesn't count, and if something is used for both work and personal life you can only claim the work share.

## Claiming the refund

The refund comes through your Self Assessment tax return. You report your income, your CIS deductions and your expenses, and HMRC works out the balance. If you've overpaid, they refund it — often within a few weeks of filing, once any checks are done. Keep your CIS statements and receipts safe; they're what back up the claim.
