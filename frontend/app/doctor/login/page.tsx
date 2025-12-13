"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { supabase } from "@/supabaseClient"

export default function DoctorLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // ⭐ FIX — Correct backend URL
  const BACKEND_URL = "http://localhost:3004";

  // ⭐ FIX — Sync function correctly placed ABOVE handleLogin
  const syncUserWithBackend = async (user: any) => {
    console.log("SYNC FUNCTION TRIGGERED → user:", user);

    try {
      const response = await fetch(`${BACKEND_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.user_metadata?.full_name || "",
          supabaseId: user.id,
        }),
      });

      const result = await response.json();
      console.log("Sync Response:", result);
    } catch (err) {
      console.error("Error syncing user:", err);
    }
  };

  // ⭐ FIX — handleLogin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Please enter both email and password")
      setLoading(false)
      return
    }

    // ⭐ FIX — Actual supabase login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      console.log("Supabase login success:", data.user);

      // ⭐ FIX — THE MOST IMPORTANT LINES
      await syncUserWithBackend(data.user);
      console.log("SYNC DONE → Redirecting…");

      router.push("/doctor/dashboard");
    }

    setLoading(false)
  };


 const handleGoogleLogin = async () => {
  setLoading(true);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/doctor/callback",
      queryParams: { prompt: "select_account" },
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
    setLoading(false);
  } else {
    // No need to manually sync here; callback will handle it
    window.location.assign(data.url);
  }
};
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-1 px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="bg-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Doctor Portal</h1>
              <p className="text-muted-foreground">Sign in to manage your profile and reports</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@medconnect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-t border-muted mr-2" />
              <span className="text-xs text-muted-foreground">or</span>
              <hr className="flex-1 border-t border-muted ml-2" />
            </div>

            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
              Sign in with Google
            </Button>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Email: sarah.johnson@medconnect.com</p>
              <p className="text-xs text-muted-foreground">Password: demo123</p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Not a doctor?{" "}
              <Link href="/" className="text-primary hover:underline">
                Go back home
              </Link>
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}





