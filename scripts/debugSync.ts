import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  token: process.env.SANITY_API_TOKEN, // Removed hardcoded secret
  useCdn: false,
});

async function debugProducts() {
  try {
    const totalCount = await client.fetch('count(*[_type == "product"])');
    const syncCount = await client.fetch('count(*[_type == "product" && defined(store)])');
    const recent = await client.fetch('*[_type == "product"] | order(_updatedAt desc) [0..2]');
    
    console.log('Total Product Documents:', totalCount);
    console.log('Products with "store" object (Synced):', syncCount);
    console.log('Sample Recent Data:', JSON.stringify(recent, null, 2));
    
    if (recent.length > 0) {
        console.log('Latest product title:', recent[0].store?.title || recent[0].title);
        console.log('Latest product updatedAt:', recent[0]._updatedAt);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

debugProducts();
