'use client';
import React from 'react';
import NextImage from 'next/image';
import { Share2, Star, Flame } from 'lucide-react';

export default function DealGallery() {
  const swatchColors = ['#CC7962', '#9E5B47', '#693D31'];

  return (
    <section className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Image Gallery */}
        <div className="flex gap-4">
          {/* Color swatches */}
          <div className="flex flex-col gap-4">
            {swatchColors.map((color, i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-full border-2 ${
                  i === 0 ? 'border-[#22C55E]' : 'border-transparent'
                } overflow-hidden cursor-pointer shadow-sm hover:scale-105 transition-transform`}
              >
                <div className="w-full h-full" style={{ backgroundColor: color }} />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full md:w-120 h-120 rounded-[24px] overflow-hidden bg-gray-50">
            <NextImage
              src="/Bakery.jpg"
              alt="Surplus Bakery Box"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#22C55E] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
            <Flame className="w-3 h-3" /> Trending Now
          </div>

          {/* Title + Rating */}
          <div className="space-y-2">
            <h1 className="text-[32px] font-black text-gray-900 leading-tight">
              Surplus Bakery Box –<br /> Assorted Fresh Pastries
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-bold">4.9 (1,240 Reviews)</span>
              <span className="text-gray-200 ml-2">|</span>
              <span className="text-sm text-gray-400 font-bold ml-2">
                Store: Le Parisien Boulangerie
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
            A delicious mix of today&apos;s surplus artisanal breads, croissants, and seasonal
            pastries. Perfectly edible and baked fresh this morning.
          </p>

          {/* Price */}
          <div className="flex items-center gap-6 py-4">
            <span className="text-[40px] font-black text-[#22C55E]">$12.50</span>
            <span className="text-2xl text-gray-300 line-through font-bold">$32.00</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-black">
              60% OFF
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#22C55E] hover:bg-[#1ea34d] text-white py-4 rounded-[16px] font-black text-lg shadow-lg flex items-center justify-center gap-2 transition-colors">
              Get Deal
            </button>
            <button className="px-8 border-2 border-gray-100 rounded-[16px] font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Share2 className="w-5 h-5" /> Share Deal
            </button>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">
              ✓
            </div>
            Verified 2 hours ago by PromoHouse Community
          </div>
        </div>
      </div>
    </section>
  );
}
