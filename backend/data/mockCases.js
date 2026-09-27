/**
 * CareRoute In-Memory Mock Cases Data Store
 *
 * Provides initial demo cases for staff dashboard, filtering,
 * case detail inspection, and status transitions.
 */

export let mockCases = [
  {
    id: "CR-1001",
    studentIdentifier: "Student #8492",
    category: "crisis",
    secondaryCategory: "wellbeing",
    priority: "critical",
    status: "Support Team Reviewing",
    assignedService: "Immediate Crisis Escalation & Campus Safety Team",
    summary: "Critical distress indicators flagged. Immediate staff outreach initiated with crisis safety protocols.",
    studentMessage: "I feel completely overwhelmed by everything. Having dark thoughts and don't know how to keep going.",
    duration: "1 week",
    impact: "severe",
    escalationRequired: true,
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 mins ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    timeline: [
      { status: "Submitted", timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(), note: "Student submitted triage questionnaire" },
      { status: "Triaged", timestamp: new Date(Date.now() - 34 * 60 * 1000).toISOString(), note: "Automated triage detected safety keywords; high-risk escalation triggered" },
      { status: "Routed", timestamp: new Date(Date.now() - 33 * 60 * 1000).toISOString(), note: "Case assigned to Immediate Crisis Escalation Team" },
      { status: "Support Team Reviewing", timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), note: "Senior Duty Counsellor acknowledged and initiated phone outreach" }
    ]
  },
  {
    id: "CR-1002",
    studentIdentifier: "Student #3911",
    category: "academic",
    secondaryCategory: "wellbeing",
    priority: "moderate",
    status: "Routed",
    assignedService: "Academic Support & Tutoring Services",
    summary: "Student reports severe backlog in 2 core modules with mounting anxiety over midterm exams.",
    studentMessage: "I've missed several lectures due to illness and now I'm three weeks behind in Algorithms and Database systems. I don't know who to speak with about mitigating circumstances.",
    duration: "2-3 weeks",
    impact: "moderate",
    escalationRequired: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hrs ago
    updatedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    timeline: [
      { status: "Submitted", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), note: "Triage request submitted" },
      { status: "Triaged", timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(), note: "Identified Academic Stress (primary) with Wellbeing impact (secondary)" },
      { status: "Routed", timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(), note: "Routed to Academic Support & Tutoring Services" }
    ]
  },
  {
    id: "CR-1003",
    studentIdentifier: "Student #7124",
    category: "harassment",
    secondaryCategory: "accommodation",
    priority: "high",
    status: "Support Team Reviewing",
    assignedService: "Student Safeguarding & Conduct Office",
    summary: "Unsolicited stalking and persistent intimidation outside campus accommodation.",
    studentMessage: "An individual has been repeatedly waiting outside my student accommodation block at night and sending harassing messages on social media. I feel unsafe walking back alone.",
    duration: "Several days",
    impact: "severe",
    escalationRequired: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    timeline: [
      { status: "Submitted", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), note: "Safeguarding disclosure received" },
      { status: "Triaged", timestamp: new Date(Date.now() - 230 * 60 * 1000).toISOString(), note: "High urgency flagged. Harassment protocols applied." },
      { status: "Routed", timestamp: new Date(Date.now() - 220 * 60 * 1000).toISOString(), note: "Transferred to Student Safeguarding & Conduct Office" },
      { status: "Support Team Reviewing", timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), note: "Safeguarding Officer reviewing campus CCTV and safety escort options" }
    ]
  },
  {
    id: "CR-1004",
    studentIdentifier: "Student #5621",
    category: "financial",
    secondaryCategory: "accommodation",
    priority: "high",
    status: "Appointment / Response",
    assignedService: "Student Hardship & Financial Advisory",
    summary: "Delayed student maintenance loan leading to rent arrears and threat of eviction notice.",
    studentMessage: "My student maintenance loan instalment has been delayed by 6 weeks. My private landlord issued a warning notice for overdue rent. I'm down to my last £15 for food this week.",
    duration: "Over a month",
    impact: "severe",
    escalationRequired: false,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // Yesterday
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    timeline: [
      { status: "Submitted", timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), note: "Hardship inquiry logged" },
      { status: "Triaged", timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), note: "Flagged as high-urgency financial difficulty" },
      { status: "Routed", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), note: "Sent to Student Hardship Advisory" },
      { status: "Support Team Reviewing", timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), note: "Financial advisor reviewed bank statement evidence" },
      { status: "Appointment / Response", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), note: "Emergency £250 campus voucher granted; hardship interview scheduled for tomorrow 10:00" }
    ]
  },
  {
    id: "CR-1005",
    studentIdentifier: "Student #2048",
    category: "accessibility",
    secondaryCategory: "academic",
    priority: "moderate",
    status: "Appointment / Response",
    assignedService: "Disability & Inclusion Services",
    summary: "ADHD diagnostic assessment documentation submitted; exam adjustment request for upcoming test period.",
    studentMessage: "I recently received my diagnostic report for ADHD and need to request 25% extra time and rest breaks for the upcoming January exam session before the deadline.",
    duration: "Ongoing",
    impact: "moderate",
    escalationRequired: false,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    timeline: [
      { status: "Submitted", timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), note: "Learning adjustment application submitted" },
      { status: "Triaged", timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000).toISOString(), note: "Categorised under Accessibility & Disability Support" },
      { status: "Routed", timestamp: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString(), note: "Assigned to Disability Inclusion Officer" },
      { status: "Appointment / Response", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), note: "Individual Learning Plan drafted and submitted to Exams Board" }
    ]
  },
  {
    id: "CR-1006",
    studentIdentifier: "Student #6305",
    category: "accommodation",
    secondaryCategory: "physical-health",
    priority: "moderate",
    status: "Resolved",
    assignedService: "Student Housing & Residential Life",
    summary: "Severe heating failure and mold in university hall of residence resolved with room swap.",
    studentMessage: "The radiator in room 302 has been broken for 10 days in winter. The room is freezing and mold is forming near the window frame.",
    duration: "10 days",
    impact: "moderate",
    escalationRequired: false,
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    timeline: [
      { status: "Submitted", timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), note: "Maintenance escalation submitted" },
      { status: "Triaged", timestamp: new Date(Date.now() - 95 * 60 * 60 * 1000).toISOString(), note: "Categorised under Accommodation Issues" },
      { status: "Routed", timestamp: new Date(Date.now() - 94 * 60 * 60 * 1000).toISOString(), note: "Routed to Residential Services" },
      { status: "Appointment / Response", timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), note: "Facilities inspected heating; student moved to temporary room" },
      { status: "Resolved", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), note: "Radiator valve replaced, mold remediated, student re-settled" }
    ]
  }
];

