'use client'

import Link from 'next/link'
import { ShoppingBag, Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black tracking-tighter italic uppercase text-zinc-900">
            Impact
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/snowboards" className="text-sm font-medium uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
              Snowboards
            </Link>
            <Link href="/search?q=bindings" className="text-sm font-medium uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
              Bindings
            </Link>
            <Link href="/search?q=apparel" className="text-sm font-medium uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
              Apparel
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/search" aria-label="Search items">
            <button 
              className="text-zinc-900 hover:text-zinc-500 transition-colors"
              tabIndex={-1}
            >
              <Search size={20} />
            </button>
          </Link>
          <button 
            className="text-zinc-900 hover:text-zinc-500 transition-colors relative"
            aria-label="View shopping bag"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
