# Deployment & Build Safety Rules

## Vercel Deployment Safety
The following experimental Next.js features **MUST REMAIN DISABLED** in `next.config.ts`:
- `dynamicIO`
- `ppr` (Partial Prerendering)
- `useCache`
- `dynamic opengraph-image`

## Build Hygiene
- `ignoreBuildErrors`: Currently set to `true` to prevent agent environment hangs, but should be audited periodically.
- Avoid interactive prompts during the build process.

## Command Execution
- **Sync Commands**: Do NOT run `npm run dev` or interactive build commands synchronously. They will cause the agent to hang.
