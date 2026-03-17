# Agent Operational Standards

## Context Preservation
To maintain project memory across different agent sessions, follow these rules:

1. **Knowledge Base Updates**: When making significant architectural changes or resolving complex bugs, update the relevant file in `/knowledge-base`.
2. **Artifact Retention**: Save permanent mission-critical artifacts (Implementation Plans, Walkthroughs, Reference Guides) into `/knowledge-base` or a designated subfolder. 
3. **Token Efficiency**: Reference specific files in `/knowledge-base` rather than reading the entire project history.

## Project Branding
- Always use **Impactshop** branding.
- Never let "Burton" strings leak into the frontend UI, even though the data source may be shared.
