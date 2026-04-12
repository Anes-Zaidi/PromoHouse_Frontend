"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Check, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion"; // Correction de l'import

export default function Hero() {
  return (
    <div className="relative w-full bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-16 pb-48 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
          
          {/* Left Content */}
          <div className="flex-1 text-white relative z-10 w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full pr-4 p-1.5 mb-8 border border-white/20">
              <Badge className="bg-brand-orange hover:bg-brand-orange-hover text-white px-3 py-1 text-[10px] rounded-full uppercase border-none">
                NEW
              </Badge>
              <span className="text-xs font-semibold mr-2">Save Food, Save Money, Save Planet</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] mb-6 tracking-tight">
              Quality Food at <br className="hidden md:block"/>
              <span className="text-brand-light">Unbeatable Prices</span>
            </h1>
            
            <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl leading-relaxed font-medium">
              Join thousands of smart shoppers buying surplus and near-expiry food from top local dealers. 
              Reduce waste and enjoy premium groceries for up to 70% off.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <Button className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white rounded-full px-8 py-6 text-base font-bold flex items-center justify-center gap-2 border-none">
                Start Shopping <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-white/30 hover:bg-white/10 hover:text-white bg-white/5 text-white rounded-full px-8 py-6 text-base font-bold flex items-center justify-center gap-2">
                <Store size={20} />
                Become a Dealer
              </Button>
            </div>

            <div className="flex items-center gap-6 md:gap-10">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">15k+</p>
                <p className="text-white/70 text-xs md:text-sm font-medium">Active Users</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">500+</p>
                <p className="text-white/70 text-xs md:text-sm font-medium">Verified Dealers</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">20T</p>
                <p className="text-white/70 text-xs md:text-sm font-medium">Food Saved</p>
              </div>
            </div>
          </div>

          {/* Right Content / Image Area */}
          <div className="flex-1 relative w-full mt-10 lg:mt-0 flex justify-center lg:justify-end z-10">
            {/* Image Placeholder Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10 bg-zinc-800">
               {/* Ajoute une image ici plus tard avec <Image src="..." fill /> */}
               <img 
                  src="https://www.linecoaching.com/sites/linecoaching/files/2020-09/Fruits%20l%C3%A9gumes%20saison.jpg" 
                  alt="User" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
            </div>

            {/* Floating Card: Savings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 -right-2.5 sm:right-0 lg:-right-8 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 z-20"
            >
              <div className="bg-emerald-100 text-emerald-600 h-10 w-10 rounded-full flex items-center justify-center">
                <Check size={24} />
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Total Savings</p>
                <p className="text-zinc-900 text-lg font-extrabold">$124.50</p>
              </div>
            </motion.div>

            {/* Floating Card: Review */}
            <motion.div 
              animate={{
                y: [0, 10, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 -left-2.5 sm:left-4 lg:-left-12 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 max-w-[240px] z-20"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary bg-zinc-200 shrink-0">
                <img 
                  src="https://picsum.photos/seed/user/100/100" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={12} className="fill-current" />
                  ))}
                </div>
                <p className="text-zinc-800 text-xs font-semibold mt-1">"Great quality & prices!"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="block w-full h-[60px] md:h-[120px] lg:h-[180px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,256L80,229.3C160,203,320,149,480,144C640,139,800,181,960,192C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}