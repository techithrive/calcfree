---
title: Concrete & Gravel Calculator
slug: concrete-gravel-calculator
draft: false
category: home-project-costs
target_keyword: concrete calculator yards
search_intent: transactional
seo_title: Concrete & Gravel Calculator | Cubic Yards, Bags & Cost
meta_description: Work out how much concrete or gravel you need in cubic yards, how many bags, and the rough cost — from your slab length, width and depth.
hero_heading: Concrete & Gravel Calculator
hero_subcopy: Running short mid-pour is every DIYer's nightmare. Enter your slab dimensions to get the volume in cubic yards, the number of bags, and a rough cost — with a waste allowance built in.
quick_answer: Multiply length × width × depth to get the volume, then convert to cubic yards (divide cubic feet by 27). For a 20 ft × 10 ft slab at 4 inches deep you need about 2.6 cubic yards. Always order a little extra — concrete is unforgiving if you run out.
key_takeaways:
  - Volume in cubic yards = length × width × depth (in feet) ÷ 27.
  - A waste allowance is added by default because running short mid-pour is costly.
  - Ready-mix is usually better value for larger pours; bags suit small jobs.
  - Material costs vary widely by region and supplier — treat these as planning figures.
inputs:
  - label: Length
    field_id: length
    type: number
    unit: ft
    required: true
    help_text: Length of the area in feet.
  - label: Width
    field_id: width
    type: number
    unit: ft
    required: true
    help_text: Width of the area in feet.
  - label: Depth
    field_id: depth
    type: number
    unit: inches
    required: true
    help_text: Thickness of the slab in inches (4 inches is common for a patio).
  - label: Material
    field_id: material
    type: select
    required: true
    options:
      - { label: Concrete, value: concrete }
      - { label: Gravel, value: gravel }
  - label: Supply (concrete only)
    field_id: supply
    type: select
    required: false
    options:
      - { label: Ready-mix, value: ready_mix }
      - { label: Bags, value: bags }
  - label: Waste allowance
    field_id: waste
    type: percent
    required: false
    help_text: Extra to order so you don't run short. 5–10% is sensible.
calculator_id: concrete-gravel
assumptions: "Calculates volume from length × width × depth and converts to cubic yards (27 cubic feet per yard). A waste allowance (default 5%) is added. Costs use representative US/Canada figures from an editable data file — ready-mix per cubic yard, bag yield and bag cost, or gravel per cubic yard — and vary a lot by region, supplier and date."
source_label: Measurement basis — cubic yard conversion
faqs:
  - question: How many bags of concrete do I need?
    answer: It depends on the bag size and your volume. The calculator works out the total volume, adds a waste allowance, and divides by the yield per bag. For anything beyond a small job, ready-mix is usually cheaper and easier than mixing many bags.
  - question: Bags or ready-mix?
    answer: Bags suit small jobs like setting a few posts or a tiny pad. For a full slab or driveway, ready-mix delivered by truck is normally better value and far less work — though there's often a minimum order.
  - question: How much extra should I order?
    answer: Around 5–10%. Concrete can't be paused and topped up later the way other materials can, so it's better to have a little spare than to run short during the pour.
enable_faq_schema: true
schema_type: WebApplication
related_tools:
  - fence-cost-calculator
related_blogs: []
author: khurram-nisar
last_reviewed: 2026-06-02
---

## Getting the volume right

The single most useful thing this calculator does is stop you running short. Concrete is unforgiving — once a pour starts, you can't pause it and pop to the merchant for another bag. So it works out your volume, adds a sensible waste allowance, and tells you what to order.

The maths itself is simple: **length × width × depth**, all in feet, gives cubic feet; divide by 27 to get **cubic yards**, which is how concrete and gravel are usually sold. A 20 ft × 10 ft slab at 4 inches deep works out at about 2.6 cubic yards once you add waste.

## Bags or ready-mix?

For small jobs — setting fence posts, a little pad — **bags** you mix yourself are fine. For anything bigger, **ready-mix** delivered by truck is normally cheaper per yard and an enormous amount less effort, though suppliers often have a minimum order. The calculator estimates either, so you can compare.

## A note on cost

The cost figures are representative and **vary a lot** by region, supplier and time of year. Use them to get in the right ballpark, then confirm with a local quote — especially for ready-mix, where delivery and minimum-order charges matter.

## Planning the wider project

If the concrete is for fence posts, the [fence cost calculator](/tools/fence-cost-calculator/) works out the posts, panels and overall cost so the two estimates line up. Measure twice, order once, and give yourself that little bit of spare.

*Planning estimate only. Material costs and yields differ between products and regions — always check the bag or supplier specification and a local quote.*
