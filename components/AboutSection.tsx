'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Images Column */}
        <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-2/3 aspect-[3/4] rounded-[40px] overflow-hidden z-10 shadow-2xl"
          >
            <Image
              src="https://picsum.photos/seed/snow-mountain/800/1200"
              alt="Mountain riding"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0, rotate: -5 }}
            whileInView={{ x: 0, opacity: 1, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 aspect-square rounded-[32px] overflow-hidden shadow-xl border-8 border-white"
          >
            <Image
              src="https://picsum.photos/seed/snowboard-craft/600/600"
              alt="Board crafting"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Text Column */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 block">
              About us
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-10">
              Designed & <br />
              developed in <br />
              <span className="text-zinc-300">Vermont</span>
            </h2>
            
            <p className="text-zinc-500 text-lg leading-relaxed max-w-md mb-12">
              Born in the mountains, Impact was founded by riders who demanded more from their gear. We obsess over every edge, core, and camber profile to build boards that elevate your ride, whether you&apos;re carving groomers or floating in deep powder.
            </p>
            
            <div className="flex gap-4">
              <button className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
