import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projects = ['u75ob7mf', '25mbwlje'];

async function checkProjects() {
  for (const pid of projects) {
    console.log(`\n--- Checking Sanity Project: ${pid} ---`);
    const client = createClient({
      projectId: pid,
      dataset: 'production',
      apiVersion: '2025-03-15',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    try {
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

    } catch (err) {
      console.error(`Error checking project ${pid}:`, err.message);
    }
  }
}

checkProjects().catch(console.error);
