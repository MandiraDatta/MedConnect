// OAuth callback page
"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }

      if (session?.user) {
        console.log("Logged in user:", session.user);
        router.push("/doctor/dashboard");
      } else {
        console.log("No session, redirecting to login");
        router.push("/doctor/login");
      }
    };

    checkSession();
  }, [router]);

  return <div className="text-center mt-20">Logging in with Google...</div>;
}

