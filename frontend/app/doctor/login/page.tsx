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

  // Email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else if (data.session) {
      router.push("/doctor/dashboard")
    }
  }

  // Google login
 const handleGoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/doctor/callback",
      queryParams: { prompt: "select_account" }, // force Google account chooser
    },
  });

  if (error) console.error("Google login error:", error.message);
  else window.location.assign(data.url);
};


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-1 px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Doctor Portal</h1>
              <p className="text-muted-foreground">Sign in to manage your profile and reports</p>
            </div>

            {/* Email/Password Form */}
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

            {/* OR Separator */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-t border-muted mr-2" />
              <span className="text-xs text-muted-foreground">or</span>
              <hr className="flex-1 border-t border-muted ml-2" />
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Email: sarah.johnson@medconnect.com</p>
              <p className="text-xs text-muted-foreground">Password: demo123</p>
            </div>

            {/* Footer */}
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


