import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function fetchTypes() {
  const query = 'array::unique(*._type)';
  const types = await client.fetch(query);
  console.log('Types in dataset:', types);
}

fetchTypes();
