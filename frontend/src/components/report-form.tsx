"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save } from "lucide-react"

interface Investigation {
  id: string
  name: string
  observedValue: string
  unit: string
  referenceInterval: string
}

interface ReportFormProps {
  onSave?: (reportData: any) => void
  onCancel?: () => void
}

export default function ReportForm({ onSave, onCancel }: ReportFormProps) {
  const [patientName, setPatientName] = useState("")
  const [patientPID, setPatientPID] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [patientSex, setPatientSex] = useState("Male")
  const [reportType, setReportType] = useState("Complete Blood Count")
  const [sampleReceivedDate, setSampleReceivedDate] = useState("")
  const [reportedDate, setReportedDate] = useState("")
  const [vioNumber, setVioNumber] = useState("")
  const [investigations, setInvestigations] = useState<Investigation[]>([
    { id: "1", name: "", observedValue: "", unit: "", referenceInterval: "" },
  ])
  const [findings, setFindings] = useState("")

  const addInvestigation = () => {
    const newId = (Math.max(...investigations.map((i) => Number.parseInt(i.id)), 0) + 1).toString()
    setInvestigations([...investigations, { id: newId, name: "", observedValue: "", unit: "", referenceInterval: "" }])
  }

  const removeInvestigation = (id: string) => {
    if (investigations.length > 1) {
      setInvestigations(investigations.filter((i) => i.id !== id))
    }
  }

  const updateInvestigation = (id: string, field: keyof Investigation, value: string) => {
    setInvestigations(investigations.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  const handleSave = () => {
    const reportData: {
      patientName: string
      patientPID: string
      patientAge: string
      patientSex: string
      reportType: string
      sampleReceivedDate: string
      reportedDate: string
      vioNumber: string
      investigations: Investigation[]
      findings: string
      date: string
      status: string
    } = {
      patientName,
      patientPID,
      patientAge,
      patientSex,
      reportType,
      sampleReceivedDate,
      reportedDate,
      vioNumber,
      investigations: investigations.filter((i) => i.name.trim() !== ""),
      findings,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
    }

    if (onSave) {
      onSave(reportData)
    } else {
      console.log("Report saved:", reportData)
      alert("Report saved successfully!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Patient Information Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patientName" className="text-sm font-medium text-foreground">
              Patient Name
            </Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="patientPID" className="text-sm font-medium text-foreground">
              PID (Patient ID)
            </Label>
            <Input
              id="patientPID"
              value={patientPID}
              onChange={(e) => setPatientPID(e.target.value)}
              placeholder="e.g., NCQ20251101183555"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="patientAge" className="text-sm font-medium text-foreground">
              Age
            </Label>
            <Input
              id="patientAge"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              placeholder="e.g., 07 Y"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="patientSex" className="text-sm font-medium text-foreground">
              Sex
            </Label>
            <select
              id="patientSex"
              value={patientSex}
              onChange={(e) => setPatientSex(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Report Information Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Report Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reportType" className="text-sm font-medium text-foreground">
              Report Type
            </Label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option>Complete Blood Count</option>
              <option>Cardiac Assessment</option>
              <option>ECG Report</option>
              <option>MRI Report</option>
              <option>X-Ray Report</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="vioNumber" className="text-sm font-medium text-foreground">
              VIO Number
            </Label>
            <Input
              id="vioNumber"
              value={vioNumber}
              onChange={(e) => setVioNumber(e.target.value)}
              placeholder="e.g., A/28365"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="sampleReceivedDate" className="text-sm font-medium text-foreground">
              Sample Received Date
            </Label>
            <Input
              id="sampleReceivedDate"
              type="date"
              value={sampleReceivedDate}
              onChange={(e) => setSampleReceivedDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="reportedDate" className="text-sm font-medium text-foreground">
              Reported Date
            </Label>
            <Input
              id="reportedDate"
              type="date"
              value={reportedDate}
              onChange={(e) => setReportedDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Investigations Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Investigations</h2>
          <Button onClick={addInvestigation} size="sm" variant="outline" className="gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            Add Investigation
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Investigation</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Observed Value</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Unit</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Reference Interval</th>
                <th className="text-center py-3 px-3 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {investigations.map((investigation) => (
                <tr key={investigation.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-3">
                    <Input
                      value={investigation.name}
                      onChange={(e) => updateInvestigation(investigation.id, "name", e.target.value)}
                      placeholder="e.g., Total WBC Count"
                      className="text-sm"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <Input
                      value={investigation.observedValue}
                      onChange={(e) => updateInvestigation(investigation.id, "observedValue", e.target.value)}
                      placeholder="e.g., 7200"
                      className="text-sm"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <Input
                      value={investigation.unit}
                      onChange={(e) => updateInvestigation(investigation.id, "unit", e.target.value)}
                      placeholder="e.g., /L"
                      className="text-sm"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <Input
                      value={investigation.referenceInterval}
                      onChange={(e) => updateInvestigation(investigation.id, "referenceInterval", e.target.value)}
                      placeholder="e.g., 4000-11000"
                      className="text-sm"
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Button
                      onClick={() => removeInvestigation(investigation.id)}
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Findings Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Findings & Remarks</h2>
        <Textarea
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          placeholder="Enter clinical findings and remarks..."
          className="min-h-32"
        />
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        )}
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Report
        </Button>
      </div>
    </div>
  )
}
