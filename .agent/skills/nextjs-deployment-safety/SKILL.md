# Next.js Deployment Safety Skill

This skill outlines critical deployment constraints for the Impact Snowboards project to ensure successful builds on Vercel.

## Disabled Experimental Features
To ensure successful production deployments, the following Next.js experimental features **MUST** remain disabled in `next.config.ts`:

- `dynamicIO`: Do not enable. It causes build-time failures with the current Sanity/Shopify integration.
- `ppr` (Partial Prerendering): Do not enable.
- `useCache`: Do not enable. 
- `dynamic opengraph-image`: Do not attempt dynamic generation of OG images using these experimental flags.

### Rule: Strict next.config.ts Audit
Before every production push, verify that `experimental` flags in `next.config.ts` do not include the features listed above.

## Vercel Deployment Sync
- **Deployment URL**: `https://impactshop-kappa.vercel.app`
- **Environment Variables**: Managed via Vercel CLI. Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is always local to `25mbwlje`.
