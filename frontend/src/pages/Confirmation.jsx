import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { CheckCircle2, ArrowRight, HeartHandshake, Shield } from 'lucide-react';
import { EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';

/**
 * CareRoute Support Confirmation Page
 * Calm, reassuring confirmation that support is on the way.
 */
export default function Confirmation() {
  const location = useLocation();

  const caseData = location.state?.caseData || {
    id: 'CR-1002',
    assignedService: 'Academic Support & Tutoring Services',
    status: 'Routed',
    category: 'academic',
    createdAt: new Date().toISOString()
  };

  const isHighRisk = location.state?.isHighRisk || caseData.escalationRequired;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-8">
      {/* Reassuring Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-1">
          <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHighRisk ? "We're connecting you with support" : "Request created"}
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          {isHighRisk
            ? "Your message has been received with priority. A team member is being notified so they can reach out to you promptly."
            : "Your request has been shared with the relevant campus team who will review it and reach out."}
        </p>
      </div>

      {/* Case Overview Card */}
      <Card padding="spacious" className="shadow-card border-slate-200/80">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Case reference
              </span>
              <div className="text-2xl font-mono font-bold text-slate-900 mt-0.5">
                {caseData.id}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 self-start sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-brand-500"></span>
              Awaiting Support Response
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Routed to
              </span>
              <div className="text-base font-bold text-slate-900">
                {caseData.assignedService}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 text-xs text-slate-600 leading-relaxed space-y-1">
              <span className="font-semibold text-slate-800 block">What to expect next:</span>
              <p>
                A staff coordinator will review your information and get in touch with next steps or appointment options. You can track updates at any time using your case reference.
              </p>
            </div>
          </div>

          {/* Neutral Safety Support Reminder if needed */}
          {isHighRisk && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">Need someone right now?</span>
              <p>
                If you feel your safety is at risk, please reach out to {EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NAME} or {EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_NAME} without delay.
              </p>
            </div>
          )}

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to={`/status/${caseData.id}`} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-sm px-8"
              >
                View My Support Status
              </Button>
            </Link>

            <Link to="/" className="w-full sm:w-auto">
              <Button variant="ghost" size="md" className="w-full sm:w-auto text-slate-500">
                Return home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
