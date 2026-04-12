import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
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
