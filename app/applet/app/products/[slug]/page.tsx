import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/sanity/lib/queries';
import ProductInteractive from '@/components/ProductInteractive';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { store } = product;

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-medium text-zinc-500 flex gap-2">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#collection" className="hover:text-zinc-900 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-zinc-900">{store.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full bg-white rounded-md overflow-hidden">
              <Image
                src={store.previewImageUrl || `https://picsum.photos/seed/${store.slug?.current || product._id}/1200/1500`}
                alt={store.title}
                fill
                className="object-cover object-center"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Product Info (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit flex flex-col">
            <div className="mb-6">
              {store.vendor && (
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  {store.vendor}
                </p>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-normal tracking-normal text-zinc-900">
                {store.title}
              </h1>
            </div>

            {/* Interactive Variant Selection & Add to Cart */}
            <ProductInteractive product={product} />

            {/* Product Description */}
            {store.descriptionHtml && (
              <div className="mt-12 pt-12 border-t border-zinc-200">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6">Description</h2>
                <div 
                  className="prose prose-zinc max-w-none text-zinc-600 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: store.descriptionHtml }}
                />
              </div>
            )}
            
            {/* Placeholder for future Sanity Rich Text / Details */}
            {!store.descriptionHtml && (
              <div className="mt-12 pt-12 border-t border-zinc-200">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6">Details</h2>
                <p className="text-zinc-600 leading-relaxed">
                  This product is built for performance and durability. Featuring premium materials and expert craftsmanship, it&apos;s designed to elevate your experience on the mountain. 
                </p>
                <p className="text-zinc-600 leading-relaxed mt-4">
                  (Note: This is placeholder text. Once we extend the Sanity schema, you can write rich, custom descriptions here!)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
