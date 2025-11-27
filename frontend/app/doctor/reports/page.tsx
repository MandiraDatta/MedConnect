"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockDoctorProfiles } from "@/lib/mock-data"
import { ArrowLeft, FileText, CheckCircle, Clock, Plus } from "lucide-react"
import Link from "next/link"

export default function DoctorReports() {
  const router = useRouter()
  const [doctor, setDoctor] = useState<(typeof mockDoctorProfiles)[0] | null>(null)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const doctorEmail = localStorage.getItem("doctorEmail")
    if (!doctorEmail) {
      router.push("/doctor/login")
      return
    }

    const foundDoctor = mockDoctorProfiles.find((d) => d.email === doctorEmail)
    if (foundDoctor) {
      setDoctor(foundDoctor)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading || !doctor) {
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

  const completedReports = doctor.reports.filter((r) => r.status === "Completed")
  const pendingReports = doctor.reports.filter((r) => r.status === "Pending")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/doctor/dashboard">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
                <p className="text-muted-foreground">View and manage patient reports</p>
              </div>
            </div>
            <Link href="/doctor/reports/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Report
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">{completedReports.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">{pendingReports.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Reports List */}
          {selectedReport ? (
            // Report Detail View
            <Card className="p-8">
              <Button variant="outline" onClick={() => setSelectedReport(null)} className="mb-6 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Reports
              </Button>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{selectedReport.type}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Patient Name</p>
                      <p className="text-lg font-semibold text-foreground">{selectedReport.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="text-lg font-semibold text-foreground">{selectedReport.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        {selectedReport.status === "Completed" ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-lg font-semibold text-green-600">Completed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-5 h-5 text-yellow-500" />
                            <span className="text-lg font-semibold text-yellow-600">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Findings</h3>
                  <p className="text-foreground leading-relaxed">{selectedReport.findings}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button>Download Report</Button>
                  <Button variant="outline">Share with Patient</Button>
                </div>
              </div>
            </Card>
          ) : (
            // Reports List View
            <div className="space-y-4">
              {doctor.reports.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No reports yet</p>
                  <Link href="/doctor/reports/create">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Your First Report
                    </Button>
                  </Link>
                </Card>
              ) : (
                doctor.reports.map((report) => (
                  <Card
                    key={report.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold text-foreground">{report.type}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Patient: {report.patientName}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {report.status === "Completed" ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-green-600">Completed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
