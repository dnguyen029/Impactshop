import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function fetchCollection() {
  const query = '*[_type == "collection"][0]';
  const collection = await client.fetch(query);
  console.log(JSON.stringify(collection, null, 2));
}

fetchCollection();
