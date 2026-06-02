---
title: Company Car BIK Calculator
slug: company-car-bik-calculator
draft: false
category: uk-contractor-tax
target_keyword: company car tax calculator
search_intent: commercial
seo_title: Company Car Tax (BIK) Calculator | Annual & Monthly Cost
meta_description: Estimate the benefit-in-kind tax on a company car from its P11D value, fuel type, CO2 and your tax band — with annual and monthly figures.
hero_heading: Company Car Tax (BIK) Calculator
hero_subcopy: A company car is a taxable perk. How much you pay depends on the car's value, its emissions and your own tax band — electric cars are taxed far more lightly than petrol or diesel.
quick_answer: Company car tax is your tax band applied to a "benefit-in-kind" figure, which is the car's P11D value multiplied by a percentage set by its emissions. Electric cars currently sit at a very low percentage, which is why they're popular as company cars. Enter the details to estimate yours.
key_takeaways:
  - Company car tax = your tax band applied to the P11D value times an emissions-based percentage.
  - Electric cars sit at a very low benefit-in-kind rate, making them cheap as company cars.
  - Plug-in hybrid bands depend on electric-only range; diesels without RDE2 carry a surcharge.
  - This covers the car benefit only, not any separate private-fuel benefit.
inputs:
  - label: P11D value
    field_id: p11d
    type: currency
    unit: "£"
    required: true
    help_text: Roughly the list price including VAT and delivery, minus first registration fee and road tax.
  - label: Fuel type
    field_id: fuel_type
    type: select
    required: true
    options:
      - { label: Electric, value: electric }
      - { label: Plug-in hybrid, value: hybrid }
      - { label: Petrol, value: petrol }
      - { label: Diesel, value: diesel }
  - label: CO₂ emissions (g/km)
    field_id: co2
    type: number
    unit: g/km
    required: false
    help_text: From the car's specification. Enter 0 for a fully electric car.
  - label: Electric-only range (miles)
    field_id: electric_range
    type: number
    unit: miles
    required: false
    help_text: Plug-in hybrids only — a longer electric range means a lower tax band.
  - label: Your income tax band
    field_id: tax_band
    type: select
    required: true
    options:
      - { label: Basic rate (20%), value: "20" }
      - { label: Higher rate (40%), value: "40" }
      - { label: Additional rate (45%), value: "45" }
calculator_id: company-car-bik
assumptions: This uses a simplified benefit-in-kind band table and applies your chosen tax band to the taxable benefit. It covers the car benefit only, not any separate fuel benefit, and the exact band for a specific car and year should be confirmed. Plug-in hybrid bands depend on electric-only range; diesel cars that don't meet the RDE2 standard carry a surcharge, which is applied here.
source_label: HMRC — tax on company cars
source_url: https://www.gov.uk/tax-company-benefits/tax-on-company-cars
faqs:
  - question: How is company car tax calculated?
    answer: Take the car's P11D value, multiply it by a percentage set by its CO2 emissions (or its electric range, for plug-in hybrids) to get the taxable benefit, then apply your income tax band to that benefit. The result is your annual company car tax.
  - question: Why are electric company cars so much cheaper to run for tax?
    answer: Their benefit-in-kind percentage is currently very low compared with petrol or diesel cars, so the taxable benefit — and the tax on it — is small. That's the main reason electric cars are popular as salary-sacrifice and company cars.
  - question: What's a P11D value?
    answer: Broadly the car's list price including VAT and delivery, but excluding the first registration fee and the first year's road tax. It's the figure the tax is based on, not necessarily what was paid for the car.
  - question: Does this include fuel benefit?
    answer: No. If your employer also pays for private fuel, that's a separate taxable benefit with its own calculation. This tool estimates the car benefit only.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - umbrella-vs-limited-company-calculator
  - cis-tax-refund-calculator
related_blogs:
  - company-car-tax-ev-vs-petrol
  - umbrella-vs-limited-company
author: khurram-nisar
last_reviewed: 2026-06-02
---

## What benefit-in-kind actually means

A company car you can use privately is treated as a perk with a cash value, and you pay income tax on that value. HMRC sets the value as a percentage of the car's **P11D value**, and the percentage is driven by emissions: the cleaner the car, the lower the percentage, the lower the tax. Once you have that taxable benefit, your own tax band decides what you actually pay.

So three things move the number: how expensive the car is, how clean it is, and whether you're a basic, higher or additional-rate taxpayer.

## Why electric cars changed the maths

For years a company car was an expensive perk for higher earners. Electric cars flipped that. Their benefit-in-kind percentage is currently a fraction of a petrol equivalent's, so the taxable benefit is small even on a pricey car. That's why so many people now take an electric car through their employer or via salary sacrifice — the tax cost is modest compared with the equivalent in salary.

## Petrol, diesel and plug-in hybrids

For petrol and diesel cars, the percentage climbs with CO2 emissions, up to a cap. Diesel cars that don't meet the RDE2 emissions standard pick up a surcharge, which this calculator adds. **Plug-in hybrids** are a special case: their band depends on how far they can travel on electric power alone, so a longer electric-only range means a lower tax band. Enter the range for a hybrid to get a realistic figure.

## Company car or cash allowance?

Many employers offer a cash allowance instead of a car. Whether the car or the cash works out better depends heavily on the figures above — a clean electric car is often the better deal, while a higher-emission petrol car can make the cash allowance more attractive. Work out the tax here, then compare it against what you'd keep from the cash alternative after tax.
