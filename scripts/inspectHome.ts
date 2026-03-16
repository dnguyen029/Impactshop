import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function findContent() {
  const query = '*[_type == "home"][0]';
  const doc = await client.fetch(query);
  console.log(JSON.stringify(doc, null, 2));
}

findContent();
