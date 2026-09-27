/**
 * CareRoute Backend API Server
 */

import express from "express";
import cors from "cors";
import triageRoutes from "./routes/triageRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vite frontend development server (ports 5173, 3000, etc.)
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use("/api", triageRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "CareRoute Backend API",
    mode: process.env.GEMINI_API_KEY ? "Gemini AI Live" : "Deterministic Mock Triage",
    timestamp: new Date().toISOString()
  });
});

// Root API info
app.get("/", (req, res) => {
  res.json({
    name: "CareRoute API",
    version: "1.0.0",
    docs: {
      triage: "POST /api/triage",
      route: "POST /api/route",
      categories: "GET /api/categories",
      cases: "GET /api/cases, POST /api/cases, GET /api/cases/:id, PATCH /api/cases/:id/status",
      analytics: "GET /api/analytics"
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n==========================================`);
  console.log(`🚀 CareRoute Backend API listening on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Mode:   ${process.env.GEMINI_API_KEY ? "Live AI (Gemini)" : "Smart Mock Classifier"}`);
  console.log(`==========================================\n`);
});
