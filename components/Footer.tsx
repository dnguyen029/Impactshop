import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-16 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-black tracking-tighter italic uppercase text-white mb-6 block">
            Impact
          </Link>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            High-performance snowboarding gear designed for riders who demand more from the mountain.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h4>
          <ul className="space-y-4 text-zinc-400">
            <li><Link href="/#collection" className="hover:text-white transition-colors">Snowboards</Link></li>
            <li><Link href="/#collection" className="hover:text-white transition-colors">Bindings</Link></li>
            <li><Link href="/#collection" className="hover:text-white transition-colors">Boots</Link></li>
            <li><Link href="/#collection" className="hover:text-white transition-colors">Apparel</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-zinc-400">
            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Warranty</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Impact Snowboards. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
