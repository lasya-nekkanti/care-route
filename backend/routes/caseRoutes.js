/**
 * CareRoute Case Management Routes
 */

import { Router } from "express";
import { mockCases, getCaseById, createCase, updateCaseStatus } from "../data/mockCases.js";

const router = Router();

/**
 * GET /api/cases
 * Returns all cases with optional filtering by status, priority, or category
 */
router.get("/", (req, res) => {
  const { status, priority, category, search } = req.query;
  let cases = [...mockCases];

  if (status) {
    cases = cases.filter((c) => c.status.toLowerCase() === status.toLowerCase());
  }

  if (priority) {
    cases = cases.filter((c) => c.priority.toLowerCase() === priority.toLowerCase());
  }

  if (category) {
    cases = cases.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    cases = cases.filter(
      (c) =>
        c.id.toLowerCase().includes(q) ||
        c.studentIdentifier.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.assignedService.toLowerCase().includes(q)
    );
  }

  res.json({
    total: cases.length,
    cases
  });
});

/**
 * GET /api/cases/:id
 * Returns single case details
 */
router.get("/:id", (req, res) => {
  const caseItem = getCaseById(req.params.id);
  if (!caseItem) {
    return res.status(404).json({ error: `Case ${req.params.id} not found.` });
  }
  res.json(caseItem);
});

/**
 * POST /api/cases
 * Creates a support case from triage result
 */
router.post("/", (req, res) => {
  try {
    const { category, secondaryCategory, priority, assignedService, summary, studentMessage, duration, impact, escalationRequired } = req.body;

    const newCase = createCase({
      category,
      secondaryCategory,
      priority,
      assignedService,
      summary,
      studentMessage,
      duration,
      impact,
      escalationRequired
    });

    res.status(201).json(newCase);
  } catch (error) {
    console.error("Error creating case:", error);
    res.status(500).json({ error: "Failed to create support case." });
  }
});

/**
 * PATCH /api/cases/:id/status
 * Updates case status (e.g. Acknowledged, In Progress, Appointment Scheduled, Resolved)
 */
router.patch("/:id/status", (req, res) => {
  const { status, note } = req.body;
  if (!status) {
    return res.status(400).json({ error: "New status value is required." });
  }

  const updated = updateCaseStatus(req.params.id, status, note);
  if (!updated) {
    return res.status(404).json({ error: `Case ${req.params.id} not found.` });
  }

  res.json(updated);
});

export default router;
