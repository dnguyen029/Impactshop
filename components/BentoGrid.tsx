'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const defaultCategories = [
  {
    _key: 'default-mens',
    title: "Men's Boards",
    image: 'https://picsum.photos/seed/mens-snowboard/800/800',
    size: 'large',
    href: '/#collection'
  },
  {
    _key: 'default-womens',
    title: "Women's Boards",
    image: 'https://picsum.photos/seed/womens-snowboard/800/800',
    size: 'small',
    href: '/#collection'
  },
  {
    _key: 'default-bindings',
    title: 'Bindings',
    image: 'https://picsum.photos/seed/snowboard-bindings/800/800',
    size: 'small',
    href: '/#collection'
  },
  {
    _key: 'default-boots',
    title: 'Step On® Boots',
    image: 'https://picsum.photos/seed/snowboard-boots/1200/800',
    size: 'wide',
    href: '/#collection'
  }
];

export default function BentoGrid({ tiles }: { tiles?: any[] }) {
  // Map Sanity tiles to the format expected by the grid, or use defaults
  const categories = tiles && tiles.length > 0 
    ? tiles.map((tile, i) => ({
        title: tile.title || 'Untitled',
        _key: tile._key,
        image: tile.imageUrl || `https://picsum.photos/seed/bento-${i}/800/800`,
        size: i === 0 ? 'large' : i === 3 ? 'wide' : 'small', // Keep the same layout pattern
        href: tile.link || '#'
      }))
    : defaultCategories;

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
        {categories.map((cat, i) => (
          <motion.div
            key={cat._key || cat.title + i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`relative rounded-[32px] overflow-hidden group cursor-pointer ${
              cat.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : 
              cat.size === 'wide' ? 'lg:col-span-2' : ''
            }`}
          >
            <Link href={cat.href} className="block w-full h-full">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-2xl font-bold tracking-tight uppercase leading-none">
                  {cat.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
