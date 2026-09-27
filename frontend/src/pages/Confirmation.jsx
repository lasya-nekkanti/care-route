import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import Badge from '../components/Badge.jsx';
import Alert from '../components/Alert.jsx';
import { CheckCircle2, ArrowRight, Copy, ExternalLink, HelpCircle, ShieldAlert } from 'lucide-react';
import { EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';

/**
 * CareRoute Support Confirmation Page
 */
export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve caseData from location.state or fallback
  const caseData = location.state?.caseData || {
    id: 'CR-1002',
    assignedService: 'Academic Support & Tutoring Services',
    priority: 'moderate',
    status: 'Routed',
    category: 'academic',
    summary: 'Student reports academic stress affecting wellbeing.',
    createdAt: new Date().toISOString()
  };

  const isHighRisk = caseData.escalationRequired || caseData.priority === 'critical';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-2 shadow-sm">
          <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
        </div>
        <Badge variant="emerald" size="md">Request Created</Badge>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Support Request Created
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Your case has been securely registered in CareRoute and forwarded to the appropriate student service team.
        </p>
      </div>

      {/* Case Overview Card */}
      <Card
        variant={isHighRisk ? 'crisis' : 'elevated'}
        padding="spacious"
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Case Reference
              </span>
              <div className="text-2xl font-mono font-extrabold text-brand-700 mt-0.5 flex items-center gap-2">
                <span>{caseData.id}</span>
                <span className="text-xs font-normal text-slate-400 font-sans">
                  (Save this reference number)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PriorityBadge priority={caseData.priority} size="md" />
              <StatusBadge status="Awaiting Support Response" size="md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Routed To
              </span>
              <div className="text-base font-bold text-slate-900">
                {caseData.assignedService}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Current Status
              </span>
              <div className="text-base font-bold text-amber-700">
                Awaiting Support Response
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-100 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-brand-900 block mb-1">What Happens Next?</span>
            A staff member from <strong className="text-brand-900">{caseData.assignedService}</strong> has received your triaged details and will review your file based on the priority level. You can check the live status and updates at any time using your case reference number.
          </div>

          {/* High-Risk Guidance Notice if applicable */}
          {isHighRisk && (
            <Alert variant="danger" title="Priority Escalation Protocol Active">
              <p className="text-xs text-rose-900">
                This case has been prioritized for accelerated human review. If you need immediate intervention right now, please reach out to campus security ({EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_CONTACT}) or national emergency services ({EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NUMBER}).
              </p>
            </Alert>
          )}

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={`/status/${caseData.id}`} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-elevated"
              >
                View My Support Status
              </Button>
            </Link>

            <Link to="/" className="w-full sm:w-auto">
              <Button variant="ghost" size="md" className="w-full sm:w-auto">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
