'use client';
import React from 'react';
import { Plus, Flag } from 'lucide-react';
import MerchantCard from '@/components/MerchantCard';
import SideDealCard from '@/components/SideDealCard';

const SIDE_DEALS = [
  { id: 1, title: 'Nike Air Zoom Pegasus 38',   price: 89.99,  oldPrice: 120.00, store: 'NIKE OFFICIAL', img: '/product1.jpg' },
  { id: 2, title: 'Modern Classic Wrist Watch',  price: 45.00,  oldPrice: 95.00,  store: 'AMAZON',        img: '/product2.jpg' },
  { id: 3, title: 'Fujifilm X-T30 II Camera',   price: 799.00, oldPrice: 899.00, store: 'BEST BUY',      img: '/product3.jpg' },
];

export default function DealSidebar() {
  return (
    <div className="space-y-8">
      {/* Merchant Info */}
      <MerchantCard name="Le Parisien" initials="LP" rating={4.9} reviews={1240} />

      {/* Other Deals */}
      <div className="space-y-6">
        <h3 className="font-black text-gray-900 text-lg">Other Deals You&apos;ll Love</h3>

        <div className="space-y-4">
          {SIDE_DEALS.map((deal) => (
            <div key={deal.id} className="relative group">
              <SideDealCard
                title={deal.title}
                price={deal.price}
                oldPrice={deal.oldPrice}
                store={deal.store}
                image={deal.img}
              />
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

      {/* Report */}
      <button className="w-full flex items-center justify-center gap-2 text-gray-300 hover:text-red-400 transition-colors py-4 text-[10px] font-bold uppercase tracking-widest">
        <Flag className="w-3.5 h-3.5" /> Report this deal
      </button>
    </div>
  );
}
