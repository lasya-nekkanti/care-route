/**
 * CareRoute Triage and Routing Routes
 */

import { Router } from "express";
import { triageStudent } from "../services/triageService.js";
import { determineRoute, getAllCategories, getCategoryDetails } from "../services/routingService.js";

const router = Router();

/**
 * POST /api/triage
 * Accepts natural language concern and optional context; returns triage assessment.
 */
router.post("/triage", async (req, res) => {
  try {
    const { message, duration, impact, selectedCategory } = req.body;
    
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        error: "A description of your concern is required for triage."
      });
    }

    const triageResult = await triageStudent({
      message,
      duration,
      impact,
      selectedCategory
    });

    res.json(triageResult);
  } catch (error) {
    console.error("Error in /api/triage:", error);
    res.status(500).json({
      error: "Unable to process triage request at this time.",
      details: error.message
    });
  }
});

/**
 * POST /api/route
 * Accepts category and urgency; returns destination service and priority.
 */
router.post("/route", (req, res) => {
  try {
    const { category, urgency } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Category is required for routing." });
    }

    const routeResult = determineRoute(category, urgency || "moderate");
    res.json({
      service: routeResult.service,
      priority: routeResult.priority,
      escalationRequired: routeResult.escalationRequired,
      routingSLA: routeResult.routingSLA,
      rationale: routeResult.rationale
    });
  } catch (error) {
    console.error("Error in /api/route:", error);
    res.status(500).json({ error: "Routing determination failed." });
  }
});

/**
 * GET /api/categories
 * Returns the centralized list of support categories
 */
router.get("/categories", (req, res) => {
  res.json({
    categories: getAllCategories()
  });
});

/**
 * GET /api/categories/:id
 */
router.get("/categories/:id", (req, res) => {
  const category = getCategoryDetails(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Category not found." });
  }
  res.json(category);
});

export default router;
