# Notes for Agents Working on Sync Logic & Homepage Display

## Research Findings: Next.js & Sanity Integration

Based on an analysis of the Next.js App Router and Sanity-Vercel integration documentation, please keep the following critical points in mind while debugging the Impactshop frontend:

### 1. Custom Sync vs Direct Sync (Shopify)
- **CRITICAL**: In the Shopify "Sanity Connect" app, you **MUST** select **"Custom sync"** instead of "Direct sync".
- **Why**: "Direct sync" creates separate documents for variants and links them as references. The current schema (`product.ts`) and frontend code expect variants to be **inline objects**.
- **The URL**: Set the Custom Sync Function URL to `https://impactshop-kappa.vercel.app/api/sanity-sync-handler`.

### 2. On-Demand Revalidation via Webhooks
To keep the homepage and product displays up-to-date with Sanity data, **do not rely on experimental auto-caching**.
- Use **On-Demand Revalidation** (`revalidatePath` and `revalidateTag`).
- The Sanity Connect "Custom sync" will hit your sync handler, which updates Sanity.
- Then, a **Sanity Webhook** should trigger your Next.js API Route (e.g., `app/api/revalidate/route.ts`).
- Inside that route, call `revalidateTag('products')` or `revalidatePath('/')`.

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

### 4. Agent Execution Warnings
- **CRITICAL**: Do NOT run continuous development servers like `npm run dev` synchronously. Doing so will cause you to hang indefinitely waiting for the command to finish. If the user asks for a dev server to be started, you must instruct them to start it manually in a separate terminal.
- **Build Commands**: When running `npm run build`, be aware that it may trigger interactive prompts (e.g., asking to install `baseline-browser-mapping`). Since agents run commands non-interactively, this can also cause a permanent hang. Work around this by using flags like `--yes` if applicable, or instruct the user to run it.
