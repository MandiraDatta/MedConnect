"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users } from "lucide-react"

interface Hospital {
  id: string
  name: string
  location: string
  distance: number
  availability: "Available" | "Full"
  queueTime: number
  specializations: string[]
  doctors: any[]
}

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  const availabilityColor = hospital.availability === "Available" ? "text-green-600" : "text-red-600"
  const availabilityBg = hospital.availability === "Available" ? "bg-green-50" : "bg-red-50"

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{hospital.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            {hospital.location}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${availabilityBg} ${availabilityColor}`}>
          {hospital.availability}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">
            Queue time: <strong>{hospital.queueTime} mins</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">
            <strong>{hospital.doctors.length}</strong> doctors available
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hospital.specializations.slice(0, 2).map((spec) => (
            <span key={spec} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {spec}
            </span>
          ))}
          {hospital.specializations.length > 2 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
              +{hospital.specializations.length - 2} more
            </span>
          )}
        </div>
      </div>

      <Link href={`/doctors/${hospital.id}`}>
        <Button className="w-full">View Doctors & Book</Button>
      </Link>
    </Card>
  )
}
