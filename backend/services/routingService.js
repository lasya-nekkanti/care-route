/**
 * CareRoute Routing Service
 *
 * Provides standalone routing calculations and destination mapping
 * for student cases and API routes.
 */

import { calculateRouting } from "../data/routingRules.js";
import { SUPPORT_CATEGORIES, getCategoryById } from "../data/supportCategories.js";

export function determineRoute(category, urgency = "moderate") {
  return calculateRouting(category, urgency);
}

export function getAllCategories() {
  return SUPPORT_CATEGORIES;
}

export function getCategoryDetails(id) {
  return getCategoryById(id);
}
