"use client"; // <--- Obligatoire car tu utilises useState et useEffect

import React, { useState, useEffect } from 'react';
import { 
  User,
  X,
  CheckCircle2
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

// --- Imports des composants (Vérifie bien que ces dossiers existent) ---
// Note: Utilise ../ pour remonter au dossier src
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import LatestDeals from '../sections/LatestDeals';
import BestDealsOfWeek from '../sections/BestDealsOfWeek';
import TopRatedSellers from '../sections/TopRatedSellers';
import HowItWorks from '../sections/HowItWorks';
import StatsAndTestimonials from '../sections/StatsAndTestimonials';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

// --- Sub-Components ---

const Notification = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className="fixed top-4 left-1/2 z-[200] bg-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white"
    >
      <CheckCircle2 className="text-white" size={24} />
      <span className="font-bold text-lg">{message}</span>
    </motion.div>
  );
};

const SignUpModal = ({ onClose, onAction }: { onClose: () => void, onAction: (msg: string) => void }) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <div className="bg-green-600/10 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Join PromoHouse</h2>
          <p className="text-zinc-500">Start saving food and money today!</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-green-600 outline-none transition-all text-black" />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
            <input type="email" placeholder="john@example.com" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-green-600 outline-none transition-all text-black" />
          </div>
          <button 
            onClick={() => {
              onAction("Welcome to PromoHouse! Check your email to verify.");
              onClose();
            }}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg active:scale-95 mt-4"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-zinc-400 text-sm mt-6">
          Already have an account? <button onClick={() => onAction("Opening Login...")} className="text-green-600 font-bold hover:underline">Log In</button>
        </p>
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const handleAction = (message: string) => {
    setNotification(message);
    
    // Simple routing logic
    if (message.toLowerCase().includes("redirecting to home")) setCurrentPage('home');
    if (message.toLowerCase().includes("redirecting to deals") || message.toLowerCase().includes("view all")) setCurrentPage('deals');
    if (message.toLowerCase().includes("about us")) setCurrentPage('about');
    
    if (message.toLowerCase().includes("reserving") || message.toLowerCase().includes("grabbing")) {
      setCartCount(prev => prev + 1);
    }
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'deals':
        return (
          <div className="py-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">All Deals</h1>
            <LatestDeals onAction={handleAction} />
            <div className="mt-12">
              <BestDealsOfWeek onAction={handleAction} />
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="py-20 px-4 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">About PromoHouse</h1>
            <p className="text-zinc-600 text-lg leading-relaxed">
              PromoHouse is on a mission to reduce food waste in Algeria by connecting consumers with local businesses offering surplus food at discounted prices.
            </p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="mt-10 bg-green-600 text-white px-8 py-3 rounded-2xl font-bold"
            >
              Back to Home
            </button>
          </div>
        );
      default:
        return (
          <>
            <Hero onAction={handleAction} />
            <LatestDeals onAction={handleAction} />
            <BestDealsOfWeek onAction={handleAction} />
            <TopRatedSellers onAction={handleAction} />
            <HowItWorks />
            <StatsAndTestimonials />
            <CTA onAction={handleAction} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar 
        onSignUp={() => setIsSignUpOpen(true)} 
        onAction={handleAction} 
        cartCount={cartCount}
      />
      <main>
        {renderContent()}
      </main>
      <Footer onAction={handleAction} />

      <AnimatePresence>
        {isSignUpOpen && (
          <SignUpModal 
            onClose={() => setIsSignUpOpen(false)} 
            onAction={handleAction}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <Notification 
            message={notification} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}