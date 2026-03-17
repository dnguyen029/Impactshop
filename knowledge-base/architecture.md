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
- **Product Pages**: Static (SSG) using `generateStaticParams`.
- **Invalidation**: On-demand revalidation via tags (`product:${slug}`).
- **Revalidation Route**: `app/api/revalidate/route.ts`
