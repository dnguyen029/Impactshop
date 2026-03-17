import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash', // Fast and reliable for management tasks
});

export const managerAgent = ai.defineFlow(
  {
    name: 'managerAgent',
    inputSchema: z.object({
      issue: z.string().describe('The current issue the active agent is facing'),
    }),
    outputSchema: z.string().describe('The structured strategy and checklist for the active agent'),
  },
  async (input) => {
    const response = await ai.generate({
      system: `You are the Impactshop Manager Agent. Your goal is to provide high-level strategic guidance to the primary coding agent.
      
      CONTEXT:
      - Project: Impactshop (a headless e-commerce storefront).
      - Reference: Consult the \`/knowledge-base\` directory for project-specific context:
        - \`architecture.md\`: Project IDs, tech stack, and rendering strategies.
        - \`sync-logic.md\`: Custom sync configuration and webhook details.
        - \`deployment-rules.md\`: Deployment constraints and build safety.
        - \`agent-standard.md\`: Standards for agent behavior and artifact saving.
      
      Your advice should be structured as a Checklist of actionable steps for the active agent to follow.`,
      prompt: `The active agent is facing the following issue: ${input.issue}. 
      Provide a precise strategy and a step-by-step checklist to resolve this, ensuring all project-specific constraints are respected.`,
    });
    
    return response.text;
  }
);
