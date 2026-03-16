import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function debug() {
  try {
    const products = await client.fetch(`*[_type == "product"][0..5]{_id, _type, store{title, slug, status}}`);
    console.log('Sample Products:', JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Debug failed:', err);
  }
}

debug();
