import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-03-15',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function checkProducts() {
  console.log(`Checking Sanity Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  const query = `*[_type == "product"] {
    _id,
    "title": store.title,
    "status": store.status,
    "isDeleted": store.isDeleted,
    "productType": store.productType
  }`;

  const products = await client.fetch(query);
  console.log(`Total products: ${products.length}`);
  
  const activeSnowboards = products.filter(p => 
    p.status === 'active' && 
    (p.productType?.toLowerCase().includes('snowboard') || false)
  );

  console.log(`Active Snowboards found: ${activeSnowboards.length}`);
  activeSnowboards.forEach(p => {
    console.log(`- ${p.title} (${p.status})`);
  });

  const inactiveProducts = products.filter(p => p.status !== 'active');
  console.log(`Inactive/Draft Products found: ${inactiveProducts.length}`);
  inactiveProducts.forEach(p => {
    console.log(`- ${p.title} (${p.status})`);
  });
}

checkProducts().catch(console.error);
