"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReportForm from "@/components/report-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateReport() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const doctorEmail = localStorage.getItem("doctorEmail")
    if (!doctorEmail) {
      router.push("/doctor/login")
      return
    }
    setIsLoading(false)
  }, [router])

  const handleSave = (reportData: any) => {
    const existingReports = JSON.parse(localStorage.getItem("doctorReports") || "[]")
    const newReport = {
      id: `r${Date.now()}`,
      ...reportData,
    }
    existingReports.push(newReport)
    localStorage.setItem("doctorReports", JSON.stringify(existingReports))
    alert("Report created successfully!")
    router.push("/doctor/reports")
  }

  const handleCancel = () => {
    router.push("/doctor/reports")
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/doctor/reports">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New Report</h1>
              <p className="text-muted-foreground">Fill in the patient details and investigation results</p>
            </div>
          </div>

          {/* Report Form */}
          <ReportForm onSave={handleSave} onCancel={handleCancel} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
