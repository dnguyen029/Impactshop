import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function fetchProductMeta() {
  const query = '*[_type in ["product", "shopifyProduct"]][0]{_id, _type, title}';
  const product = await client.fetch(query);
  console.log(JSON.stringify(product, null, 2));
}

fetchProductMeta();
