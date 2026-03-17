# Shopify & Sanity Sync Logic

## Custom Sync (Sanity Connect)
- **Mode**: **Custom sync** (NOT Direct sync).
- **Reason**: Direct sync splits variants into separate documents; the frontend expects inline objects.
- **Handler URL**: `https://impactshop-kappa.vercel.app/api/sanity-sync-handler`

## Data Integrity & Visibility
- **Filtering**: All product queries MUST check `store.status == "active"`.
- **Status Types**: `active`, `draft`, `archived`. Unpublished products in Shopify remain in Sanity but change status.

## On-Demand Revalidation Webhook
- **URL**: `/api/revalidate`
- **GROQ Projection**:
  ```groq
  {
    _type,
    "slug": coalesce(store.slug.current, slug.current)
  }
  ```
- **Filter**: Empty (triggers on all document types).
