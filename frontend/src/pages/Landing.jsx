import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Shield, ArrowRight, UserCheck, Sparkles, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import { SUPPORT_CATEGORIES, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';

/**
 * CareRoute Landing Page
 */
export default function Landing() {
  const featuredCategories = SUPPORT_CATEGORIES.slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CareRoute Campus Support Router</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Finding the right support shouldn't be another problem.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          CareRoute helps students identify the support they need and connects them to the right campus service.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/triage" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              leftIcon={<HeartHandshake className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto text-base shadow-elevated"
            >
              Get Support
            </Button>
          </Link>

          <Link to="/staff" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              leftIcon={<Shield className="w-5 h-5 text-slate-500" />}
              className="w-full sm:w-auto text-base"
            >
              Support Staff
            </Button>
          </Link>
        </div>

        {/* Essential Safety Disclaimer */}
        <p className="mt-5 text-xs text-slate-500 max-w-xl mx-auto">
          Confidential • No account required to explore • Not a clinical diagnostic service
        </p>
      </section>

      {/* Primary Visual Journey: Student → Triage → Right Support */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-10">
          <div className="text-center mb-10">
            <Badge variant="brand" size="md">How It Works</Badge>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Three steps to connected care
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              You don't need to know which department handles your issue. We help you navigate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-5 rounded-xl bg-slate-50 border border-slate-100 relative">
              <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                1
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1.5">Student Shares Concern</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Describe what's happening in your own words. Choose optional tags and context without pressure.
              </p>
              <div className="mt-4 text-[11px] font-semibold text-brand-700 bg-brand-50/80 px-2.5 py-1 rounded-full border border-brand-100">
                Natural Language
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-5 rounded-xl bg-brand-50/60 border border-brand-100 relative">
              <div className="h-12 w-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                2
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1.5">Intelligent Triage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                CareRoute determines primary categories, urgency levels, and identifies whether urgent safety escalation is needed.
              </p>
              <div className="mt-4 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Safety Safeguards
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-5 rounded-xl bg-slate-50 border border-slate-100 relative">
              <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                3
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1.5">Right Support Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an immediate recommended action plan and connect directly to the appropriate campus service with a tracking case.
              </p>
              <div className="mt-4 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                Fast-Track Routing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories Grid Preview */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="slate" size="md">Support Scope</Badge>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              University Support Services Covered
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              CareRoute covers 10 primary university student welfare domains.
            </p>
          </div>
          <Link to="/triage">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Explore Full Triage
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* High-Risk Safeguarding Notice */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-100 text-rose-700 shrink-0">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-950">In Urgent Crisis or Need Immediate Safety Support?</h3>
              <p className="text-sm text-rose-800 mt-1 max-w-2xl leading-relaxed">
                If you are in immediate physical danger, feeling unable to keep yourself safe, or experiencing an active emergency, please do not wait for online triage.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-rose-900">
                <span className="bg-white/80 px-2.5 py-1 rounded-md border border-rose-200">
                  Emergency: {EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NUMBER}
                </span>
                <span className="bg-white/80 px-2.5 py-1 rounded-md border border-rose-200">
                  Security: {EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_CONTACT}
                </span>
              </div>
            </div>
          </div>
          <Link to="/triage?scenario=high-risk-crisis" className="shrink-0 w-full md:w-auto">
            <Button variant="crisis" size="md" className="w-full md:w-auto">
              Crisis Protocol Details
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
