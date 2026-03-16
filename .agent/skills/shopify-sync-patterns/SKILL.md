# Shopify to Sanity Sync Pattern Skill

This skill documents the pattern for pushing Shopify data into Sanity via the `sanity-sync-handler`.

## Data Mapping Strategy
We use a custom sync handler to transform Shopify webhooks into Sanity documents.

- **Document Type**: `product`
- **ID Format**: `shopifyProduct-{SHOPIFY_ID}`
- **Nesting**: All Shopify-fetched data is nested under a `store` object to keep it separate from Sanity-only fields.

### Rule: Synchronize Variants
Shopify variants must be transformed into `shopifyProductVariant` objects within the `store.variants` array.
- Use `extractIdFromGid` to convert `gid://shopify/ProductVariant/123` to `123`.
- Map `availableForSale` to `inventory.isAvailable`.

### Rule: Transactional Draft Handling
When updating a product, always check if a draft exists (`drafts.shopifyProduct-{ID}`).
- If a draft exists, update the draft as well to ensure the Studio preview stays in sync.
- Use a single Sanity transaction to commit both published and draft updates.

## Webhook Revalidation
While `next-sanity/live` (via `defineLive`) handles most viewing real-time updates, the sync handler is responsible for ensuring the data reaches Sanity correctly.

### Rule: Validation
Always check `SANITY_API_WRITE_TOKEN` and verify the webhook signature before processing requests.

## Coalesce Strategy
Front-end queries should always use `coalesce` to handle potential data variations between syncs or manual imports:
```groq
"handle": coalesce(store.slug.current, slug.current, handle)
```