export function getCaseById(id) {
  return mockCases.find((c) => c.id === id);
}

export function createCase(caseData) {
  const newId = `CR-${1000 + mockCases.length + 1}`;
  const now = new Date().toISOString();
  
  const createdCase = {
    id: newId,
    studentIdentifier: caseData.studentIdentifier || `Student #${Math.floor(1000 + Math.random() * 9000)}`,
    category: caseData.category || "other",
    secondaryCategory: caseData.secondaryCategory || null,
    priority: caseData.priority || "moderate",
    status: "Triaged",
    assignedService: caseData.assignedService || "Central Student Helpdesk & Triage Desk",
    summary: caseData.summary || "Student requested triage and routing.",
    studentMessage: caseData.studentMessage || caseData.message || "",
    duration: caseData.duration || "Not specified",
    impact: caseData.impact || "moderate",
    escalationRequired: Boolean(caseData.escalationRequired),
    createdAt: now,
    updatedAt: now,
    timeline: [
      { status: "Submitted", timestamp: now, note: "Initial student triage questionnaire submitted" },
      { status: "Triaged", timestamp: now, note: `Identified concern category: ${caseData.category}` },
      { status: "Routed", timestamp: now, note: `Routed to ${caseData.assignedService}` }
    ]
  };

  mockCases.unshift(createdCase);
  return createdCase;
}

export function updateCaseStatus(id, newStatus, staffNote = "") {
  const caseItem = mockCases.find((c) => c.id === id);
  if (!caseItem) return null;

  caseItem.status = newStatus;
  caseItem.updatedAt = new Date().toISOString();
  caseItem.timeline.push({
    status: newStatus,
    timestamp: caseItem.updatedAt,
    note: staffNote || `Staff updated status to ${newStatus}`
  });

  return caseItem;
}
