import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { shopifyFetch, PRODUCTS_QUERY } from '@/lib/shopify';

export async function POST() {
  try {
    // 1. Fetch all products from Shopify (Storefront API)
    // Note: Storefront API has pagination limits. This is a simplified fetch.
    const { data: shopifyData } = await shopifyFetch<{ products: { edges: { node: { handle: string } }[] } }>({
      query: PRODUCTS_QUERY,
      variables: { first: 250 },
    });
    
    const shopifyHandles = new Set(shopifyData.products.edges.map(edge => edge.node.handle));

    // 2. Fetch all products from Sanity
    const sanityProducts = await client.fetch(`*[_type == "product" && store.isDeleted != true] { _id, "handle": store.slug.current }`);

    // 3. Identify products in Sanity not in Shopify
    const productsToDelete = sanityProducts.filter(product => !shopifyHandles.has(product.handle));

    // 4. Patch them in Sanity
    if (productsToDelete.length > 0) {
      const mutations = productsToDelete.map(product => ({
        patch: {
          id: product._id,
          set: { 'store.isDeleted': true }
        }
      }));
      
      await client.mutate(mutations);
      return NextResponse.json({ message: `Successfully marked ${productsToDelete.length} products as deleted.`, products: productsToDelete });
    }

    return NextResponse.json({ message: 'All products are in sync.' });
  } catch (error) {
    console.error('Error syncing deletions:', error);
    return NextResponse.json({ error: 'Failed to sync deletions' }, { status: 500 });
  }
}
