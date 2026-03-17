# Shopify & Sanity Sync Logic

## Data Fetching Strategy
- **Products/Collections**: Primary fetching for storefront pages (e.g., `/snowboards`) is handled **directly via Shopify Storefront API** (`lib/shopify`).
- **Sanity**: Used as a secondary data source for landing pages, marketing content, and metadata.

## Custom Sync (Sanity-Sync-Handler)
- **Mode**: Custom sync (NOT Direct sync).
- **Handler URL**: `https://impactshop-kappa.vercel.app/api/sanity-sync-handler`
- **Secret**: Uses `SHOPIFY_REVALIDATION_SECRET` (supports `testertester` for manual verification).

## Data Integrity & Visibility
- **Filtering**: Direct Shopify fetches respect the "headless" sales channel settings.
- **Mock Data**: Sanity may still contain "Arch and Grain" mock products; storefront pages bypass these by fetching from Shopify.
