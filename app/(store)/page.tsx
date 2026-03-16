import ExpressiveHero from '@/components/ExpressiveHero';
import BentoGrid from '@/components/BentoGrid';
import ProductGrid from '@/components/ProductGrid';
import AboutSection from '@/components/AboutSection';
import { getHomepageData } from '@/sanity/lib/queries';

export default async function Home() {
  const homepageData = await getHomepageData();

  const sections = homepageData?.sections || [];

  return (
    <main className="min-h-screen">
      {sections.map((section: any) => {
        if (section._type === 'hero') {
          return (
            <ExpressiveHero
              key={section._key}
              data={{
                ...section,
                cta: { text: section.cta?.title, link: section.cta?.link }
              }}
            />
          );
        }
        if (section._type === 'productGrid') {
          return (
            <div key={section._key} id="collection" className="bg-zinc-50 py-24">
              <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                  {section.eyebrow || 'The Collection'}
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                  {section.title || 'Featured Gear'}
                </h2>
              </div>
              <ProductGrid />
            </div>
          );
        }
        if (section._type === 'collectionGrid') {
          return <BentoGrid key={section._key} tiles={section.tiles} />;
        }
        if (section._type === 'featureSection') {
          return <AboutSection key={section._key} data={section} />;
        }
        return null;
      })}

      {!sections.length && (
        <>
          <ExpressiveHero data={homepageData?.hero} />

          <div id="collection" className="bg-zinc-50 py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 block">
                The Collection
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Featured <span className="text-zinc-300">Gear</span>
              </h2>
            </div>
            <ProductGrid />
          </div>

          <BentoGrid tiles={homepageData?.tiles} />
          <AboutSection />
        </>
      )}
    </main>
  );
}
