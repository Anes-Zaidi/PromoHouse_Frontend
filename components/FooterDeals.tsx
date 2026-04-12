'use client' ;
import NextImage from 'next/image'
import Link from 'next/link' ;

function FooterDeals() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1: Logo */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8">
                <NextImage 
                  src="/logo3.png" 
                  alt="PromoHouse Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-gray-900">PromoHouse</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {"The best community to find and share incredible deals every day."}
            </p>
          </div>

          {/* Colonne 2: Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-[#22C55E] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#22C55E] transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-[#22C55E] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#22C55E] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/help" className="hover:text-[#22C55E] transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-[#22C55E] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#22C55E] transition-colors">FAQ</Link></li>
              <li><Link href="/community" className="hover:text-[#22C55E] transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Updated</h4>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E] transition-all"
              />
              <button className="bg-[#22C55E] text-white font-bold py-3 rounded-xl hover:bg-brand-success-text transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div> 

        {/* Copyrighta  */}
        <div className="border-t border-gray-50 pt-8 text-center text-sm text-gray-400">
          © 2024 PromoHouse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default FooterDeals