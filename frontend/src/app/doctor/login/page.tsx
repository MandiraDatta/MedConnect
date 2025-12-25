"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { supabase } from "@/supabaseClient"
import { BACKEND_URL } from "@/lib/config";

export default function DoctorLogin() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  //const BACKEND_URL = "http://localhost:3004"

  // ---------------------------------------
  // 🔥 Redirect if already logged in
  // ---------------------------------------
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace("/doctor/dashboard")
      }
    }
    checkSession()
  }, [router])

  // ---------------------------------------
  // 🔥 Sync Google user with backend
  // ---------------------------------------

  // ---------------------------------------
  // 🔥 EMAIL / PASSWORD LOGIN (FIXED)
  // ---------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Please enter both email and password")
      setLoading(false)
      return
    }

    try {
      // 🔥 CHANGED: signup → login
      const res = await fetch(`${BACKEND_URL}/doctor-login/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        setLoading(false)
        return
      }

      // 🔥 Login successful
      router.replace("/doctor/dashboard")
    } catch {
      setError("Network error. Please try again.")
    }

    setLoading(false)
  }

  // ---------------------------------------
  // 🔥 GOOGLE LOGIN (UNCHANGED)
  // ---------------------------------------
  const handleGoogleLogin = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/doctor/callback",
        queryParams: { prompt: "select_account" },
      },
    })

    if (error) {
      console.error("Google login error:", error.message)
      setLoading(false)
    } else {
      window.location.assign(data.url)
    }
  }

  // ---------------------------------------
  // UI (UNCHANGED)
  // ---------------------------------------
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
              <h1 className="text-2xl font-bold mb-2">
                Doctor Portal
              </h1>
              <p className="text-muted-foreground">
                Sign in to manage your profile and reports
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-1" />
              <span className="mx-2 text-xs text-muted-foreground">
                or
              </span>
              <hr className="flex-1" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

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






