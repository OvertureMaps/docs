---
id: index
slug: /schema/
title: Schema Reference
sidebar_label: Overview
description: Pydantic schemas for Overture Maps data
pagination_label: Schema Reference
---

# Overture Maps Schema {#top-level-properties}

:::note
This section has been recently updated to reflect changes in our schema modeling. We welcome your feedback in [GitHub Discussions](https://github.com/OvertureMaps/data/discussions).
:::


The Overture Maps schema defines the structure, properties, and constraints for all features across six themes: addresses, base, buildings, divisions, places, and transportation. The reference pages in this section document the theme-based and shared modules in the schema. 

The schema is authored as [Pydantic](https://docs.pydantic.dev/) models and the reference documentation is generated from those models. The source code lives in the [OvertureMaps/schema](https://github.com/OvertureMaps/schema) repository on GitHub.

## Why Use Pydantic to Define Data Schemas?

This project addresses a fundamental challenge in data consumption: bridging the semantic gap between raw data and human understanding while enabling machine-actionable workflows.

## Why Schema at All: Beyond Raw Data

Take a column like `pop_2020`. Is it total population? Population density per square kilometer? Working-age population? Without a schema, you're left sampling values and guessing from column names.

Compare this to OpenStreetMap's approach: features use well-known key/value pairs like `building=residential` or `addr:housenumber=42` that have semantic meaning and can be looked up on the OSM wiki. This creates a step toward a schema — shared vocabulary with documented semantics used across a vast dataset. However, OSM tags remain free-form: multiple valid ways to express the same concept, no built-in validation, and complex downstream validation because of undocumented keys that might have meaning to someone, somewhere. A schema provides the structured alternative: explicit types, clear validation rules, and semantic meaning that both humans and systems can rely on.

Data files containing only column names and values aren't fully documented. External metadata files typically focus on how data was collected and encoded, not on semantic meaning or validation rules. Data consumers struggle to understand what datasets contain and which columns they need for their goals.

## Why Pydantic Over JSON Schema: Solving Multiple Problems

We initially chose JSON Schema because it aligned with our mental model and promised to solve our problems as we understood them. But JSON Schema surfaced several pain points:

- **Authoring difficulty:** Hard to write correctly, difficult to verify, limited IDE support, no refactoring capabilities
- **Tooling gaps:** Generic tools can't tailor output for specific applications like ours
- **Development friction:** Schema changes required manual coordination across multiple artifacts

Pydantic addresses these systematically: author in Python with full IDE support, generate tailored documentation, and automatically produce the specific artifacts each workflow needs. Pydantic can also produce JSON Schema, so any application that requires it can use it while we gain all the Python benefits during authoring.

## The Result: Faster Understanding, Higher Quality

Instead of spending time deciphering what columns mean and whether data matches expectations, users can focus on their actual goals: analysis, visualization, integration. Quality improves because validation happens automatically rather than through manual inspection.

The fundamental approach — human-readable authoring that generates machine-actionable outputs — has broader applications beyond Overture and geospatial data. We hope others will adapt these patterns for linking with Overture data or modeling their own domains entirely.

## Schema Modules

Browse the schema reference in the sidebar. Modules are organized by theme and shared components:

**Themes:** Addresses, Base, Buildings, Divisions, Places, Transportation

**Shared:** Core (names, sources, cartographic hints), System (country codes, language tags, geometry primitives)