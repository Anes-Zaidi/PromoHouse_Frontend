'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Share2, Plus, Star, Flame, Flag } from "lucide-react";
import NextImage from 'next/image';
import NavBarDeals from '@/components/NavBarDeals';
import FooterDeals from '@/components/FooterDeals';
import MerchantCard from '@/components/MerchantCard';
import SideDealCard from '@/components/SideDealCard';
import CommentDealSection from '@/sections/CommentDealSection';

export default function DealDetailsPage() {
  const sideDeals = [
    { id: 1, title: "Nike Air Zoom Pegasus 38", price: 89.99, oldPrice: 120.00, store: "NIKE OFFICIAL", img: "/product1.jpg" },
    { id: 2, title: "Modern Classic Wrist Watch", price: 45.00, oldPrice: 95.00, store: "AMAZON", img: "/product2.jpg" },
    { id: 3, title: "Fujifilm X-T30 II Camera", price: 799.00, oldPrice: 899.00, store: "BEST BUY", img: "/product3.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <NavBarDeals />

      <main className="grow pb-20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/food" className="hover:text-gray-600">Food & Groceries</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/bakeries" className="hover:text-gray-600">Bakeries</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Surplus Bakery Box</span>
        </nav>

        <div className="max-w-7xl mx-auto px-6 space-y-8">
          
          {/* Section de la Galerie */}
          <section className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Galerie Images (Design Exact) */}
              <div className="flex gap-4">
               
           <div className="flex flex-col gap-4">
   {['#CC7962', '#9E5B47', '#693D31'].map((color, i) => (
                 <div 
                  key={i} 
                   className={`w-16 h-16 rounded-full border-2 ${i === 0 ? 'border-[#22C55E]' : 'border-transparent'} overflow-hidden cursor-pointer shadow-sm hover:scale-105 transition-transform`}
                           >
                      <div 
                        className="w-full h-full" 
                        style={{ backgroundColor: color }} 
                         />
                        </div>
                    ))}
                </div>
                {/* Image */}
                <div className="relative w-full md:w-120 h-120 rounded-[24px] overflow-hidden bg-gray-50">
                  <NextImage src="/Bakery.jpg" alt="Bakery Box" fill className="object-cover" />
                </div>
              </div>

              {/* Infos Produit */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#22C55E] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                   <Flame className="w-3 h-3" /> Trending Now
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-[32px] font-black text-gray-900 leading-tight">
                    Surplus Bakery Box – <br /> Assorted Fresh Pastries
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                    <span className="text-sm text-gray-400 font-bold">4.9 (1,240 Reviews)</span>
                    <span className="text-gray-200 ml-2">|</span>
                    <span className="text-sm text-gray-400 font-bold ml-2">Store: Le Parisien Boulangerie</span>
                  </div>
                </div>

                <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
                  A delicious mix of today&apos;s surplus artisanal breads, croissants, and seasonal pastries. Perfectly edible and baked fresh this morning.
                </p>

                <div className="flex items-center gap-6 py-4">
                  <span className="text-[40px] font-black text-[#22C55E]">$12.50</span>
                  <span className="text-2xl text-gray-300 line-through font-bold">$32.00</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-black">60% OFF</span>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-[#22C55E] hover:bg-[#1ea34d] text-white py-4 rounded-[16px] font-black text-lg shadow-lg flex items-center justify-center gap-2">
                    <NextImage src="/cart-white.svg" width={20} height={20} alt="" className="brightness-0 invert" /> Get Deal
                  </button>
                  <button className="px-8 border-2 border-gray-100 rounded-[16px] font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                    <Share2 className="w-5 h-5" /> Share Deal
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                   <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">✓</div>
                   Verified 2 hours ago by PromoHouse Community
                </div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-8">
              <CommentDealSection count={42} />
            </div>
            <div className="lg:col-span-4 space-y-8">
              <MerchantCard name="Le Parisien" initials="LP" rating={4.9} reviews={1240} />

              <div className="space-y-6">
                <h3 className="font-black text-gray-900 text-lg">Other Deals You&apos;ll Love</h3>
                <div className="space-y-4">
                  {sideDeals.map((deal) => (
                    <div key={deal.id} className="relative group">
                       <SideDealCard {...deal} image={deal.img} />
                       <div className="absolute bottom-4 right-12 flex gap-2">
                          <button className="p-2 bg-[#F0FDF4] text-[#22C55E] rounded-lg hover:bg-[#22C55E] hover:text-white transition-all shadow-sm">
                            <Plus className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 bg-[#F0FDF4] text-[#22C55E] rounded-2xl font-black text-sm hover:bg-[#DCFCE7] transition-all uppercase tracking-widest">
                  View More Deals
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 text-gray-300 hover:text-red-400 transition-colors py-4 text-[10px] font-bold uppercase tracking-widest">
                <Flag className="w-3.5 h-3.5" /> Report this deal
              </button>
            </div>
          </div>

        </div>
      </main>

      <FooterDeals />
    </div>
  );
}