
import { getSnowboards } from '@/sanity/lib/queries';
import ProductCard from '@/components/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snowboards | Impact Shop',
  description: 'Premium performance snowboards engineered for the mountains.',
};

export default async function SnowboardsPage() {
  const products = await getSnowboards();

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
              The Collection
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Snow <span className="text-zinc-300">Boards</span>
            </h1>
            <p className="mt-8 text-xl text-zinc-500 leading-relaxed max-w-xl">
              Engineered for precision. Built for impact. Explore our fleet of high-performance snowboards synced directly from Shopify and curated for those who demand excellence.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-400 pb-2">
            <span className="w-12 h-px bg-zinc-200" />
            <span>{products.length} Models Available</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-zinc-200 rounded-3xl bg-zinc-50">
            <h3 className="text-xl font-bold mb-2 text-zinc-900">No Snowboards Found</h3>
            <p className="text-zinc-500">
              We couldn't find any snowboard products in our collection at the moment.
            </p>
          </div>
        )}
      </section>

      {/* Bottom Visual Element */}
      <section className="mt-32 border-t border-zinc-100 pt-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
             <div className="absolute -top-24 -right-12 text-[20vw] font-black text-zinc-50 select-none pointer-events-none truncate uppercase leading-none tracking-tighter">
              Performance
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
                  Synced for Speed
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  Our inventory is live-synced from Shopify to Sanity, ensuring you always see the latest availability and technical specifications for our entire snowboard range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
