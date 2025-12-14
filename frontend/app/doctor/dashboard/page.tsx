"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/supabaseClient"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, FileText, User, Clock } from "lucide-react"
import Link from "next/link"

export default function DoctorDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [doctor, setDoctor] = useState<any>(null)

  const BACKEND_URL = "http://localhost:3004"

  useEffect(() => {
    // 🔥 CHANGE #1 — wrap async logic safely
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      // 🔥 CHANGE #2 — use replace instead of push
      if (!session) {
        router.replace("/doctor/login")
        return
      }

      // 🔥 CHANGE #3 — store user safely
      setUser(session.user)

      // 🔥 NEW — Fetch doctor data from backend
      try {
        const response = await fetch(`${BACKEND_URL}/doctor-login/me/${session.user.id}`)
        const doctorData = await response.json()
        if (!doctorData.error) {
          setDoctor(doctorData)
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error)
      }

      setLoading(false)
    }

    checkSession()
  }, [router])

  // 🔥 CHANGE #4 — safer logout handling
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/doctor/login")
  }

  // 🔥 CHANGE #5 — avoid rendering UI before auth check
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
              {/* 🔥 CHANGE #6 — dynamic greeting */}
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome, {doctor?.name || "Doctor"} 👋
              </h1>

              {/* 🔥 CHANGE #7 — safe optional access */}
              <p className="text-muted-foreground">
                {user?.email || doctor?.email}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <FileText className="w-8 h-8 text-primary/50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.9</p>
                </div>
                <User className="w-8 h-8 text-primary/50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <p className="text-2xl font-bold text-foreground">6 years</p>
                </div>
                <Clock className="w-8 h-8 text-primary/50" />
              </div>
            </Card>
          </div>

          {/* NAVIGATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/doctor/profile">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">My Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      View and edit your professional profile
                    </p>
                  </div>
                  <User className="w-6 h-6 text-primary" />
                </div>
              </Card>
            </Link>

            <Link href="/doctor/reports">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">My Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      View and manage patient reports
                    </p>
                  </div>
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </Card>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}



