'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

interface ProductCardProps {
  product: {
    id: string
    handle: string
    title: string
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    images: {
      edges: {
        node: {
          url: string
          altText: string
        }
      }[]
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.edges?.[0]?.node
  const price = product.priceRange?.minVariantPrice

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/products/${product.handle}`}>
        <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-2xl relative">
          {image && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="mt-6 space-y-1">
          <h3 className="text-lg font-medium tracking-tight text-zinc-900 group-hover:underline underline-offset-4">
            {product.title}
          </h3>
          <p className="text-zinc-500 font-mono text-sm">
            {price ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currencyCode,
            }).format(parseFloat(price.amount)) : 'Price unavailable'}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
