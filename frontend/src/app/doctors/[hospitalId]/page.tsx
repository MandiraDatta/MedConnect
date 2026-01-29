//"use client"
//import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DoctorCard from "@/components/doctor-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { mockHospitals } from "@/lib/mock-data"

export function generateStaticParams() {
  return mockHospitals.map((hospital) => ({
    hospitalId: hospital.id,
  }))
}

export default function DoctorsPage() {
  const params = useParams()
  const hospitalId = params.hospitalId as string

  const hospital = mockHospitals.find((h) => h.id === hospitalId)

  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Hospital not found</h1>
            <Link href="/directory">
              <Button>Back to Directory</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/directory" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>

          {/* Hospital Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{hospital.name}</h1>
            <p className="text-muted-foreground">{hospital.location}</p>
          </div>

          {/* Doctors Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Available Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospital.doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} hospitalId={hospitalId} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
