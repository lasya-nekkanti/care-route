import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Triage from './pages/Triage.jsx';
import Assessment from './pages/Assessment.jsx';
import Confirmation from './pages/Confirmation.jsx';
import CaseStatus from './pages/CaseStatus.jsx';
import StaffDashboard from './pages/StaffDashboard.jsx';
import CaseDetails from './pages/CaseDetails.jsx';
import Analytics from './pages/Analytics.jsx';
import { EMERGENCY_PLACEHOLDERS } from './data/supportCategories.js';
import { Compass, ShieldAlert, Heart } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/triage" element={<Triage />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/status" element={<CaseStatus />} />
            <Route path="/status/:id" element={<CaseStatus />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff/cases/:id" element={<CaseDetails />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Accessible Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100 text-xs">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                    <Compass className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">
                    Care<span className="text-brand-600">Route</span>
                  </span>
                </div>
                <p className="text-slate-500 max-w-sm leading-relaxed">
                  CareRoute is a prototype triage and routing platform built for Track 1: Student Triage & Routing. It helps students identify support and navigate university services quickly.
                </p>
                <div className="text-[11px] text-slate-400">
                  CareRoute is not a medical diagnosis tool, counselling service, or emergency hotline.
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Student Support</h4>
                <ul className="space-y-1.5 text-slate-500">
                  <li><Link to="/triage" className="hover:text-brand-600">Get Support</Link></li>
                  <li><Link to="/status" className="hover:text-brand-600">My Request</Link></li>
                  <li><Link to="/triage?demo=true" className="hover:text-brand-600 text-slate-400">Demo Mode (?demo=true)</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Staff Portal</h4>
                <ul className="space-y-1.5 text-slate-500">
                  <li><Link to="/staff" className="hover:text-brand-600">Staff Case Queues</Link></li>
                  <li><Link to="/analytics" className="hover:text-brand-600">Operations & Analytics</Link></li>
                  <li className="pt-2 text-[11px] text-slate-400">
                    Emergency: {EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NAME}
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <p>© 2026 CareRoute Prototype • Hackathon Edition</p>
              <p className="flex items-center gap-1">
                Built with React, Tailwind CSS, Express, and AI Abstraction
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
