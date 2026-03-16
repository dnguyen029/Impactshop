import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// Document type for all incoming synced Shopify products
const SHOPIFY_PRODUCT_DOCUMENT_TYPE = "product";
// Prefix added to all Sanity product document ids
const SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX = "shopifyProduct-";

// Define Sanity Client
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

export async function POST(req: Request) {
  if (!writeToken) {
    console.error("Missing SANITY_API_WRITE_TOKEN");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const transaction = sanityClient.transaction();

    switch (body.action) {
      case "create":
      case "update":
      case "sync":
        await createOrUpdateProducts(transaction, body.products);
        break;
      case "delete":
        const documentIds = body.productIds.map((id: string) =>
          getDocumentProductId(id)
        );
        await deleteProducts(transaction, documentIds);
        break;
    }

    await transaction.commit();
    return NextResponse.json({ message: "OK" });
  } catch (err: any) {
    console.error("Transaction failed: ", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function createOrUpdateProducts(transaction: any, products: any[]) {
  // Extract draft document IDs from current update
  const draftDocumentIds = products.map((product) => {
    const productId = extractIdFromGid(product.id);
    return `drafts.${getDocumentProductId(productId)}`;
  });

  // Determine if drafts exist for any updated products
  const existingDrafts = await sanityClient.fetch(`*[_id in $ids]._id`, {
    ids: draftDocumentIds,
  });

  products.forEach((product) => {
    // Build Sanity product document
    const document = buildProductDocument(product);
    const draftId = `drafts.${document._id}`;

    // Create (or update) existing published document
    transaction
      .createIfNotExists(document)
      .patch(document._id, (patch: any) => patch.set(document));

    // Check if this product has a corresponding draft and if so, update that too.
    if (existingDrafts.includes(draftId)) {
      transaction.patch(draftId, (patch: any) =>
        patch.set({ ...document, _id: draftId })
      );
    }
  });
}

async function deleteProducts(transaction: any, documentIds: string[]) {
  documentIds.forEach((id) => {
    transaction.delete(id).delete(`drafts.${id}`);
  });
}

function buildProductDocument(product: any) {
  const {
    featuredImage,
    id,
    options,
    productType,
    priceRange,
    status,
    title,
    variants,
    handle,
    vendor,
    tags,
    createdAt,
    updatedAt
  } = product;

  const productId = extractIdFromGid(id);

  // The 'store' object maps to the 'shopifyProduct' object type schema
  const store = {
    id: Number(productId),
    gid: id,
    createdAt: createdAt,
    updatedAt: updatedAt,
    isDeleted: false,
    status: status?.toLowerCase(),
    title: title,
    slug: {
      _type: 'slug',
      current: handle
    },
    // We map the featured image to the previewImageUrl
    previewImageUrl: featuredImage?.src,
    options: options?.map((option: any, index: number) => ({
      _key: String(index),
      _type: 'option',
      name: option.name,
      values: option.values,
    })),
    priceRange: {
      minVariantPrice: Number(priceRange?.minVariantPrice?.amount || 0),
      maxVariantPrice: Number(priceRange?.maxVariantPrice?.amount || 0),
    },
    productType: productType,
    vendor: vendor,
    tags: tags?.join(', ') || '',
    variants: variants?.edges?.map((edge: any) => {
      const variant = edge.node;
      return {
        _key: extractIdFromGid(variant.id),
        _type: 'productVariant',
        id: Number(extractIdFromGid(variant.id)),
        gid: variant.id,
        title: variant.title,
        price: Number(variant.price?.amount || 0),
        sku: variant.sku,
        isAvailable: variant.availableForSale,
      };
    }) || [],
  };

  return {
    _id: getDocumentProductId(productId),
    _type: SHOPIFY_PRODUCT_DOCUMENT_TYPE,
    store,
  };
}

function extractIdFromGid(gid: string) {
  if (!gid) return '';
  return gid.split('/').pop() || '';
}

function getDocumentProductId(id: string) {
  return `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${id}`;
}
