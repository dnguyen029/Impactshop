import { getProducts } from '@/sanity/lib/queries';
import ProductCard from '@/components/ProductCard';

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
            Search
          </h1>
          <p className="text-zinc-500 max-w-xl">
            Showing all {products.length} products across our collection.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-40 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
            <h2 className="text-xl font-bold">No products found</h2>
            <p className="text-zinc-500">The Shopify sync might still be in progress.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products.map((product: any) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
