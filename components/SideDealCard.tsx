'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Store, Heart } from 'lucide-react';

interface SideDealProps {
  title: string;
  price: number;
  oldPrice: number;
  store: string;
  image: string;
}

export default function SideDealCard({ title, price, oldPrice, store, image }: SideDealProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 items-center cursor-pointer">
      
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="80px"
        />
      </div>

      {/* Contenu de l offre*/}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-800 text-[13px] leading-snug mb-1.5 truncate group-hover:text-[#22C55E] transition-colors">
          {title}
        </h4>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-black text-[#22C55E] text-base">
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-300 line-through font-medium">
            ${oldPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
          <Store className="w-3 h-3" />
          <span className="truncate">{store}</span>
        </div>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-300 ${
          isFavorite ? 'bg-red-50 text-red-500 opacity-100' : 'bg-gray-50 text-gray-300 opacity-0 group-hover:opacity-100'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}