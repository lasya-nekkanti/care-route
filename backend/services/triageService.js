/**
 * CareRoute AI / Triage Service Abstraction
 *
 * Exposes a unified interface `triageStudent(input)` that routes through
 * an intelligent mock classifier, with an architected extension point for
 * Google Gemini API (`triageStudentWithGemini`) that can be activated via environment variables.
 *
 * ARCHITECTURAL SAFETY RULES:
 * 1. The frontend NEVER calls external LLMs directly.
 * 2. API keys are loaded via process.env and never hardcoded.
 * 3. Immediate safety signals bypass standard async queues and trigger escalation flags.
 * 4. CareRoute never provides clinical diagnoses or pretends to provide emergency therapy.
 */

import { SUPPORT_CATEGORIES, EMERGENCY_PLACEHOLDERS, getCategoryById } from "../data/supportCategories.js";
import { calculateRouting } from "../data/routingRules.js";

// Safety trigger keywords for immediate human escalation
const CRISIS_SIGNALS = [
  "suicide", "suicidal", "kill myself", "end my life", "self-harm", "self harm",
  "cutting myself", "hurt myself", "don't want to live", "cannot go on living",
  "immediate danger", "threatened with knife", "threatened with violence", "active emergency"
];

const HARASSMENT_SIGNALS = [
  "harass", "harassment", "stalking", "stalker", "followed me", "intimidat",
  "threaten", "unsolicited pictures", "sexual harassment", "assault"
];

const FINANCIAL_SIGNALS = [
  "rent", "eviction", "evict", "bursary", "loan", "cannot afford food", "starving",
  "money", "financial", "grant", "hardship", "debt"
];

const ACCOMMODATION_SIGNALS = [
  "dorm", "flat", "landlord", "mold", "mould", "heating", "broken radiator",
  "roommate", "tenancy", "housing", "nowhere to sleep"
];

const ACCESSIBILITY_SIGNALS = [
  "adhd", "dyslexia", "autism", "disability", "extra time", "accommodations",
  "wheelchair", "hearing", "vision", "mobility", "impairment", "neurodivergent"
];

const PHYSICAL_HEALTH_SIGNALS = [
  "doctor", "gp", "sick", "infection", "fever", "injury", "migraine", "pain",
  "hospital", "prescription", "medical"
];

const ACADEMIC_SIGNALS = [
  "exam", "exams", "backlog", "fail", "failing", "assignment", "coursework",
  "deadline", "dissertation", "lectures", "study", "modules", "mitigating circumstances"
];

/**
 * Primary public interface for triage.
 * Chooses between Gemini LLM triage (if GEMINI_API_KEY is configured) and mock triage.
 *
 * @param {Object} input - { message: string, duration?: string, impact?: string, selectedCategory?: string }
 * @returns {Promise<Object>} Triage assessment result
 */
export async function triageStudent(input) {
  const { message = "", duration = "1-2 weeks", impact = "moderate", selectedCategory = null } = input;

  // If a live Gemini API key is present in environment, invoke the Gemini provider.
  // Otherwise, default safely to deterministic mock triage.
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    try {
      return await triageStudentWithGemini(input);
    } catch (err) {
      console.warn("[triageService] Gemini API call failed or timed out. Falling back to local mock classification:", err.message);
      return triageStudentMock(input);
    }
  }

  // Fallback / default: High-fidelity deterministic mock triage
  return triageStudentMock(input);
}

/**
 * Intelligent Mock Triage Classifier
 * Inspects natural language text for crisis, harassment, wellbeing, academic,
 * accommodation, financial, and accessibility signals.
 */
