import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function fetchDraft() {
  const query = '*[_id == "drafts.shopifyProduct-15288542265715"][0]';
  const draft = await client.fetch(query);
  console.log('Draft data:', JSON.stringify(draft, null, 2));
}

fetchDraft();
