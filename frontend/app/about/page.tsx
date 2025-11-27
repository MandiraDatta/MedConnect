"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Heart, Globe, Users, Zap } from "lucide-react"

export default function AboutPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Improved Healthcare Access",
      description: "Bridging the gap between patients and healthcare providers in rural areas",
    },
    {
      icon: Globe,
      title: "Telemedicine Integration",
      description: "Connect with doctors remotely for consultations and follow-ups",
    },
    {
      icon: Users,
      title: "Real-time Data",
      description: "Live hospital availability and queue time information",
    },
    {
      icon: Zap,
      title: "Quick Booking",
      description: "Seamless appointment scheduling in just a few clicks",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About MedConnect</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Revolutionizing healthcare access through technology and innovation
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 mb-12 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              MedConnect is dedicated to improving healthcare accessibility, especially in rural and underserved areas.
              We leverage telemedicine and real-time data to connect patients with qualified healthcare providers,
              reducing wait times and making quality healthcare more accessible to everyone.
            </p>
          </Card>

          {/* Benefits Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why MedConnect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <Card key={benefit.title} className="p-6">
                    <div className="flex gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg h-fit">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Government API Section */}
          <Card className="p-8 bg-accent/5 border-accent/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Government Integration</h2>
            <p className="text-foreground/80 mb-4">
              MedConnect is designed to integrate with government healthcare APIs and databases to provide real-time
              information about hospital capacity, doctor availability, and healthcare services across regions.
            </p>
            <p className="text-sm text-muted-foreground">
              This integration enables better resource allocation and helps governments track healthcare metrics
              effectively.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
