import { groq } from 'next-sanity';
import { projectId } from '../env';
import { sanityFetch } from './live';

export interface ShopifyProduct {
  _id: string;
  store: {
    title: string;
    slug: { current: string };
    descriptionHtml?: string;
    vendor?: string;
    productType?: string;
    tags?: string;
    priceRange: {
      minVariantPrice: number;
    };
    previewImageUrl: string;
    options: {
      name: string;
      values: string[];
    }[];
    variants: {
      store: {
        id: number;
        title: string;
        price: number;
        inventory: {
          isAvailable: boolean;
        };
        option1: string;
        option2: string;
        option3: string;
      }
    }[];
  };
}

export async function getHomepageData(): Promise<any | null> {
  if (!projectId || projectId === 'mockProjectId' || projectId === 'your_sanity_project_id') {
    return null;
  }

  try {
    const query = groq`*[_type == "home"][0] {
      title,
      sections[] {
        _type,
        _key,
        // Hero fields
        eyebrow,
        heading,
        subheading,
        brandingTitle,
        "imageUrl": image.asset->url,
        cta { title, link },
        secondaryCta { title, link },
        // Collection Grid fields
        title,
        tiles[] {
          _key,
          title,
          "imageUrl": image.asset->url,
          collection->{
            "id": _id,
            "handle": store.slug.current,
            "title": store.title
          }
        },
        // Feature Section fields
        description,
        "images": images[].asset->url,
        // Product Grid fields
        title,
        eyebrow
      },
      seo {
        title,
        description,
        "image": image.asset->url
      }
    }`;
    
    const { data: home } = await sanityFetch({ 
      query,
      tags: ['home'] 
    });
    
    return home || null;
  } catch (error) {
    console.error('Error fetching homepage data from Sanity:', error);
    return null;
  }
}

export async function getProducts(): Promise<any[]> {

  if (!projectId || projectId === 'mockProjectId' || projectId === 'your_sanity_project_id') {
    console.warn('Sanity Project ID is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.');
    return [];
  }

  try {
    // DEBUG: Check total products in dataset
    try {
      const { data: count } = await sanityFetch({ query: groq`count(*[_type == "product"])` });
      console.log(`[DEBUG] Total products in Sanity dataset: ${count}`);
    } catch (e) {
      console.error('[DEBUG] Failed to count products:', e);
    }

    // Fetch products, handling both Sanity Connect (store.*) and flat CSV imports
    const query = groq`*[_type == "product" && store.isDeleted != true && store.status == "active"] | order(_createdAt desc) {
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
              "url": coalesce(store.previewImageUrl, imageUrl, image.asset->url, "https://picsum.photos/seed/" + coalesce(store.slug.current, slug.current, handle, _id) + "/1200/1500"),
              "altText": coalesce(store.title, title, "Product Image")
            }
          }
        ]
      }
    }`;
    
    const { data: products } = await sanityFetch({ 
      query,
      tags: ['product'] 
    });
    
    if (!products || products.length === 0) {
      console.log('No products found in Sanity. Ensure your Shopify sync is active or CSV is imported.');
    } else {
      console.log(`[DEBUG] Successfully mapped ${products.length} products.`);
    }
    
    return products || [];
  } catch (error) {
    console.error('Error fetching products from Sanity:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<any | null> {
  if (!projectId || projectId === 'mockProjectId' || projectId === 'your_sanity_project_id') {
    return null;
  }

  try {
    const query = groq`*[_type == "product" && store.isDeleted != true && store.status == "active" && (store.slug.current == $slug || slug.current == $slug || handle == $slug)][0] {
      "id": _id,
      "handle": coalesce(store.slug.current, slug.current, handle, _id),
      "title": coalesce(store.title, title, "Untitled Product"),
      "descriptionHtml": coalesce(store.descriptionHtml, bodyHtml, body, description, ""),
      "vendor": coalesce(store.vendor, vendor, ""),
      "productType": coalesce(store.productType, productType, type, ""),
      "tags": coalesce(store.tags, tags, ""),
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
              "url": coalesce(store.previewImageUrl, imageUrl, image.asset->url, "https://picsum.photos/seed/" + coalesce(store.slug.current, slug.current, handle, _id) + "/1200/1500"),
              "altText": coalesce(store.title, title, "Product Image")
            }
          }
        ]
      },
      "options": coalesce(store.options[]{
        _key,
        name,
        values
      }, options[]{
        _key,
        name,
        values
      }, []),
      "variants": coalesce(store.variants[]{
        _key,
        id,
        title,
        price,
        inventory,
        option1,
        option2,
        option3
      }, variants[]->{
        _key,
        "id": store.id,
        "title": store.title,
        "price": store.price,
        "inventory": store.inventory,
        "option1": store.option1,
        "option2": store.option2,
        "option3": store.option3
      }, []),
      details,
      seo {
        title,
        description,
        "image": image.asset->url
      }
    }`;
    
    const { data: product } = await sanityFetch({ 
      query, 
      params: { slug },
      tags: [`product:${slug}`]
    });
    return product || null;
  } catch (error) {
    console.error('Error fetching product by slug from Sanity:', error);
    return null;
  }
}

export async function getSettings(): Promise<any | null> {
  if (!projectId || projectId === 'mockProjectId' || projectId === 'your_sanity_project_id') {
    return null;
  }

  try {
    const query = groq`*[_type == "settings"][0] {
      title,
      description,
      shippingTitle,
      shippingDescription,
      seo {
        title,
        description,
        "image": image.asset->url
      }
    }`;
    
    const { data: settings } = await sanityFetch({ 
      query,
      tags: ['settings'] 
    });
    
    return settings || null;
  } catch (error) {
    console.error('Error fetching settings from Sanity:', error);
    return null;
  }
}
