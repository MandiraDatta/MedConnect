"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/supabaseClient"
import { BACKEND_URL } from "@/lib/config"

export default function DoctorProfile() {
  const router = useRouter()
  const [doctor, setDoctor] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [supabaseId, setSupabaseId] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctorData = async () => {
      // Get Supabase session
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/doctor/login")
        return
      }

      setSupabaseId(session.user.id)

      // Fetch doctor data from backend
      try {
        const response = await fetch(`${BACKEND_URL}/doctor-login/me/${session.user.id}`)
        const doctorData = await response.json()

        if (!doctorData.error) {
          setDoctor(doctorData)
          setFormData(doctorData)
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error)
      }

      setIsLoading(false)
    }

    fetchDoctorData()
  }, [router, supabase])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    if (!supabaseId) return

    try {
      const response = await fetch(`${BACKEND_URL}/doctor-login/me/${supabaseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          profileImage: formData.profileImage,
        }),
      })

      const updatedDoctor = await response.json()
      if (!updatedDoctor.error) {
        setDoctor(updatedDoctor)
        setFormData(updatedDoctor)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error saving doctor data:", error)
    }
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
                      value={formData.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      value={formData.email || ""}
                      disabled={true}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Profile Image URL</label>
                    <Input
                      value={formData.profileImage || ""}
                      onChange={(e) => handleInputChange("profileImage", e.target.value)}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Created:</strong> {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Last Login:</strong> {formData.lastLoginAt ? new Date(formData.lastLoginAt).toLocaleDateString() : "Never"}</p>
                  <p><strong>Supabase ID:</strong> {formData.supabaseId || "N/A"}</p>
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
