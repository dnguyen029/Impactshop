import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/snowboarding-hero/1920/1080"
          alt="Snowboarder carving down a mountain"
          fill
          className="object-cover opacity-80"
          priority
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <p className="font-bold text-white mb-4 text-sm md:text-base tracking-wide">
          High-end Snowboards
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 text-balance">
          High-Performance<br/>Mountain Tools
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/search" 
            className="bg-zinc-900/80 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-sm font-bold transition-colors hover:bg-zinc-900"
          >
            Discover Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
