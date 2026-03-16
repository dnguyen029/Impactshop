import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function fetchProduct() {
  const query = '*[_type == "product"][0]';
  const product = await client.fetch(query);
  console.log(JSON.stringify(product, null, 2));
}

fetchProduct();
