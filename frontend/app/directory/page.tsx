"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HospitalCard from "@/components/hospital-card"
import FilterPanel from "@/components/filter-panel"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { mockHospitals } from "@/lib/mock-data"

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedDistance, setSelectedDistance] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")

  const filteredHospitals = mockHospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialization =
      selectedSpecialization === "all" || hospital.specializations.includes(selectedSpecialization)

    const matchesDistance =
      selectedDistance === "all" ||
      (selectedDistance === "5" && hospital.distance <= 5) ||
      (selectedDistance === "10" && hospital.distance <= 10) ||
      (selectedDistance === "20" && hospital.distance <= 20)

    const matchesAvailability = selectedAvailability === "all" || hospital.availability === selectedAvailability

    return matchesSearch && matchesSpecialization && matchesDistance && matchesAvailability
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Directory</h1>
            <p className="text-muted-foreground">Find and book appointments at nearby hospitals</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by hospital name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base"
              />
            </div>
          </div>

          {/* Filters and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <FilterPanel
              selectedSpecialization={selectedSpecialization}
              setSelectedSpecialization={setSelectedSpecialization}
              selectedDistance={selectedDistance}
              setSelectedDistance={setSelectedDistance}
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={setSelectedAvailability}
            />

            {/* Hospital Cards */}
            <div className="lg:col-span-3">
              {filteredHospitals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredHospitals.map((hospital) => (
                    <HospitalCard key={hospital.id} hospital={hospital} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No hospitals found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
