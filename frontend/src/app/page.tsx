"use client";

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, MessageSquare, Calendar } from "lucide-react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const features = [
    {
      icon: MapPin,
      title: "Find Hospital",
      description: "Locate nearby hospitals with real-time availability",
      href: "/directory",
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule appointments with available doctors",
      href: "/directory",
    },
    {
      icon: MessageSquare,
      title: "Symptom Checker",
      description: "AI-powered triage to understand your symptoms",
      href: "/symptom-checker",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Find Doctors, Book Appointments, Save Time
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Connect with nearby hospitals and doctors instantly. Check availability, view queue times, and book your
            appointment in seconds.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search hospital, doctor, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base"
              />
            </div>
            <Link href="/directory">
              <Button size="lg" className="w-full sm:w-auto">
                Search
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.title} href={feature.href}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-lg mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
