# Agent Context & Token Management Skill

This skill provides mandatory instructions for agents to maintain project memory and token efficiency within the Impactshop repository.

## Rule: Conserve Context
Before performing extensive file reads or directory listings, consult the `/knowledge-base` directory.
- Use `architecture.md` for project IDs and tech stack.
- Use `sync-logic.md` for Shopify/Sanity integration details.
- Use `deployment-rules.md` for build safety constraints.

## Rule: Manager Agent Orchestration
For complex bug resolution or architectural shifts, call `scripts/manager-agent.ts` first.
1. Formulate your current issue or goal as a string.
2. Call the Manager Agent flow to receive a high-level strategic checklist.
3. Follow the checklist to minimize trial-and-error edits.

## Rule: Persistence via Artifacts
To ensure the "next" agent knows exactly what you did:
- **Save Summaries**: Add a concise entry to `knowledge-base/mission-log.md` detailing what was accomplished.
- **Save Artifacts**: Copy mission-critical artifacts (`implementation_plan.md`, `walkthrough.md`, `analysis_results.md`) into a designated subfolder or reference them in the KB.

## Rule: Non-Interactive Execution
- Do not run continuous dev servers (`npm run dev`) synchronously.
- Use `-y` or `--yes` flags for all CLI commands where possible.
