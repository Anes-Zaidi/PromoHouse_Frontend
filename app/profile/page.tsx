"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import ProfileForm from "./components/ProfileForm";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        logger.info("Fetching user session");
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          logger.warn("No active session found, redirecting to login");
          router.push("/login");
          return;
        }

        logger.info("Session found, fetching profile", { userId: session.user.id });
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        logger.debug(`Calling API: ${backendUrl}/api/profile/${session.user.id}`);
        
        const response = await fetch(`${backendUrl}/api/profile/${session.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "ngrok-skip-browser-warning": "69"
          },
        });

        if (!response.ok) {
          logger.error("Failed to fetch profile from API", { 
            status: response.status,
            statusText: response.statusText,
            url: `${backendUrl}/api/profile/${session.user.id}`
          });
          
          if (response.status === 404) {
            logger.info("Profile not found (404), redirecting to complete-profile");
            router.push("/complete-profile");
            return;
          }
          
          if (response.status === 401) {
            logger.warn("Unauthorized (401), redirecting to login");
            router.push("/login");
            return;
          }
          
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const result = await response.json();
        logger.info("Profile fetched successfully", { userId: result.data?.id });
        setProfile(result.data);
      } catch (err) {
        logger.error("Error fetching profile", { 
          error: err instanceof Error ? err.message : String(err),
          errorType: err instanceof Error ? err.name : typeof err
        });
        logger.info("Redirecting to login due to error");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  if (loading) {
    logger.debug("Rendering loading state");
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    logger.warn("No profile data available, returning null");
    return null;
  }

  logger.debug("Rendering profile page", { userId: profile.id });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4\">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <ProfileForm initialData={profile} />
        </div>
      </div>
    </div>
  );
}
