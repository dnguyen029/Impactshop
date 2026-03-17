# Architecture & Tech Stack

## Core Technologies
- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity Studio
- **E-commerce**: Shopify
- **Styling**: Tailwind CSS & Styled Components (Target: Consolidate to Tailwind)

## Project IDs & Configuration
| Service | Project ID / Key | Notes |
| :--- | :--- | :--- |
| **Impactshop Sanity** | `25mbwlje` | Primary Project |
| **Burton Sanity** | `u75ob7mf` | Legacy / Reference |
| **Shopify Store** | Impactshop | |

## Rendering Strategy
- **Storefront Pages**: Dynamic fetching directly from **Shopify Storefront API** (e.g., `/snowboards`).
- **Product Details**: Real-time fetching from Shopify to ensure pricing and inventory accuracy.
- **Marketing Content**: Static (SSG) with on-demand revalidation from **Sanity**.
- **Revalidation Routes**: 
  - `app/api/revalidate/route.ts` (Sanity & Shopify Revalidation)
  - `app/api/sanity-sync-handler/route.ts` (Shopify to Sanity Sync)
