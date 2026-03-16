'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            className="lg:hidden text-zinc-900"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white flex flex-col pt-20 px-6 lg:hidden"
          >
            <button 
              className="absolute top-6 left-6 text-zinc-900"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-8 mt-12">
              <Link 
                href="/snowboards" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black uppercase tracking-tighter text-zinc-900"
              >
                Snowboards
              </Link>
              <Link 
                href="/search?q=bindings" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black uppercase tracking-tighter text-zinc-900"
              >
                Bindings
              </Link>
              <Link 
                href="/search?q=apparel" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black uppercase tracking-tighter text-zinc-900"
              >
                Apparel
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
