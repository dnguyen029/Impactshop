# Knowledge Base: Token Saving Guide

To maximize efficiency and minimize cost/context usage, follow these standard operating procedures:

## 1. Read Surgetically
- **DO NOT** read all files in the knowledge base at once.
- **DO** identify the specific domain (e.g., `sync-logic.md`) and read only that file.
- **DO** check `mission-log.md` (if it exists) to see the most recent status.

## 2. Use the Manager Agent
- Before starting a multi-turn task, call `scripts/manager-agent.ts`.
- Its prompt is tuned to browse the KB and provide a concise checklist, which is cheaper than you exploring manually.

## 3. Save Contextual Artifacts
- When you finish a task, save a **Mission Brief** to this folder or update the relevant documentation.
- If you create a complex `implementation_plan.md` or `walkthrough.md`, copy the final version here so the next agent doesn't have to guess what you did.

## 4. Keep Documentation Token-Dense
- Use tables and lists where possible.
- Avoid repetitive "fluff" or conversational padding in these files.
