import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/sanity/lib/queries';
import ProductInteractive from '@/components/ProductInteractive';
import { PortableText } from '@portabletext/react';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-medium text-zinc-500 flex gap-2">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#collection" className="hover:text-zinc-900 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-zinc-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50">
              <Image
                src={product.images?.edges?.[0]?.node?.url || `https://picsum.photos/seed/${product.handle || product.id}/1200/1500`}
                alt={product.title}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Product Info (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit flex flex-col">
            <div className="mb-6">
              {product.vendor && (
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  {product.vendor}
                </p>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-normal tracking-normal text-zinc-900">
                {product.title}
              </h1>
            </div>

            {/* Interactive Variant Selection & Add to Cart */}
            <ProductInteractive product={product} />

            {/* Product Description */}
            {product.descriptionHtml && (
              <div className="mt-12 pt-12 border-t border-zinc-200">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6">Description</h2>
                <div 
                  className="prose prose-zinc max-w-none text-zinc-600 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}
            
            {/* Sanity Rich Text / Details */}
            <div className="mt-12 pt-12 border-t border-zinc-200">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6">Details</h2>
              {product.details ? (
                <div className="prose prose-zinc max-w-none text-zinc-600 prose-p:leading-relaxed">
                  <PortableText value={product.details} />
                </div>
              ) : (
                <>
                  <p className="text-zinc-600 leading-relaxed">
                    This product is built for performance and durability. Featuring premium materials and expert craftsmanship, it&apos;s designed to elevate your experience on the mountain. 
                  </p>
                  <p className="text-zinc-600 font-medium text-xs uppercase tracking-wider py-3 px-4 bg-zinc-200/50 rounded-lg mt-6 text-zinc-500 border border-zinc-300/30">
                    <span className="text-zinc-900 font-bold mr-1">CMS Reminder:</span> 
                    Add content to the "Rich Details" field in Sanity to replace this placeholder.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
