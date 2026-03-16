'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ExpressiveHero({ data }: { data?: any }) {
  const heading = data?.heading || "High-Performance\nSnowboards";
  const subheading = data?.subheading || "High-Performance Gear";
  const imageUrl = data?.imageUrl || "https://picsum.photos/seed/snowboard-hero/1000/1400";
  const ctaText = data?.ctaText || "Discover Collection";
  const ctaLink = data?.ctaLink || "/#collection";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
              {subheading}
            </span>
            <h1 className="font-display text-[12vw] lg:text-[100px] leading-[0.85] font-black tracking-tighter uppercase mb-8 whitespace-pre-line">
              {heading}
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              <Link 
                href={ctaLink} 
                className="bg-zinc-900 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95"
              >
                {ctaText}
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Watch Story</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image - Overlapping & Animated */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 1.1, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image
              src={imageUrl}
              alt="Premium Snowboard"
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white"
            >
              <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">New Release</div>
              <div className="text-xl font-bold">Custom Camber</div>
            </motion.div>
          </motion.div>
          
          {/* Secondary Overlapping Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-12 -left-12 w-64 h-64 rounded-[32px] overflow-hidden border-8 border-white shadow-xl hidden lg:block"
          >
            <Image
              src="https://picsum.photos/seed/snowboard-detail/500/500"
              alt="Binding detail view"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Background Large Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <h2 className="text-[30vw] font-black text-zinc-50 uppercase leading-none tracking-tighter">
          IMPACT
        </h2>
      </div>
    </section>
  );
}
