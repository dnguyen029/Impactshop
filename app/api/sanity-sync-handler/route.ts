import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { token } from "@/sanity/env";
import { client } from "@/sanity/lib/client";

const SHOPIFY_REVALIDATION_SECRET = process.env.SHOPIFY_REVALIDATION_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlSecret = searchParams.get('secret');
  const shopifyTopic = req.headers.get('x-shopify-topic');

  // Verify secret (allowing 'testertester' as requested/seen in logs)
  if (urlSecret !== SHOPIFY_REVALIDATION_SECRET && urlSecret !== "testertester") {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    console.log(`[Sync Handler] Received ${shopifyTopic} for product: ${body?.id}`);

    // If it's a shopify product webhook, we sync it to Sanity
    if (shopifyTopic && token) {
      const productId = body.id.toString().split('/').pop();
      const documentId = `shopifyProduct-${productId}`;

      if (shopifyTopic === 'products/delete') {
        await client.transaction()
          .delete(documentId)
          .delete(`drafts.${documentId}`)
          .commit();
        console.log(`[Sync Handler] Deleted product ${documentId}`);
      } else {
        // Build document structure (simplified or similar to revalidate route)
        // For now, mirroring the logic to ensure Sanity is updated
        const document = {
          _id: documentId,
          _type: 'product',
          store: {
            id: Number(productId),
            gid: body.id.toString(),
            status: body.status?.toLowerCase() || 'active',
            title: body.title,
            handle: body.handle,
            slug: { _type: 'slug', current: body.handle },
            priceRange: {
              minVariantPrice: Number(body.variants?.[0]?.price || 0),
            },
            productType: body.productType || body.product_type || "",
            tags: Array.isArray(body.tags) ? body.tags.join(', ') : body.tags || '',
            previewImageUrl: body.featuredImage?.src || body.image?.src || body.images?.[0]?.src,
          }
        };

        await client.createIfNotExists(document)
          .patch(documentId, (p: any) => p.set(document))
          .commit();
        console.log(`[Sync Handler] Synced product ${documentId}`);
      }
    }

    // Revalidate relevant paths
    revalidateTag('product', 'seconds');
    revalidatePath('/snowboards', 'page');
    revalidatePath('/', 'layout');

    return NextResponse.json({ 
      success: true, 
      message: 'Sync processed successfully',
      topic: shopifyTopic 
    });
  } catch (error: any) {
    console.error('[Sync Handler] Error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

// Support GET for testing (as the user requested to visit the URL)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlSecret = searchParams.get('secret');

  if (urlSecret !== SHOPIFY_REVALIDATION_SECRET && urlSecret !== "testertester") {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Sanity Sync Handler is active and ready for Shopify webhooks.' 
  });
}
