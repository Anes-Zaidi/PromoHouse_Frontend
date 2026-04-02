"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import logo from "@/public/logo.png";
import { signInWithGoogle } from "../utils/auth";

export default function SignupLeftPanel() {
  return (
    <div className="relative bg-[#1E633E] lg:w-[50%] p-8 lg:p-16 flex flex-col items-center lg:items-start justify-center">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <button className="text-white hover:bg-white/10 flex items-center gap-2 rounded-full px-4 py-2 opacity-80 hover:opacity-100 transition-all font-medium text-sm">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-16 lg:mb-24 z-10 mt-10 lg:mt-0">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg relative p-1.5 overflow-hidden">
          <Image 
            src={logo} 
            alt="PromoHouse Logo" 
            className="object-contain"
            fill
            priority
          />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight">
          PromoHouse
        </h1>
      </div>

      {/* Quote */}
      <div className="relative max-w-md z-10 text-center lg:text-left mb-16 lg:mb-24">
        <span className="absolute -top-10 -left-6 text-[#F27D26] text-7xl font-serif opacity-90 leading-none pointer-events-none">
          “
        </span>
        <p className="text-white text-xl lg:text-2xl leading-relaxed z-10 relative px-4 lg:px-6">
          Find surplus and near-expiry food at{" "}
          <span className="font-bold underline decoration-[#F27D26] decoration-4 underline-offset-4">discounted</span> prices near you, while{" "}
          <span className="font-bold underline decoration-[#F27D26] decoration-4 underline-offset-4">saving money</span> on everyday essentials.
        </p>
        <span className="absolute -bottom-10 right-0 lg:-right-6 text-[#F27D26] text-7xl font-serif opacity-90 leading-none pointer-events-none flex justify-end">
          ”
        </span>
      </div>

      {/* Social Sign Up Section */}
      <div className="flex flex-col items-center justify-center z-10 w-full max-w-md ">
        <div className="flex items-center gap-4 w-full mb-6 relative">
          <div className="h-px bg-white/20 flex-1"></div>
          <span className="text-white/80 text-sm font-medium">Quick Sign Up</span>
          <div className="h-px bg-white/20 flex-1"></div>
        </div>
        <button 
          onClick={signInWithGoogle}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>
      </div>

      {/* Wavy Splitter (Desktop) */}
      <div className="hidden lg:block absolute top-0 -right-1 h-full w-8 pointer-events-none z-20" style={{ filter: "drop-shadow(-8px 0px 8px rgba(0,0,0,0.05))" }}>
        <svg
          className="h-full w-full fill-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C60,33 60,66 0,100 L100,100 L100,0 Z" />
        </svg>
      </div>

      {/* Wavy Splitter (Mobile) */}
      <div className="lg:hidden absolute bottom-0 left-0 w-full h-10 pointer-events-none z-20" style={{ filter: "drop-shadow(0px -8px 8px rgba(0,0,0,0.05))" }}>
        <svg
          className="w-full h-full fill-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C33,40 66,40 100,100 L0,100 Z" />
        </svg>
      </div>

      {/* "or" divider - Positioned between sections */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 hidden lg:flex items-center justify-center">
        <div className="bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
          <span className="text-[#1E633E] font-semibold underline underline-offset-4">
            or
          </span>
        </div>
      </div>
    </div>
  );
}
