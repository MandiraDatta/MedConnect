"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SymptomChat from "@/components/symptom-chat"

export default function SymptomCheckerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Symptom Checker</h1>
            <p className="text-muted-foreground">
              Describe your symptoms and get AI-powered guidance on what to do next
            </p>
          </div>

          <SymptomChat />
        </div>
      </main>

      <Footer />
    </div>
  )
}
