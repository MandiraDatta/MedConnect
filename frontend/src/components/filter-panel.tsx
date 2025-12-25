"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface FilterPanelProps {
  selectedSpecialization: string
  setSelectedSpecialization: (value: string) => void
  selectedDistance: string
  setSelectedDistance: (value: string) => void
  selectedAvailability: string
  setSelectedAvailability: (value: string) => void
}

export default function FilterPanel({
  selectedSpecialization,
  setSelectedSpecialization,
  selectedDistance,
  setSelectedDistance,
  selectedAvailability,
  setSelectedAvailability,
}: FilterPanelProps) {
  const specializations = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General"]
  const distances = ["5 km", "10 km", "20 km"]
  const availabilities = ["Available", "Full"]

  return (
    <Card className="p-6 h-fit">
      <h3 className="font-semibold text-foreground mb-6">Filters</h3>

      {/* Specialization Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">Specialization</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="specialization"
              value="all"
              checked={selectedSpecialization === "all"}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm text-foreground">All</span>
          </label>
          {specializations.map((spec) => (
            <label key={spec} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="specialization"
                value={spec}
                checked={selectedSpecialization === spec}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">{spec}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Distance Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">Distance</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="distance"
              value="all"
              checked={selectedDistance === "all"}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm text-foreground">All</span>
          </label>
          {distances.map((dist) => (
            <label key={dist} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="distance"
                value={dist.split(" ")[0]}
                checked={selectedDistance === dist.split(" ")[0]}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">Within {dist}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Availability</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="all"
              checked={selectedAvailability === "all"}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm text-foreground">All</span>
          </label>
          {availabilities.map((avail) => (
            <label key={avail} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value={avail}
                checked={selectedAvailability === avail}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">{avail}</span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  )
}
