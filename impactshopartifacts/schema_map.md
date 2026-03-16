# Proposed Sanity Schema Map

This map shows the current vs proposed schema structure to optimize for Integrated Visual Editing.

| Document Type | Current Structure | Proposed Structure | Optimization Reason |
| :--- | :--- | :--- | :--- |
| **Homepage** | Flat fields (hero, tiles) | Section-based array | Better modularly; sections can be individually reordered and edited in Visual Editing. |
| **Page** | Simple body (blocks) | Modular body (blocks + custom objects) | Allows for mixing rich text with structured components like Hero or Gallery. |
| **Product** | Shopify synced `store` + `details` | Enhanced `store` + meta fields | Ensure `stega` is enabled for `details` while maintaining `store` as read-only. |
| **Settings** | Flat settings | Categorized settings (SEO, Navigation, Global) | Cleaner UI in Studio; better field grouping. |

## New Reusable Objects
- **CTA**: Shared across Hero and Tiles.
- **Hero**: Shared across Homepage and landing pages.
- **Link**: For flexible internal/external navigation.

## Revalidation Tags
- `_type` (e.g., `product`, `homepage`)
- `_type:slug` (e.g., `product:snowboard`)
- `global:settings` (for site-wide changes)
