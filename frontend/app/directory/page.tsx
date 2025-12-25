"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HospitalCard from "@/components/hospital-card"
import FilterPanel from "@/components/filter-panel"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { mockHospitals } from "@/lib/mock-data"
import MapView from "@/components/maps/mapview";


export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedDistance, setSelectedDistance] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [clinics, setClinics] = useState<google.maps.places.PlaceResult[]>([])

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


          {/* Map Section */}
          <div className="mb-8 rounded-xl overflow-hidden border">
            <MapView onClinicsFound={setClinics} />
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

            {/* Nearby Clinics / Doctors Cards */}
            <div className="lg:col-span-3">
              {clinics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {clinics.map((place: google.maps.places.PlaceResult) => (
                    <div
                      key={place.place_id}
                      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-lg">
                        {place.name}
                      </h3>

                      {place.vicinity && (
                        <p className="text-sm text-gray-600 mt-1">
                          {place.vicinity}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-2 text-sm">
                        {place.rating && (
                          <span>⭐ {place.rating}</span>
                        )}

                        {place.user_ratings_total && (
                          <span className="text-gray-500">
                            ({place.user_ratings_total} reviews)
                          </span>
                        )}
                      </div>

                      {place.opening_hours?.open_now !== undefined && (
                        <p
                          className={`mt-2 text-sm font-medium ${place.opening_hours.open_now
                              ? "text-green-600"
                              : "text-red-600"
                            }`}
                        >
                          {place.opening_hours.open_now
                            ? "Open now"
                            : "Closed"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No clinics found nearby.
                  </p>
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
