import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DealGallery from './components/DealGallery';
import DealSidebar from './components/DealSidebar';
import CommentDealSection from '@/sections/CommentDealSection';

export default function DealDetailsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="grow pb-20">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/food" className="hover:text-gray-600">Food &amp; Groceries</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/bakeries" className="hover:text-gray-600">Bakeries</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Surplus Bakery Box</span>
        </nav>

        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Hero gallery + product info */}
          <DealGallery />

          {/* Comments (left) + Sidebar (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <CommentDealSection count={42} />
            </div>
            <div className="lg:col-span-4">
              <DealSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}