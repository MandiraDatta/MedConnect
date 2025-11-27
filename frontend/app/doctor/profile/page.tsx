"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { mockDoctorProfiles } from "@/lib/mock-data"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function DoctorProfile() {
  const router = useRouter()
  const [doctor, setDoctor] = useState<(typeof mockDoctorProfiles)[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>(null)
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
      setFormData(foundDoctor)
    }
    setIsLoading(false)
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // In production, this would call an API to save changes
  }

  if (isLoading || !doctor || !formData) {
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/doctor/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
              <p className="text-muted-foreground">Manage your professional information</p>
            </div>
          </div>

          {/* Profile Card */}
          <Card className="p-8">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">License Number</label>
                    <Input
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Professional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Specialization</label>
                    <Input
                      value={formData.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Hospital</label>
                    <Input
                      value={formData.hospital}
                      onChange={(e) => handleInputChange("hospital", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <Input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleInputChange("rating", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
                  rows={4}
                />
              </div>

              {/* Qualifications */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Qualifications</h2>
                <div className="space-y-2">
                  {formData.qualifications.map((qual: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-foreground">
                      <span className="text-primary">•</span>
                      <span>{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="gap-2">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
