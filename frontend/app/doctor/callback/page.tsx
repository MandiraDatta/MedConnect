"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { BACKEND_URL } from "@/lib/config";

export default function DoctorCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Get the logged-in user from Supabase
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user after OAuth:", error);
        return;
      }

      if (user) {
        // Sync with your backend
        try {
         await fetch(`${BACKEND_URL}/doctor-login/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name || "",
              supabaseId: user.id,
              profileImage: user.user_metadata?.avatar_url || user.user_metadata?.picture || "",
              phone: user.user_metadata?.phone || user.phone || "",
            }),
          });
          console.log("Doctor synced with backend!");
        } catch (err) {
          console.error("Error syncing with backend:", err);
        }

        router.push("/doctor/dashboard");
      }
    };

    handleOAuthCallback();
  }, [router]);

  return <div>Logging in…</div>;
}


