# Sanity Best Practices Skill

This skill provides instructions for AI agents working on the Impact Snowboards project to ensure consistency with the established Sanity and Shopify integration patterns.

## Homepage Schema (Modular Builder)
The homepage uses a modular `home` document type with a `sections` array. 
- **Document ID**: `home`
- **Schema Type**: `home`
- **Supported Sections**: 
    - `hero`: Custom branding, eyebrow, and dual CTAs.
    - `productGrid`: Renders the Shopify product list.
    - `collectionGrid`: Renders a Bento-style collection grid.
    - `featureSection`: Stylized content block (e.g., "Designed in Vermont").

### Rule: Always use the `home` document
Do not create a `homepage` or `settings` document for the main landing page. Use the singleton `home` document.

## Shopify Data Structure
The Shopify Sanity Connect plugin nests data under a `store` object.
- **Product Title**: `store.title`
- **Slug**: `store.slug.current`
- **Handle**: `store.slug.current` (mapped to `handle` in GROQ)
- **Price**: Found under `store.priceRange.minVariantPrice` (as a number).

### Rule: Use Coalesce for Migration Safety
When querying products, always coalesce between `store` fields and top-level fields to handle both Sanity Connect and legacy CSV data:
```groq
"title": coalesce(store.title, title, "Untitled Product"),
"handle": coalesce(store.slug.current, slug.current, handle)
```

## CTA / Button Naming
- **Field Name**: `title` (not `text`).
- **Reason**: The existing dataset uses `title` for button labels. Renaming it in the schema avoids "Unknown field" warnings in the Studio.

## Product Visibility
If products disappear from the homepage, verify that the `Product Grid` section is explicitly added to the `sections` array in the `home` document.

## Revalidation Strategy
While `next-sanity/live` is used for real-time updates, we also implement **On-Demand Revalidation** to ensure consistency across the edge.
- **Webhook Pattern**: A webhook should trigger `app/api/revalidate/route.ts`.
- **Manual Triggers**: Use `revalidateTag('products')` or `revalidateTag('home')` to force updates.
- **Cache Tags**: Always fetch with appropriate tags (e.g., `['product']`, `['home']`).

## Data Integrity (Shopify Sync)
- **Field Rule**: Always mark the `store` object as `readOnly: true` in the schema.
- **Reason**: This prevents users from accidentally editing Shopify-synced data in the Studio, which would be overwritten during the next sync cycle. Local overrides (like manual descriptions) should be added as separate fields (e.g., the `details` field in `product.ts`).
