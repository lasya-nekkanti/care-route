/**
 * CareRoute Routing Rules Engine
 *
 * Maps category and urgency to recommended department, priority level,
 * and escalation flags.
 */

import { SUPPORT_CATEGORIES } from "./supportCategories.js";

/**
 * Calculates priority based on category default and user-stated impact/urgency
 */
export function calculateRouting(categoryId, urgencyInput = "moderate") {
  const category = SUPPORT_CATEGORIES.find((c) => c.id === categoryId) || 
    SUPPORT_CATEGORIES.find((c) => c.id === "other");

  let priority = urgencyInput.toLowerCase();
  
  // High-risk safety categories always force critical/high priority
  if (category.id === "crisis") {
    priority = "critical";
  } else if (category.id === "harassment" && priority !== "critical") {
    priority = "high";
  }

  const escalationRequired = category.escalation || priority === "critical" || priority === "high" && category.id === "harassment";

  return {
    service: category.service,
    priority,
    escalationRequired,
    categoryName: category.name,
    routingSLA: getSLAForPriority(priority),
    rationale: getRoutingRationale(category.id, priority)
  };
}

function getSLAForPriority(priority) {
  switch (priority) {
    case "critical":
      return "Immediate Escalation (< 15 mins human contact)";
    case "high":
      return "Same-Day Review (< 4 hours)";
    case "moderate":
      return "Standard Review (1-2 business days)";
    case "low":
      return "Routine Guidance (2-3 business days)";
    default:
      return "Standard Review (1-2 business days)";
  }
}

function getRoutingRationale(categoryId, priority) {
  switch (categoryId) {
    case "crisis":
      return "Case flagged with critical safety markers. Immediate human notification and crisis safeguards prioritized over automated scheduling.";
    case "harassment":
      return "Safeguarding protocol activated. Direct routing to confidential Safeguarding & Conduct specialists with escalated review priority.";
    case "academic":
      return "Primary concern pertains to academic performance and course backlogs. Routed to Academic Support for study planning and tutor assistance.";
    case "wellbeing":
      return "Student reported psychological or emotional pressure. Routed to Wellbeing Services for confidential assessment and counsellor matching.";
    case "financial":
      return "Financial hardship reported. Routed to Financial Advisory to assess emergency hardship funds and grant eligibility.";
    case "accommodation":
      return "Housing distress or flat conflict reported. Routed to Residential Life team for tenancy guidance or room re-allocation.";
    case "accessibility":
      return "Disability or learning accommodation requested. Routed to Inclusion Services for statutory adjustments and campus access support.";
    case "physical-health":
      return "Medical or physical health issue affecting student life. Routed to Campus Health Centre for GP consultation.";
    case "social":
      return "Interpersonal isolation or engagement difficulty. Routed to Student Life & Peer Mentoring networks.";
    default:
      return "Cross-functional query routed to Student Central Triage Desk for human-assisted evaluation.";
  }
}
