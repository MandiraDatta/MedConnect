"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockDoctorProfiles } from "@/lib/mock-data"
import { LogOut, FileText, User, Clock } from "lucide-react"

export default function DoctorDashboard() {
  const router = useRouter()
  const [doctor, setDoctor] = useState<(typeof mockDoctorProfiles)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const doctorEmail = localStorage.getItem("doctorEmail")
    if (!doctorEmail) {
      router.push("/doctor/login")
      return
    }

    // Mock: Find doctor by email
    const foundDoctor = mockDoctorProfiles.find((d) => d.email === doctorEmail)
    if (foundDoctor) {
      setDoctor(foundDoctor)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("doctorEmail")
    router.push("/doctor/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Doctor not found</p>
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {doctor.name}</h1>
              <p className="text-muted-foreground">
                {doctor.specialization} • {doctor.hospital}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{doctor.reports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary/50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rating</p>
                  <p className="text-2xl font-bold text-foreground">{doctor.rating}/5.0</p>
                </div>
                <User className="w-8 h-8 text-primary/50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <p className="text-2xl font-bold text-foreground">{doctor.experience} years</p>
                </div>
                <Clock className="w-8 h-8 text-primary/50" />
              </div>
            </Card>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/doctor/profile">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">My Profile</h3>
                    <p className="text-sm text-muted-foreground">View and edit your professional profile</p>
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
                    <p className="text-sm text-muted-foreground">View and manage patient reports</p>
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
