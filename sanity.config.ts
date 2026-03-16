import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './sanity/env';

import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId: projectId as string,
  dataset: dataset as string,
  schema: {
    ...schema,
    // Filter out singleton types from the global "New document" menu
    templates: (prev) =>
      prev.filter((template) => !['home', 'settings'].includes(template.id)),
  },
  document: {
    // For singleton types, hide the "Duplicate" and "Delete" actions
    actions: (prev, { schemaType }) => {
      if (['home', 'settings'].includes(schemaType)) {
        return prev.filter(({ action }) => !['delete', 'duplicate', 'unpublish'].includes(action || ''));
      }
      return prev;
    },
  },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
