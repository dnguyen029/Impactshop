import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// This is a basic handler. In a production scenario with high volume,
// you might want to offload the actual Sanity mutation to a background queue
// to ensure you respond within the 10s timeout.
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // The payload structure depends on the event type from Sanity Connect.
    // Based on the docs, we need to check the event type.
    const { eventType, product } = payload;

    if (!product || !product.gid) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Example logic: If Shopify product is deleted or archived, mark in Sanity
    if (eventType === 'product.deleted' || product.status === 'archived') {
      await client.patch(`shopifyProduct-${product.id}`)
        .set({ 'store.isDeleted': true })
        .commit();
      
      console.log(`Marked product ${product.id} as deleted in Sanity.`);
    } else {
      // Handle other updates (create/update)
      // This is where you'd implement the logic to sync product data
      console.log(`Received update for product ${product.id}.`);
    }

    // Respond 200 OK immediately to acknowledge receipt
    return NextResponse.json({ message: 'Sync event received' }, { status: 200 });
  } catch (error) {
    console.error('Error in Sanity Sync Handler:', error);
    // Return 500 to trigger a retry from Sanity Connect
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
