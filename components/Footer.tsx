import React from 'react';
import Image from 'next/image'; 
import logo from '@/public/logo.png'
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#104d30] text-white pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1: Ton Logo Image & Mission */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              {/* Utilisation de ton image logo.png */}
              <div className="relative w-12 h-12 overflow-hidden rounded-xl">
                <Image 
                  src={logo} 
                  alt="PromoHouse Logo" 
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                PromoHouse
              </span>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              We are on a mission to eliminate food waste by connecting surplus food with smart shoppers. Good for your wallet, better for the planet.
            </p>

            {/* Réseaux Sociaux */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div key={index} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Colonne 2: About Us */}
          <div>
            <h3 className="text-lg font-bold mb-6">About Us</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
              <li className="hover:text-white transition-colors cursor-pointer">How It Works</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Press</li>
              <li className="hover:text-white transition-colors cursor-pointer">Sustainability</li>
            </ul>
          </div>

          {/* Colonne 3: Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Return Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Colonne 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-6">Subscribe to our newsletter to get the latest deals and updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:border-green-400 transition-colors"
              />
              <button className="absolute right-1.5 top-1.5 bg-green-500 p-2 rounded-lg hover:bg-green-600 transition-all">
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>

        </div>

        {/* Ligne du bas */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs">
            © 2024 PromoHouse Inc. All rights reserved.
          </p>
          
          <div className="flex gap-3 opacity-80">
             <div className="bg-white px-2 py-1 rounded text-[10px] text-black font-bold">VISA</div>
             <div className="bg-white px-2 py-1 rounded text-[10px] text-black font-bold">MASTERCARD</div>
             <div className="bg-white px-2 py-1 rounded text-[10px] text-black font-bold">PAYPAL</div>
             <div className="bg-white px-2 py-1 rounded text-[10px] text-black font-bold">APPLE PAY</div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;