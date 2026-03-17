import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function checkProducts() {
  console.log(`Checking Sanity Project: 25mbwlje`);
  try {
    const query = `*[_type == "product"] {
      _id,
      "title": store.title,
      "status": store.status,
      "isDeleted": store.isDeleted,
      "productType": store.productType
    }`;

    const products = await client.fetch(query);
    console.log(`Total products found: ${products.length}`);
    
    if (products.length === 0) {
      console.log("No products found. This might be a token permission issue or the project is empty.");
    }

    products.forEach(p => {
      console.log(`- ${p.title} | Status: ${p.status} | ProductType: ${p.productType}`);
    });
  } catch (err) {
    console.error("Error fetching from 25mbwlje:", err.message);
  }
}

checkProducts().catch(console.error);
