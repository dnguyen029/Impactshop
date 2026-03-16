import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function fetchVariant() {
  const query = '*[_type == "productVariant"][0]';
  const variant = await client.fetch(query);
  console.log(JSON.stringify(variant, null, 2));
}

fetchVariant();
