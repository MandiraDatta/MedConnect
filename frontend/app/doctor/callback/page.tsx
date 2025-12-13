"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";

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
          await fetch("http://localhost:3004/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.user_metadata?.full_name || "",
              supabaseId: user.id,
            }),
          });
          console.log("User synced with backend!");
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


