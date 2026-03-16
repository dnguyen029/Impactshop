# Notes for Agents Working on Sync Logic & Homepage Display

## Research Findings: Next.js & Sanity Integration

Based on an analysis of the Next.js App Router and Sanity-Vercel integration documentation, please keep the following critical points in mind while debugging the Impactshop frontend:

### 1. On-Demand Revalidation via Webhooks
To keep the homepage and product displays up-to-date with Sanity data, **do not rely on experimental auto-caching**.
- Use **On-Demand Revalidation** (`revalidatePath` and `revalidateTag`).
- When a document updates in Sanity, a webhook should trigger a Next.js API Route (e.g., `app/api/sanity-sync-handler/route.ts` or `app/api/revalidate/route.ts`).
- Inside that route, after validating the payload, call `revalidateTag('products')` or `revalidatePath('/')` so the changes immediately reflect on the frontend.

### 2. Strict Deployment Constraints
The `nextjs-deployment-safety` skill dictates that **the following Next.js experimental features MUST REMAIN DISABLED** in `next.config.ts`, or the Vercel deployments will fail:
- `dynamicIO` (Known to cause build-time failures with the current setup)
- `ppr` (Partial Prerendering)
- `useCache`
- `dynamic opengraph-image`

Please ensure your data fetching uses standard `fetch` with `next: { tags: [...] }` or standard Server Components behaviors, and avoid these experimental flags.

### 3. Environment Variable Consistency
The Vercel-Sanity integration automatically configures `NEXT_PUBLIC_SANITY_PROJECT_ID`.
- Be aware that there are two distinct projects: **Burton** (`u75ob7mf`) and **Impactshop** (`25mbwlje`).
- Verify that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set to the correct Impactshop ID in the environment you are testing in. Cross-contamination here will cause the homepage data to appear missing or misaligned with what you see in the local Studio.
