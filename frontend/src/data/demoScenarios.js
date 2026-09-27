/**
 * CareRoute Deterministic Demo Scenarios
 *
 * Pre-configured student scenarios for hackathon judges to test
 * all core triage pathways, safety escalations, and department routing.
 */

export const DEMO_SCENARIOS = [
  {
    id: "academic-stress",
    title: "1. Academic Stress & Backlogs",
    badge: "Academic",
    categoryHint: "academic",
    duration: "2-3 weeks",
    impact: "moderate",
    message: "I missed two weeks of lectures when I was down with the flu. Now I have two coursework deadlines next Friday and midterm exam preparation, but I can't catch up with the material. I feel completely paralyzed by the backlog and don't know how to request an extension.",
    expectedCategory: "academic",
    expectedService: "Academic Support & Tutoring Services",
    expectedUrgency: "moderate",
    isHighRisk: false
  },
  {
    id: "financial-difficulty",
    title: "2. Financial Hardship",
    badge: "Financial",
    categoryHint: "financial",
    duration: "Over a month",
    impact: "severe",
    message: "My student maintenance loan instalment has been delayed by 6 weeks due to an administrative review. My landlord just sent a final reminder notice for overdue rent and I have almost nothing left for groceries this week. I don't know where to turn for hardship assistance.",
    expectedCategory: "financial",
    expectedService: "Student Hardship & Financial Advisory",
    expectedUrgency: "high",
    isHighRisk: false
  },
  {
    id: "accommodation-problem",
    title: "3. Accommodation Problem",
    badge: "Housing",
    categoryHint: "accommodation",
    duration: "10 days",
    impact: "moderate",
    message: "The heater in my campus dorm room has stopped functioning and it is freezing at night. Black mold is spreading around the window frame and the private hall management hasn't responded to my three repair tickets.",
    expectedCategory: "accommodation",
    expectedService: "Student Housing & Residential Life",
    expectedUrgency: "moderate",
    isHighRisk: false
  },
  {
    id: "harassment-safety",
    title: "4. Harassment & Stalking",
    badge: "Safeguarding",
    categoryHint: "harassment",
    duration: "Few days",
    impact: "severe",
    message: "Someone on my course has been following me from the library to my accommodation late at night and sending harassing messages on social media after I asked them to stop. I am afraid to attend lectures or walk alone on campus.",
    expectedCategory: "harassment",
    expectedService: "Student Safeguarding & Conduct Office",
    expectedUrgency: "high",
    isHighRisk: true
  },
  {
    id: "accessibility-support",
    title: "5. Accessibility / Disability",
    badge: "Accessibility",
    categoryHint: "accessibility",
    duration: "Ongoing",
    impact: "moderate",
    message: "I was diagnosed with ADHD and auditory processing differences last term. I need to get official exam accommodations including 25% extra time and rest breaks before the upcoming exam timetable is finalized.",
    expectedCategory: "accessibility",
    expectedService: "Disability & Inclusion Services",
    expectedUrgency: "moderate",
    isHighRisk: false
  },
  {
    id: "high-risk-crisis",
    title: "6. High-Risk Crisis Scenario",
    badge: "Emergency Crisis",
    categoryHint: "crisis",
    duration: "1 week",
    impact: "severe",
    message: "Everything in my life is falling apart. I can't sleep, I've stopped eating, and I'm having dark thoughts about suicide and hurting myself. I feel like everyone would be better off without me and I don't think I can make it through the night alone.",
    expectedCategory: "crisis",
    expectedService: "Immediate Crisis Escalation & Campus Safety Team",
    expectedUrgency: "critical",
    isHighRisk: true
  }
];
