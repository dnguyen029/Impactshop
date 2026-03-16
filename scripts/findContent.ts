import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function findContent() {
  const query = '*[text() match "HIGH-PERFORMANCE" || heading match "HIGH-PERFORMANCE" || title match "HIGH-PERFORMANCE"]';
  const docs = await client.fetch(query);
  console.log(JSON.stringify(docs, null, 2));
}

findContent();
