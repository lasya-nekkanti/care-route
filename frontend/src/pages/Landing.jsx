import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import { SUPPORT_CATEGORIES, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';

/**
 * CareRoute Landing Page
 * Calm, welcoming, trustworthy, and student-focused.
 */
export default function Landing() {
  const previewCategories = SUPPORT_CATEGORIES.slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-6 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Finding the right support shouldn't be another problem.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          CareRoute helps students identify the support they need and connects them to the right campus service.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/triage" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto px-8 shadow-sm text-base"
            >
              Get Support
            </Button>
          </Link>

          <Link to="/status" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 text-base"
            >
              Check a Request
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Confidential • No account required • Connecting students to staff
        </p>
      </section>

      {/* Visual representation: Student → Triage → Right Support */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-6 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              How CareRoute helps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              You don't need to know university departments or procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-100/80 space-y-2">
              <div className="h-10 w-10 mx-auto rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Share your concern</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Describe what's going on in everyday words. No paperwork or jargon required.
              </p>
            </div>

            <div className="text-center p-5 rounded-xl bg-brand-50/50 border border-brand-100/60 space-y-2">
              <div className="h-10 w-10 mx-auto rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">CareRoute guides you</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We identify the relevant service and prioritize human contact if you need urgent care.
              </p>
            </div>

            <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-100/80 space-y-2">
              <div className="h-10 w-10 mx-auto rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Connect with staff</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your request is directly routed to the right team, with clear status tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8 space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">
            Support services available across campus
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            CareRoute can connect you with any of these student support areas:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewCategories.map((category) => (
            <CategoryCard key={category.id} category={category} showDescription={true} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/triage">
            <span className="text-xs text-brand-600 hover:text-brand-800 font-semibold inline-flex items-center gap-1">
              Start support request →
            </span>
          </Link>
        </div>
      </section>

      {/* Calm supportive safety note */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-2 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            Need urgent help right now?
          </p>
          <p>
            If you are in immediate danger, please reach out to your {EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NAME} or {EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_NAME}.
          </p>
        </div>
      </section>
    </div>
  );
}
