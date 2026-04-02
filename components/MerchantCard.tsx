'use client';
import React, { useState } from 'react';
import { Star, CheckCircle2, Store, ExternalLink } from 'lucide-react';

interface MerchantProps {
  name: string;
  initials: string; 
  rating: number;
  reviews: number;
}

export default function MerchantCard({ name, initials, rating, reviews }: MerchantProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      
      <div className="flex items-start justify-between mb-6">
        
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#22C55E] to-brand-success-text flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100 uppercase tracking-tighter">
          {initials}
        </div>
        <button 
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm ${
            isFollowing 
            ? 'bg-gray-100 text-gray-600 border border-gray-200' 
            : 'bg-[#F0FDF4] text-[#22C55E] hover:bg-[#DCFCE7]'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      <div className="space-y-1.5 mb-6">
        <div className="flex items-center gap-1.5">
          <h3 className="font-black text-gray-900 text-[18px] leading-tight tracking-tight">{name}</h3>
          <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-100 shadow-inner">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
            <span className="font-black text-yellow-700 text-xs">{rating}</span>
          </div>
          <span className="text-gray-400 text-xs font-semibold">{reviews} reviews</span>
        </div>
      </div>

      <button className="w-full py-3.5 border border-gray-100 rounded-2xl text-gray-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm">
        <Store className="w-4 h-4 text-[#22C55E]" />
        Visit Store Profile
        <ExternalLink className="w-3 h-3 opacity-40 ml-1" />
      </button>
    </div>
  );
}