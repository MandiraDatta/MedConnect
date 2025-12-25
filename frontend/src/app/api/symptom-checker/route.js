import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(req) {
  try {
    const { age, gender, symptoms } = await req.json();
    if (!symptoms || typeof symptoms !== "string" || symptoms.trim().length < 3) {
  return new Response(
    JSON.stringify({
      error: "Please provide valid symptoms.",
    }),
    { status: 400 }
  );
}


    const text = (symptoms || "").toLowerCase();

    /* ================================
       1. FEATURE EXTRACTION
       ================================ */
    const features = {
      fever: text.includes("fever"),
      chestPain: text.includes("chest"),
      breathingIssue: text.includes("breathing"),
      vomiting: text.includes("vomit"),
      diarrhea: text.includes("diarrhea"),
      dizziness: text.includes("dizzy"),
      headache: text.includes("headache"),
      fatigue: text.includes("fatigue"),
    };

    /* ================================
       2. SEVERITY SCORING (TRIAGE)
       ================================ */
    let severityScore = 0;
    const reasoning = [];

    if (features.chestPain) {
      severityScore += 5;
      reasoning.push("Chest pain may indicate a cardiac or serious condition");
    }

    if (features.breathingIssue) {
      severityScore += 5;
      reasoning.push("Breathing difficulty can be life-threatening");
    }

    if (features.fever) {
      severityScore += 2;
      reasoning.push("Fever suggests possible infection");
    }

    if (features.vomiting || features.diarrhea) {
      severityScore += 2;
      reasoning.push("Vomiting/diarrhea can cause dehydration");
    }

    if (features.dizziness) {
      severityScore += 2;
      reasoning.push("Dizziness may indicate low blood pressure or weakness");
    }

    if (features.fatigue || features.headache) {
      severityScore += 1;
      reasoning.push("Fatigue/headache usually indicate mild illness");
    }

    /* ================================
       3. URGENCY CLASSIFICATION
       ================================ */
    let urgency = "LOW";

    if (severityScore >= 7) urgency = "HIGH";
    else if (severityScore >= 3) urgency = "MEDIUM";

    // 🚨 Emergency override
    if (features.chestPain && features.breathingIssue) {
      urgency = "CRITICAL";
    }

    /* ================================
       4. MEDICAL RESPONSE LOGIC
       ================================ */
    let possibleCauses = [];
    let recommendations = [];

    switch (urgency) {
      case "CRITICAL":
        possibleCauses = [
          "Cardiac emergency",
          "Severe respiratory condition",
        ];
        recommendations = [
          "Seek emergency medical care immediately",
          "Call local emergency services",
          "Do not delay treatment",
        ];
        break;

      case "HIGH":
        possibleCauses = [
          "Serious infection",
          "Acute medical condition",
        ];
        recommendations = [
          "Consult a doctor urgently",
          "Avoid physical exertion",
          "Monitor symptoms closely",
        ];
        break;

      case "MEDIUM":
        possibleCauses = [
          "Viral or bacterial infection",
          "Food-related illness",
        ];
        recommendations = [
          "Stay hydrated",
          "Monitor body temperature",
          "Consult a doctor if symptoms persist beyond 48 hours",
        ];
        break;

      default:
        possibleCauses = [
          "Mild infection",
          "Seasonal allergy",
          "Temporary fatigue",
        ];
        recommendations = [
          "Take adequate rest",
          "Drink fluids",
          "Monitor symptoms",
        ];
    }

    /* ================================
       5. STANDARDIZED RESPONSE (API CONTRACT)
       ================================ */
    const response = {
      urgency,
      severityScore,
      possibleCauses,
      recommendations,
      reasoning,
      disclaimer:
        "This is not a medical diagnosis. Please consult a qualified healthcare professional.",
    };

    /* ================================
       6. SAFE LOGGING (FOR DEPLOYMENT)
       ================================ */
    console.log({
      age,
      gender,
      symptoms,
      urgency,
      severityScore,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Symptom checker error:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to process symptoms at this time",
      }),
      { status: 500 }
    );
  }
}
