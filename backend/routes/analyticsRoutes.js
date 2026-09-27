/**
 * CareRoute Analytics API Route
 *
 * Aggregates in-memory case data and historical metrics for the Impact / Operations Dashboard.
 */

import { Router } from "express";
import { mockCases } from "../data/mockCases.js";
import { SUPPORT_CATEGORIES } from "../data/supportCategories.js";

const router = Router();

router.get("/", (req, res) => {
  const totalCases = mockCases.length;

  // Breakdown by category
  const casesByCategory = SUPPORT_CATEGORIES.map((cat) => {
    const count = mockCases.filter((c) => c.category === cat.id).length;
    return {
      categoryId: cat.id,
      categoryName: cat.name,
      count
    };
  }).filter((item) => item.count > 0);

  // Breakdown by urgency / priority
  const casesByUrgency = {
    critical: mockCases.filter((c) => c.priority === "critical").length,
    high: mockCases.filter((c) => c.priority === "high").length,
    moderate: mockCases.filter((c) => c.priority === "moderate").length,
    low: mockCases.filter((c) => c.priority === "low").length
  };

  // Breakdown by destination service
  const serviceMap = {};
  mockCases.forEach((c) => {
    serviceMap[c.assignedService] = (serviceMap[c.assignedService] || 0) + 1;
  });
  const casesByDestination = Object.entries(serviceMap).map(([service, count]) => ({
    service,
    count
  }));

  // Escalated cases count
  const escalatedCount = mockCases.filter((c) => c.escalationRequired || c.priority === "critical").length;

  // Historical benchmarks / metrics
  const responseMetrics = {
    totalCasesReceived: totalCases + 142, // Includes simulated historical archive
    avgTriageDurationSeconds: 4.8,
    avgRoutingTimeHours: 1.4,
    escalatedCases: escalatedCount + 8,
    studentSatisfactionRate: "94.2%",
    misroutedRedirectionDropRate: "78% reduction"
  };

  res.json({
    summary: responseMetrics,
    liveCases: {
      total: totalCases,
      byCategory: casesByCategory,
      byUrgency: casesByUrgency,
      byDestination: casesByDestination,
      escalatedCount
    }
  });
});

export default router;
