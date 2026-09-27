import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card, { CardBody, CardFooter, CardHeader } from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import Badge from '../components/Badge.jsx';
import Alert from '../components/Alert.jsx';
import { getCategoryById, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';
import { DEFAULT_MOCK_ASSESSMENT } from '../data/mockAssessment.js';
import { createCaseApi } from '../services/api.js';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowLeft,
  LifeBuoy
} from 'lucide-react';

/**
 * CareRoute Assessment Result Page
 */
export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve assessment from location.state or fallback to default mock assessment
  const assessment = location.state?.assessment || DEFAULT_MOCK_ASSESSMENT;
  const studentInput = location.state?.studentInput || {
    message: "Student reported general concerns requiring guidance.",
    duration: "1-2 weeks",
    impact: "moderate"
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const primaryCategory = getCategoryById(assessment.category);
  const secondaryCategory = assessment.secondaryCategory
    ? getCategoryById(assessment.secondaryCategory)
    : null;

  const isHighRisk = assessment.escalationRequired || assessment.urgency === 'critical';

  const handleConnectSupport = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const createdCase = await createCaseApi({
        category: assessment.category,
        secondaryCategory: assessment.secondaryCategory,
        priority: assessment.urgency,
        assignedService: assessment.recommendedService,
        summary: assessment.summary,
        studentMessage: studentInput.message,
        duration: studentInput.duration,
        impact: studentInput.impact,
        escalationRequired: isHighRisk
      });

      // Route to confirmation screen with created case details
      navigate('/confirmation', {
        state: {
          caseData: createdCase,
          assessment
        }
      });
    } catch (err) {
      console.error('Failed to create support request:', err);
      setError('Could not initialize support request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Triage Assessment Result"
        subtitle="Based on what you shared, CareRoute has evaluated the most appropriate university support service for your situation."
        badge={<Badge variant="brand" size="md">Step 2 of 3</Badge>}
        breadcrumbs={
          <Link to="/triage" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Triage Questionnaire
          </Link>
        }
      />

      {/* Visually Distinct Escalation State for High-Risk Cases */}
      {isHighRisk && (
        <div className="rounded-2xl border-2 border-rose-500 bg-rose-50/90 p-6 sm:p-8 shadow-elevated animate-in fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-rose-600 text-white shrink-0 shadow-sm">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-200/80 px-2.5 py-1 rounded-full">
                  High-Risk / Safety Pathway Activated
                </span>
                <span className="text-xs text-rose-700 font-medium">
                  Priority Escalation Protocol
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-rose-950">
                Immediate Human Escalation Recommended
              </h2>

              <p className="text-sm text-rose-900 leading-relaxed max-w-3xl">
                Your report indicates signals requiring fast-tracked human support. CareRoute does not attempt to provide counselling or emergency intervention directly. We have flagged your request for priority human staff response.
              </p>

              {/* Emergency / Crisis Placeholders */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/90 p-3.5 rounded-xl border border-rose-300 shadow-subtle">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Emergency Services (Immediate Danger)
                  </div>
                  <div className="text-base font-bold text-rose-700 mt-0.5">
                    {EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NUMBER}
                  </div>
                  <div className="text-[11px] text-slate-500">Configurable 24/7 National Emergency placeholder</div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-xl border border-rose-300 shadow-subtle">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Campus Crisis Line
                  </div>
                  <div className="text-base font-bold text-rose-700 mt-0.5">
                    {EMERGENCY_PLACEHOLDERS.CRISIS_COUNSELLOR_CONTACT}
                  </div>
                  <div className="text-[11px] text-slate-500">Configurable on-call crisis duty team placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Assessment Overview Card */}
      <Card
        variant={isHighRisk ? 'crisis' : 'elevated'}
        padding="spacious"
      >
        <div className="space-y-8">
          {/* Top Metadata Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Triage Summary
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Support Service Routing Assessment
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <PriorityBadge priority={assessment.urgency} size="md" />
              <Badge variant="blue" size="md">
                Confidence: {Math.round((assessment.confidence || 0.88) * 100)}%
              </Badge>
            </div>
          </div>

          {/* Assessment Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Concern */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Primary Concern
              </span>
              <div className="text-base font-bold text-slate-900">
                {primaryCategory.name}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {primaryCategory.description}
              </p>
            </div>

            {/* Related / Secondary Concern */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Related Concern
              </span>
              <div className="text-base font-bold text-slate-800">
                {secondaryCategory ? secondaryCategory.name : 'No secondary category detected'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {secondaryCategory ? secondaryCategory.description : 'Primary focus is sufficient for routing.'}
              </p>
            </div>
          </div>

          {/* AI / Triage Short Summary */}
          <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">
              Triage Assessment Summary
            </span>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              "{assessment.summary}"
            </p>
          </div>

          {/* Recommended Support & Rationale */}
          <div className="p-5 rounded-xl border-2 border-brand-200 bg-white shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
                  Recommended Support Service
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                  {assessment.recommendedService}
                </h4>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                {assessment.routingDetails?.routingSLA || 'Standard Review'}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Reason for Recommendation: </span>
              {assessment.rationale || assessment.routingDetails?.rationale || 'Matched based on identified concern and urgency criteria.'}
            </div>
          </div>

          {/* Next Step Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100/80 border border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Next Step
              </span>
              <span className="text-sm font-semibold text-slate-800">
                Connect with {assessment.recommendedService} to open your support case
              </span>
            </div>
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/triage" className="w-full sm:w-auto">
              <Button variant="ghost" size="md" className="w-full sm:w-auto">
                Edit Concern
              </Button>
            </Link>

            <Button
              size="lg"
              variant={isHighRisk ? 'crisis' : 'primary'}
              loading={submitting}
              onClick={handleConnectSupport}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-elevated"
            >
              {isHighRisk ? 'Connect Me to Urgent Support' : 'Connect Me to Support'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
