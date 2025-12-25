"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, PhoneCall } from "lucide-react" // 🔴 NEW ICON

export default function Navbar() {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors"
        >
          <div className="bg-primary p-2 rounded-lg">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>MedConnect</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/directory" className="text-foreground hover:text-primary transition-colors">
            Directory
          </Link>
          <Link href="/symptom-checker" className="text-foreground hover:text-primary transition-colors">
            Symptom Checker
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/doctor/login" className="text-foreground hover:text-primary transition-colors">
            Doctor Portal
          </Link>

          {/* ================= NEW: EMERGENCY CONTACT ================= */}
          <a
            href="tel:108"
            className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="font-semibold">Emergency 108</span>
          </a>
        </div>

        {/* Mobile Emergency + Menu */}
        <div className="md:hidden flex items-center gap-2">
          
          {/* 🔴 NEW: MOBILE EMERGENCY BUTTON */}
          <a href="tel:108">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              <PhoneCall className="w-4 h-4" />
            </Button>
          </a>

          <Button variant="outline" size="sm">
            Menu
          </Button>
        </div>

      </div>
    </nav>
  )
}

