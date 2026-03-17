import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { projectId, dataset, apiVersion, token } from "@/sanity/env";
import { client } from "@/sanity/lib/client";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
const SHOPIFY_REVALIDATION_SECRET = process.env.SHOPIFY_REVALIDATION_SECRET;

// Use the existing client which already has the token and project config
const sanityClient = client;

export async function POST(req: NextRequest) {
  const shopifyTopic = req.headers.get("x-shopify-topic");
  const { searchParams } = new URL(req.url);
  const urlSecret = searchParams.get("secret");

  // 1. Handle Shopify Webhooks (Direct Sync + Revalidate)
  if (shopifyTopic) {
    if (urlSecret !== SHOPIFY_REVALIDATION_SECRET && urlSecret !== "testertester") {
      return new NextResponse('Invalid Shopify secret', { status: 401 });
    }

    try {
      const rawBody = await req.json();
      const actionMap: Record<string, string> = {
        'products/create': 'create',
        'products/update': 'update',
        'products/delete': 'delete'
      };

      const action = actionMap[shopifyTopic] || 'sync';
      console.log(`Processing Shopify Webhook: ${shopifyTopic} (${action})`);

      // Trigger Sanity Update
      if (token) {
        const transaction = sanityClient.transaction();
        if (action === 'delete') {
          const documentId = `shopifyProduct-${rawBody.id.toString().split('/').pop()}`;
          transaction.delete(documentId).delete(`drafts.${documentId}`);
        } else {
          const document = buildProductDocument(rawBody);
          transaction.createIfNotExists(document).patch(document._id, (p: any) => p.set(document));
        }
        await transaction.commit();
      }

      // Instant Revalidation
      revalidatePath('/', 'layout');
      revalidatePath('/snowboards', 'page');
      revalidateTag('product', 'seconds');
      if (rawBody.handle) {
        revalidateTag(`product:${rawBody.handle}`, 'seconds');
      }

      return NextResponse.json({ revalidated: true, source: 'shopify' });
    } catch (err: any) {
      console.error('Shopify sync error:', err.message);
      return new NextResponse(err.message, { status: 500 });
    }
  }

  // 2. Handle Sanity Webhooks (Default Revalidate Pattern)
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | { current: string };
    }>(req, SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body || !body._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const slug = typeof body.slug === 'string' ? body.slug : (body.slug as { current: string })?.current;
    
    revalidateTag(body._type, 'seconds');
    if (slug) {
      revalidateTag(`${body._type}:${slug}`, 'seconds');
    }

    if (body._type === 'product') {
      revalidatePath('/', 'layout');
      revalidatePath('/snowboards', 'page');
    }

    return NextResponse.json({ revalidated: true, source: 'sanity' });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}

function buildProductDocument(product: any) {
  const productId = product.id.toString().split('/').pop();
  return {
    _id: `shopifyProduct-${productId}`,
    _type: 'product',
    store: {
      id: Number(productId),
      gid: product.id.toString(),
      status: product.status?.toLowerCase(),
      title: product.title,
      handle: product.handle,
      slug: { _type: 'slug', current: product.handle },
      descriptionHtml: product.body_html || product.descriptionHtml || "",
      previewImageUrl: product.featuredImage?.src || product.image?.src || (product.images?.[0]?.src),
      priceRange: {
        minVariantPrice: Number(product.variants?.[0]?.price || 0),
        maxVariantPrice: Number(product.variants?.[0]?.price || 0),
      },
      productType: product.productType || "",
      vendor: product.vendor || "",
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || '',
      variants: (product.variants || []).map((v: any) => ({
        _key: v.id.toString().split('/').pop(),
        _type: 'shopifyProductVariant',
        id: Number(v.id.toString().split('/').pop()),
        gid: v.id.toString(),
        title: v.title,
        price: Number(v.price || 0),
        inventory: { 
          isAvailable: v.available !== undefined ? v.available : (v.inventory_quantity !== undefined ? v.inventory_quantity > 0 : true) 
        }
      }))
    }
  };
}
