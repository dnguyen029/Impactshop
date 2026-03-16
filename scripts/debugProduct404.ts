import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function debug() {
  const slug = 'aligned-test-snowboard-direct';
  try {
    const query = `*[_type == "product" && store.isDeleted != true && (store.slug.current == $slug || slug.current == $slug || handle == $slug)][0]`;
    const product = await client.fetch(query, { slug });
    console.log('Product by slug:', JSON.stringify(product, null, 2));
  } catch (err) {
    console.error('Debug failed:', err);
  }
}

debug();
