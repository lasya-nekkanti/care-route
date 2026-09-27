/**
 * CareRoute Centralized Support Categories (Frontend)
 *
 * NOTE: Prototype categories for hackathon demonstration.
 * These represent generic student support functions and do not reflect
 * official university departmental titles.
 */

export const SUPPORT_CATEGORIES = [
  {
    id: "academic",
    name: "Academic Stress & Backlogs",
    service: "Academic Support & Tutoring Services",
    description: "Support related to academic workload, exams, attendance, deadline stress, and module backlogs.",
    icon: "GraduationCap",
    defaultUrgency: "moderate",
    escalation: false,
    exampleConcerns: [
      "Struggling to keep up with course assignments and failing two modules",
      "Overwhelmed by upcoming exam schedule and severe backlog",
      "Need advice on mitigating circumstances or course extensions",
      "Trouble understanding lecture materials and balancing coursework"
    ]
  },
  {
    id: "wellbeing",
    name: "Emotional & Mental Wellbeing",
    service: "Student Wellbeing & Counselling Service",
    description: "Confidential emotional support, stress reduction, anxiety management, and counselling referrals.",
    icon: "HeartHandshake",
    defaultUrgency: "moderate",
    escalation: false,
    exampleConcerns: [
      "Experiencing persistent low mood, lack of motivation, and burnout",
      "High anxiety during lectures or panic attacks before presentations",
      "Feeling lonely, isolated, or homesick after moving to university",
      "Struggling to cope with everyday emotional pressures"
    ]
  },
  {
    id: "physical-health",
    name: "Physical Health",
    service: "Campus Health & Medical Centre",
    description: "Guidance on general health complaints, campus GP appointments, medical notes, and minor injuries.",
    icon: "Activity",
    defaultUrgency: "moderate",
    escalation: false,
    exampleConcerns: [
      "Chronic migraines affecting ability to study and attend labs",
      "Recovering from illness and need medical documentation for missed exams",
      "Need help registering with a campus GP or finding local dental care",
      "Persistent fatigue and physical symptoms affecting daily routine"
    ]
  },
  {
    id: "financial",
    name: "Financial Difficulties",
    service: "Student Hardship & Financial Advisory",
    description: "Assistance with emergency student grants, hardship funds, budgeting advice, and loan inquiries.",
    icon: "Banknote",
    defaultUrgency: "high",
    escalation: false,
    exampleConcerns: [
      "Cannot afford groceries or rent this month due to delayed bursary",
      "Unexpected medical or family expenses causing severe financial distress",
      "Need information on emergency campus hardship grants",
      "Struggling with part-time job hours while studying full-time"
    ]
  },
  {
    id: "accommodation",
    name: "Accommodation Issues",
    service: "Student Housing & Residential Life",
    description: "Support for on-campus dorm issues, landlord disputes, roommate mediation, and emergency housing.",
    icon: "Home",
    defaultUrgency: "moderate",
    escalation: false,
    exampleConcerns: [
      "Severe damp, heating failure, or maintenance negligence in student flat",
      "Intolerable roommate conflict or noisy disturbances impacting sleep",
      "Facing sudden tenancy eviction or imminent lack of accommodation",
      "Questions about dorm lease agreements and room transfers"
    ]
  },
  {
    id: "accessibility",
    name: "Accessibility & Disability Support",
    service: "Disability & Inclusion Services",
    description: "Reasonable adjustments, exam accommodations, assistive technology, and mobility support.",
    icon: "Accessibility",
    defaultUrgency: "moderate",
    escalation: false,
    exampleConcerns: [
      "Need exam accommodations (extra time/quiet room) for ADHD/dyslexia",
      "Mobility impairment due to broken leg needing accessible campus transport",
      "Request for lecture notes in alternate format or sign-language interpreter",
      "Setting up formal individual learning accommodation plan"
    ]
  },
  {
    id: "harassment",
    name: "Harassment / Stalking / Sexual Harassment",
    service: "Student Safeguarding & Conduct Office",
    description: "Dedicated, confidential reporting and safeguarding support for harassment, bullying, or intimidation.",
    icon: "ShieldAlert",
    defaultUrgency: "high",
    escalation: true,
    exampleConcerns: [
      "Receiving persistent unwanted messages, threats, or stalking on campus",
      "Experienced verbal intimidation, bullying, or discrimination from peers",
      "Need confidential advice on reporting sexual harassment or misconduct",
      "Feeling unsafe traveling to evening classes due to targeted behaviour"
    ]
  },
  {
    id: "crisis",
    name: "Immediate Safety / Crisis",
    service: "Immediate Crisis Escalation & Campus Safety Team",
    description: "Urgent response protocol for life-safety, severe self-harm ideation, or immediate peril.",
    icon: "AlertOctagon",
    defaultUrgency: "critical",
    escalation: true,
    exampleConcerns: [
      "Feeling hopeless and having severe thoughts of self-harm or suicide",
      "Immediate danger to personal safety or physical threat on campus",
      "Witnessing or experiencing active violence or medical emergency",
      "Urgent crisis requiring immediate human intervention"
    ]
  },
  {
    id: "social",
    name: "Social / Relationship Concerns",
    service: "Peer Support & Student Life Engagement",
    description: "Programs connecting students to peer mentors, campus societies, and interpersonal relationship support.",
    icon: "Users",
    defaultUrgency: "low",
    escalation: false,
    exampleConcerns: [
      "Finding it difficult to make friends or connect with classmates",
      "Experiencing a difficult relationship breakup affecting focus",
      "Wanting to join student societies or connect with peer mentors",
      "Feeling disconnected from campus community life"
    ]
  },
  {
    id: "other",
    name: "Other / Unsure",
    service: "Central Student Helpdesk & Triage Desk",
    description: "General enquiries or complex overlapping issues requiring initial human triage and navigation.",
    icon: "HelpCircle",
    defaultUrgency: "moderate",
    escalation: false,
    exampleConcerns: [
      "Unsure which department can assist with multiple overlapping issues",
      "International student visa or administrative documentation queries",
      "General question about university procedures and complaint mechanisms",
      "Something not covered by other specific support categories"
    ]
  }
];

export const EMERGENCY_PLACEHOLDERS = {
  EMERGENCY_SUPPORT_NUMBER: "999 / 911 / 112 (Placeholder)",
  CRISIS_COUNSELLOR_CONTACT: "Campus 24/7 Mental Health Crisis Line: 0800-CARE-NOW (Placeholder)",
  CAMPUS_SECURITY_CONTACT: "Campus Security Emergency Dispatch: 020-5555-0199 (Placeholder)",
  DISCLAIMER: "CareRoute is a triage and routing tool, not an emergency dispatch system or clinical diagnosis provider. If you or someone you know is in immediate danger, please dial local emergency services immediately."
};

export const getCategoryById = (id) => {
  return SUPPORT_CATEGORIES.find((cat) => cat.id === id) || SUPPORT_CATEGORIES.find((cat) => cat.id === "other");
};
