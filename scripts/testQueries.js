const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '25mbwlje',
  dataset: 'production',
  apiVersion: '2025-03-15',
  token: 'skg5JogUjV6bwKvIgMK2nsRjjtC5AvrKax2aQpi98TMa9nwGpWWI4c1kMRD3h5Jb3NAWsr0ick2aYVtyg84WyUjwrkGFmhHbDIiGNNtlFr5A5CqIkSyzBXAAs0v0xm7SVHkZXAD7jOzpq1VERIe2QYGpFLtHcDj25Yq7p3WTsnt2vaVZqey4',
  useCdn: false,
});

async function testGetProducts() {
  const query = `*[_type == "product" && store.isDeleted != true] {
      "id": _id,
      "handle": coalesce(store.slug.current, slug.current, handle, _id),
      "title": coalesce(store.title, title, "Untitled Product"),
      "priceRange": {
        "minVariantPrice": {
          "amount": string(coalesce(store.priceRange.minVariantPrice.amount, store.priceRange.minVariantPrice, price, variantPrice, "0")),
          "currencyCode": "USD" 
        }
      },
      "images": {
        "edges": [
          {
            "node": {
              "url": coalesce(store.previewImageUrl, imageUrl, image.asset->url, "https://picsum.photos/seed/snowboard/800/1200"),
              "altText": coalesce(store.title, title, "Product Image")
            }
          }
        ]
      }
    }`;

  try {
    const products = await client.fetch(query);
    console.log('Fetched Products Count:', products.length);
    console.log('Sample Product:', JSON.stringify(products[0], null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testGetProducts();
