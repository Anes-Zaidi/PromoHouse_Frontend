"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.png";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
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
    <div className="min-h-screen bg-brand-dark flex flex-col pt-12 sm:pt-20 pb-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Back to Home Link*/}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex items-center gap-2 rounded-full px-4 py-2 opacity-80 hover:opacity-100 transition-opacity">
            <ArrowLeft size={18} />
            <span className="font-semibold text-sm">Back to Home</span>
          </Button>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mt-12">
        <div className="flex justify-center flex-col items-center">
          <div className="relative w-16 h-16 shadow-lg rounded-2xl overflow-hidden mb-6 border-2 border-brand-border bg-white flex items-center justify-center p-2">
            <Image
              src={logo}
              alt="PromoHouse Logo"
              className="object-contain"
              fill
              priority
            />
          </div>
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="mt-3 text-center text-sm md:text-base text-white/80 font-medium max-w-sm">
            Join thousands of smart shoppers buying premium surplus food for less.
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border-4 border-brand-border animate-in fade-in slide-in-from-bottom duration-500">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Sign Up</h3>
            <p className="text-sm text-zinc-500 mt-1">Get started securely using your Google account.</p>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full flex justify-center py-6 px-4 border-2 border-zinc-200 rounded-full shadow-sm bg-white text-base font-bold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all hover:-translate-y-0.5"
              onClick={handleGoogleSignIn}
            >
              <span className="sr-only">Sign up with Google</span>
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500">
            By signing up, you agree to our <a href="#" className="font-semibold text-brand-primary hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-brand-primary hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </div>

      {/* Bottom Wave Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
        <svg
          className="block w-full h-15 md:h-30 lg:h-45"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,256L80,229.3C160,203,320,149,480,144C640,139,800,181,960,192C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
