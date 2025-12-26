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
import { BACKEND_URL } from "@/lib/config"

export default function DoctorDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [doctor, setDoctor] = useState<any>(null)
  const [totalReports, setTotalReports] = useState(0);
  const [rating, setRating] = useState<number | null>(null);
  const [reports, setReports] = useState([]);




  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/doctor/login")
        return
      }

      setUser(session.user)

      try {
        const response = await fetch(`${BACKEND_URL}/doctor/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.user_metadata?.full_name,
          }),
        })

        const doctorData = await response.json()
        setDoctor(doctorData)
      } catch (error) {
        console.error("Error syncing doctor:", error)
      }

      setLoading(false)
    }

    checkSession()
  }, [router])

  useEffect(() => {
    if (!user) return   // ⛔ wait until login is confirmed

    fetch(`${BACKEND_URL}/report/count`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        // depends on backend response shape
        setTotalReports(
          typeof data === "number" ? data : data.count
        )
      })
      .catch(err => console.error("Failed to fetch report count", err))
  }, [user])

  useEffect(() => {
    if (!user) return
    fetch(`${BACKEND_URL}/doctor/rating`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setRating(data.rating))
      .catch(err => console.error("Failed to fetch rating", err))
  }, [user]);

  useEffect(() => {
    if (!user) return
    fetch(`${BACKEND_URL}/report`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(setReports)
      .catch(err => console.error("Failed to fetch reports", err))
  }, [user]);


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
                Welcome, {doctor.name}👋
              </h1>

              {/* 🔥 CHANGE #7 — safe optional access */}
              <p className="text-muted-foreground">
                {doctor.email}
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
                  <p className="text-2xl font-bold text-foreground">{totalReports}</p>
                </div>
                <FileText className="w-8 h-8 text-primary/50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rating</p>
                  <p className="text-2xl font-bold text-foreground">{rating ?? "No ratings yet"}</p>
                </div>
                <User className="w-8 h-8 text-primary/50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <p className="text-2xl font-bold text-foreground">{doctor.experience ?? 0} years</p>
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



