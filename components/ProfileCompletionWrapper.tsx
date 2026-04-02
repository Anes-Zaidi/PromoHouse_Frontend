"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export default function ProfileCompletionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      // Don't intercept auth pages and the complete-profile page itself
      if (
        pathname.startsWith('/login') || 
        pathname.startsWith('/signup') || 
        pathname.startsWith('/complete-profile')
      ) {
        setIsChecking(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // If the user is unauthenticated, they can freely browse public pages
          setIsChecking(false);
          return; 
        }

        // Fast-path checking database
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_completed')
          .eq('id', session.user.id)
          .single();

        if (error || !profile) {
          logger.info('error : ',profile)

          console.error("Error fetching profile checking completion:", error);
          setIsChecking(false);
          return;
        }

        if (!profile.is_completed) {
          router.push('/complete-profile');
        } else {
          setIsChecking(false);
        }
      } catch (err) {
        console.error("Critical error in ProfileCompletionWrapper:", err);
        setIsChecking(false);
      }
    };

    checkProfile();
  }, [pathname, router]);

  // loader 
  if (
    isChecking && 
    !pathname.startsWith('/login') && 
    !pathname.startsWith('/signup') && 
    !pathname.startsWith('/complete-profile')
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-[#1E633E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-medium text-gray-500 animate-pulse">Loading profile data...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
