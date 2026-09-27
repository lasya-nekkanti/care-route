/**
 * CareRoute Mock Assessment Reference
 */

export const DEFAULT_MOCK_ASSESSMENT = {
  category: "academic",
  categoryName: "Academic Stress & Backlogs",
  secondaryCategory: "wellbeing",
  secondaryCategoryName: "Emotional & Mental Wellbeing",
  urgency: "moderate",
  confidence: 0.89,
  summary: "Student reports significant deadline pressure, difficulty completing coursework, and feeling overwhelmed by upcoming exams.",
  recommendedService: "Academic Support & Tutoring Services",
  escalationRequired: false,
  routingDetails: {
    service: "Academic Support & Tutoring Services",
    priority: "moderate",
    routingSLA: "Standard Review (1-2 business days)",
    rationale: "Primary concern pertains to academic workload and exam readiness. Routed to study advisors for academic action planning."
  },
  nextAction: "Connect with Academic Support"
};
