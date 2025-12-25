"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  availableSlots: string[]
}

export default function DoctorCard({ doctor, hospitalId }: { doctor: Doctor; hospitalId: string }) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
        <p className="text-xs text-muted-foreground mt-1">{doctor.experience} years experience</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">({doctor.rating}/5)</span>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2">Available Slots:</p>
        <div className="flex flex-wrap gap-2">
          {doctor.availableSlots.slice(0, 3).map((slot) => (
            <span key={slot} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {slot}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Button className="w-full">Book Appointment</Button>
        <Button variant="outline" className="w-full bg-transparent">
          <Video className="w-4 h-4 mr-2" />
          Start Video Consultation
        </Button>
      </div>
    </Card>
  )
}
