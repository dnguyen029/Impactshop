import { getProducts } from '@/sanity/lib/queries';
import ProductCard from './ProductCard';

export default async function ProductGrid() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <section className="pb-24 px-4 md:px-8 max-w-7xl mx-auto text-center py-20 bg-zinc-100 rounded-3xl border border-dashed border-zinc-300">
        <h3 className="text-xl font-bold mb-2">No Products Found</h3>
        <p className="text-zinc-500 max-w-md mx-auto">
          We couldn't find any products in your Sanity dataset. 
          Please check your <code className="bg-zinc-200 px-1 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> 
          and ensure your Shopify sync is active in the Sanity dashboard.
        </p>
      </section>
    );
  }

  return (
    <section className="pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