export function triageStudentMock(input) {
  const text = (input.message || "").toLowerCase();
  const impact = (input.impact || "moderate").toLowerCase();

  // 1. SAFETY FIRST: Check for immediate life-safety or self-harm crisis
  const hasCrisisSignal = CRISIS_SIGNALS.some((keyword) => text.includes(keyword));
  if (hasCrisisSignal) {
    const categoryObj = getCategoryById("crisis");
    return {
      category: "crisis",
      secondaryCategory: "wellbeing",
      urgency: "critical",
      confidence: 0.98,
      summary: "Critical safety signal detected. Immediate human intervention and emergency protocols prioritized.",
      recommendedService: categoryObj.service,
      escalationRequired: true,
      emergencyContacts: EMERGENCY_PLACEHOLDERS,
      routingDetails: calculateRouting("crisis", "critical"),
      rationale: "Immediate safety indicators detected in message. CareRoute prioritizes rapid human escalation over routine scheduling."
    };
  }

  // 2. Safeguarding / Harassment Check
  const hasHarassmentSignal = HARASSMENT_SIGNALS.some((keyword) => text.includes(keyword));
  if (hasHarassmentSignal) {
    const categoryObj = getCategoryById("harassment");
    return {
      category: "harassment",
      secondaryCategory: "wellbeing",
      urgency: "high",
      confidence: 0.94,
      summary: "Student reports safeguarding concerns, unwanted conduct, or safety harassment on campus.",
      recommendedService: categoryObj.service,
      escalationRequired: true,
      emergencyContacts: EMERGENCY_PLACEHOLDERS,
      routingDetails: calculateRouting("harassment", "high"),
      rationale: "Safeguarding and conduct complaints require dedicated human review and fast-tracked campus protection."
    };
  }

  // 3. User manual selection override (if student chose a category chip)
  let detectedCategory = input.selectedCategory || null;
  let secondaryCategory = null;

  if (!detectedCategory) {
    if (FINANCIAL_SIGNALS.some((k) => text.includes(k))) {
      detectedCategory = "financial";
      secondaryCategory = text.includes("stress") || text.includes("anxious") ? "wellbeing" : null;
    } else if (ACCOMMODATION_SIGNALS.some((k) => text.includes(k))) {
      detectedCategory = "accommodation";
      secondaryCategory = text.includes("exam") || text.includes("study") ? "academic" : null;
    } else if (ACCESSIBILITY_SIGNALS.some((k) => text.includes(k))) {
      detectedCategory = "accessibility";
      secondaryCategory = "academic";
    } else if (PHYSICAL_HEALTH_SIGNALS.some((k) => text.includes(k))) {
      detectedCategory = "physical-health";
      secondaryCategory = text.includes("anxiety") ? "wellbeing" : null;
    } else if (ACADEMIC_SIGNALS.some((k) => text.includes(k))) {
      detectedCategory = "academic";
      secondaryCategory = text.includes("anxious") || text.includes("depressed") || text.includes("burnout") ? "wellbeing" : null;
    } else if (text.includes("lonely") || text.includes("friend") || text.includes("society") || text.includes("homesick")) {
      detectedCategory = "social";
      secondaryCategory = "wellbeing";
    } else if (text.includes("sad") || text.includes("depress") || text.includes("anxiety") || text.includes("burnout") || text.includes("panic")) {
      detectedCategory = "wellbeing";
      secondaryCategory = "academic";
    } else {
      detectedCategory = "academic"; // Sensible default for university prototype
      secondaryCategory = "wellbeing";
    }
  }

  // Determine urgency
  let calculatedUrgency = impact;
  if (impact === "severe") {
    calculatedUrgency = "high";
  } else if (impact === "mild") {
    calculatedUrgency = "low";
  } else {
    calculatedUrgency = "moderate";
  }

  const categoryObj = getCategoryById(detectedCategory);
  const routing = calculateRouting(detectedCategory, calculatedUrgency);

  // Generate natural summary
  const summary = generateSummary(detectedCategory, secondaryCategory, text);

  return {
    category: detectedCategory,
    secondaryCategory,
    urgency: calculatedUrgency,
    confidence: 0.88,
    summary,
    recommendedService: routing.service,
    escalationRequired: routing.escalationRequired,
    emergencyContacts: routing.escalationRequired ? EMERGENCY_PLACEHOLDERS : null,
    routingDetails: routing,
    rationale: routing.rationale
  };
}

/**
 * Placeholder for Gemini Live LLM Service Integration.
 * Developers working on the feature/ai branch can implement the Google GenAI SDK call here.
 * The output schema matches triageStudentMock exactly so neither routes nor UI require changes.
 */
export async function triageStudentWithGemini(input) {
  /**
   * Note for feature/ai developers:
   * To activate Gemini:
   * 1. npm install @google/genai
   * 2. Configure process.env.GEMINI_API_KEY
   * 3. Construct prompt using system instructions enforcing safety, JSON schema, and strict escalation.
   */
  throw new Error("Gemini integration module is configured for feature/ai branch. Set GEMINI_API_KEY and integrate @google/genai.");
}

function generateSummary(category, secondary, text) {
  const catNames = {
    academic: "academic workload and module progression",
    wellbeing: "emotional stress and psychological wellbeing",
    "physical-health": "physical health and campus medical needs",
    financial: "financial hardship and emergency funding requirements",
    accommodation: "student accommodation and residential concerns",
    accessibility: "disability adjustments and learning support",
    harassment: "safeguarding and personal conduct incidents",
    crisis: "immediate crisis and safety support",
    social: "peer connection and campus social integration",
    other: "multidisciplinary university navigation"
  };

  const primaryTopic = catNames[category] || "student support";
  if (secondary) {
    const secTopic = catNames[secondary] || "general wellbeing";
    return `Student reports concern primarily relating to ${primaryTopic}, with compounding factors in ${secTopic}.`;
  }
  return `Student describes challenges concerning ${primaryTopic} seeking guidance from relevant campus services.`;
}
