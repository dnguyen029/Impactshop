import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function checkSync() {
  const count = await client.fetch('count(*[_type == "product"])');
  const recentProducts = await client.fetch('*[_type == "product"] | order(_updatedAt desc) [0..2]');
  
  console.log('Total Products in Sanity:', count);
  console.log('Recent Products:', JSON.stringify(recentProducts, null, 2));
}

checkSync();
