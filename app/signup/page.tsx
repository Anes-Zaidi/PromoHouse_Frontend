"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>("firstName");

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}` : undefined,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      logger.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-[#141414]">
      {/* Left Panel (Desktop) / Top Panel (Mobile) */}
      <div className="relative bg-[#1E633E] lg:w-[45%] p-8 lg:p-16 flex flex-col items-center lg:items-start justify-center overflow-hidden">
        
        {/* Back to Home Link */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/">
            <button className="text-white hover:bg-white/10 flex items-center gap-2 rounded-full px-4 py-2 opacity-80 hover:opacity-100 transition-all">
              <ArrowLeft size={18} />
              <span className="font-semibold text-sm">Back to Home</span>
            </button>
          </Link>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 lg:mb-24 z-10 mt-8 lg:mt-0">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-8 h-8 text-[#1E633E]"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.8 9.8a7 7 0 0 1-13.9 2.1" />
              <path d="M9 10c0-1.5 1.5-3 3-3" />
            </svg>
          </div>
          <h1 className="text-white text-3xl lg:text-4xl font-serif font-bold tracking-tight">
            PromoHouse
          </h1>
        </div>

        {/* Quote Section */}
        <div className="relative max-w-md z-10 text-center lg:text-left mb-12 lg:mb-20">
          <span className="absolute -top-6 -left-4 text-[#F27D26] text-4xl font-serif">
            “
          </span>
          <p className="text-white text-lg lg:text-xl leading-relaxed">
            Find surplus and near-expiry food at{" "}
            <span className="font-bold">discounted</span> prices near you. while{" "}
            <span className="font-bold">saving money</span> on everyday
            essentials.
          </p>
          <span className="absolute -bottom-6 -right-4 text-[#F27D26] text-4xl font-serif">
            ”
          </span>
        </div>

        {/* Social Sign Up */}
        <div className="flex flex-col items-center lg:items-start z-10 w-full max-w-sm">
          <p className="text-white/80 text-sm font-medium mb-6">
            Join PromoHouse By
          </p>
          <button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md transition-all active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </button>
        </div>

        {/* Wavy Divider (Desktop) */}
        <div className="hidden lg:block absolute top-0 -right-1 h-full w-32 pointer-events-none">
          <svg
            className="h-full w-full fill-white"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
          >
            <path d="M0 0 C 50 0, 50 150, 0 300 C -50 450, 50 550, 0 700 C -50 850, 50 1000, 0 1000 L 100 1000 L 100 0 Z" />
          </svg>
        </div>

        {/* Wavy Divider (Mobile) */}
        <div className="lg:hidden absolute bottom-0 left-0 w-full h-16 pointer-events-none">
          <svg
            className="w-full h-full fill-white"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 150 50, 350 50, 500 100 C 650 150, 850 150, 1000 100 L 1000 100 L 0 100 Z" />
          </svg>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex-1 p-8 lg:p-16 flex flex-col items-center justify-center relative">
        {/* "or" divider - Positioned between sections */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <span className="text-[#1E633E] font-medium underline underline-offset-4">
              or
            </span>
          </div>
        </div>

        {/* Mobile "or" divider */}
        <div className="lg:hidden flex items-center gap-4 w-full max-w-sm mb-8 -mt-12 z-20">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-[#1E633E] font-medium underline underline-offset-4">
            or
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
            Create Account
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* First Name */}
            <div className="relative">
              <div
                className={`group border-2 rounded-2xl p-4 transition-all duration-300 ${
                  activeField === "firstName"
                    ? "border-[#F27D26] shadow-[0_0_20px_rgba(242,125,38,0.3)]"
                    : "border-gray-200 hover:border-[#1E633E]"
                }`}
              >
                <label className="block text-sm font-bold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  onFocus={() => setActiveField("firstName")}
                />
                {activeField === "firstName" && (
                  <motion.div
                    layoutId="cursor"
                    className="absolute right-8 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      className="w-5 h-5 text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.11 18.03L11.57 12.35L17.25 10.81L7.05 4L13.11 18.03Z" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div
              className={`group border-2 rounded-2xl p-4 transition-all duration-300 ${
                activeField === "lastName"
                  ? "border-[#F27D26] shadow-[0_0_20px_rgba(242,125,38,0.3)]"
                  : "border-gray-200 hover:border-[#1E633E]"
              }`}
            >
              <label className="block text-sm font-bold mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                onFocus={() => setActiveField("lastName")}
              />
            </div>

            {/* Password */}
            <div
              className={`group border-2 rounded-2xl p-4 transition-all duration-300 relative ${
                activeField === "password"
                  ? "border-[#F27D26] shadow-[0_0_20px_rgba(242,125,38,0.3)]"
                  : "border-gray-200 hover:border-[#1E633E]"
              }`}
            >
              <label className="block text-sm font-bold mb-1">Password</label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  onFocus={() => setActiveField("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div
              className={`group border-2 rounded-2xl p-4 transition-all duration-300 relative ${
                activeField === "confirmPassword"
                  ? "border-[#F27D26] shadow-[0_0_20px_rgba(242,125,38,0.3)]"
                  : "border-gray-200 hover:border-[#1E633E]"
              }`}
            >
              <label className="block text-sm font-bold mb-1">
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  onFocus={() => setActiveField("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button className="w-full bg-[#1E633E] hover:bg-[#164d30] text-white font-bold py-4 rounded-2xl shadow-[0_10px_30px_rgba(30,99,62,0.3)] transition-all active:scale-[0.98] mt-8">
              Sign up
            </button>

            {/* Login Link */}
            <p className="text-center text-sm font-medium text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#F27D26] hover:underline font-bold transition-all"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}