import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';
import { getCategoryById, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';
import { DEFAULT_MOCK_ASSESSMENT } from '../data/mockAssessment.js';
import { createCaseApi } from '../services/api.js';
import {
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  PhoneCall,
  UserCheck,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';

/**
 * CareRoute Assessment Page
 * Human, reassuring, and calm. No technical triage jargon.
 */
export default function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve assessment from location.state or fallback
  const assessment = location.state?.assessment || DEFAULT_MOCK_ASSESSMENT;
  const studentInput = location.state?.studentInput || {
    message: "Student reported general concerns requiring guidance.",
    duration: "A few weeks",
    impact: "moderate"
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const primaryCategory = getCategoryById(assessment.category);
  const secondaryCategory = assessment.secondaryCategory
    ? getCategoryById(assessment.secondaryCategory)
    : null;

  const isHighRisk = assessment.escalationRequired || assessment.urgency === 'critical';

  const handleConnectSupport = async (selectedServiceOverride = null, isUrgentAction = false) => {
    setSubmitting(true);
    setError(null);

    const targetService = selectedServiceOverride || assessment.recommendedService;

    try {
      const createdCase = await createCaseApi({
        category: assessment.category,
        secondaryCategory: assessment.secondaryCategory,
        priority: assessment.urgency || 'moderate',
        assignedService: targetService,
        summary: assessment.summary || "Student requested guidance through CareRoute.",
        studentMessage: studentInput.message,
        duration: studentInput.duration,
        impact: studentInput.impact,
        escalationRequired: isHighRisk,
        urgentActionTaken: isUrgentAction
      });

      // Navigate to confirmation screen
      navigate('/confirmation', {
        state: {
          caseData: createdCase,
          assessment,
          isHighRisk
        }
      });
    } catch (err) {
      console.error('Failed to connect with support:', err);
      setError('Could not connect with support at this moment. Please try again or reach out to campus services directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------------------------------------------------
  // 1. CALM CRISIS / IMMEDIATE SUPPORT VIEW
  // -------------------------------------------------------------------------
  if (isHighRisk) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* Soft, calm card — no alarming red walls or warning banners */}
        <Card padding="spacious" className="border-slate-200 shadow-card bg-white text-slate-800">
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-1">
              <HeartHandshake className="h-6 w-6 stroke-[2]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              You don't have to handle this alone.
            </h1>

            <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Based on what you've shared, we'd like to connect you with a person who can support you right now.
            </p>
          </div>

          <div className="py-6 space-y-4">
            {/* Primary Action: Immediate human support */}
            <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Speak with on-duty support
                </h2>
                <p className="text-xs text-slate-600">
                  Connect immediately with a dedicated university support staff member.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                loading={submitting}
                onClick={() => handleConnectSupport(null, true)}
                className="w-full sm:w-auto shrink-0 shadow-sm"
              >
                Get immediate support
              </Button>
            </div>

            {/* Secondary Action: Campus Counsellor */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Campus wellbeing & counselling
                </h2>
                <p className="text-xs text-slate-600">
                  Schedule confidential time to talk with a qualified campus counsellor.
                </p>
              </div>
              <Button
                variant="outline"
                size="md"
                loading={submitting}
                onClick={() => handleConnectSupport("Student Wellbeing & Counselling Service", false)}
                className="w-full sm:w-auto shrink-0"
              >
                Connect with a campus counsellor
              </Button>
            </div>

            {/* Request a human callback */}
            <div className="p-4 rounded-xl border border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span>Prefer someone to call or message you?</span>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleConnectSupport(null, false)}
                className="font-semibold text-brand-600 hover:text-brand-800 transition-smooth"
              >
                Request a human callback →
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          {/* Reassuring note with neutral placeholders */}
          <div className="pt-6 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              If you are in immediate danger, please contact your local emergency service or someone you trust who can stay with you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-slate-400">
              <span>{EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NAME}</span>
              <span>•</span>
              <span>{EMERGENCY_PLACEHOLDERS.CRISIS_COUNSELLOR_NAME}</span>
              <span>•</span>
              <span>{EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_NAME}</span>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link
            to="/triage"
            className="text-xs text-slate-400 hover:text-slate-600 transition-smooth inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to edit your message
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 2. NORMAL ASSESSMENT VIEW
  // -------------------------------------------------------------------------
  const naturalRationale = assessment.rationale ||
    `Your responses suggest that ${primaryCategory.name.toLowerCase()} is affecting your day-to-day routine. Connecting directly with ${assessment.recommendedService} will help you access the right advice.`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Friendly Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Here's what we think could help
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
          We've matched your concern with the campus team best suited to assist you.
        </p>
      </div>

      {/* Main Support Recommendation Card */}
      <Card padding="spacious" className="shadow-card border-slate-200/80">
        <div className="space-y-6">
          {/* Primary & Related Concern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Primary Concern
              </span>
              <div className="text-base font-bold text-slate-900">
                {primaryCategory.name}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Related Concern
              </span>
              <div className="text-base font-medium text-slate-800">
                {secondaryCategory ? secondaryCategory.name : 'None indicated'}
              </div>
            </div>
          </div>

          {/* Recommended Support Service */}
          <div className="p-5 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-2">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
              Recommended Support
            </span>
            <div className="text-xl font-bold text-slate-900">
              {assessment.recommendedService}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {primaryCategory.description}
            </p>
          </div>

          {/* Why Section */}
          <div className="space-y-1.5 px-1">
            <span className="text-xs font-bold text-slate-700 block">
              Why this service:
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {naturalRationale}
            </p>
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          {/* Next Action Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/triage" className="order-2 sm:order-1">
              <span className="text-xs text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </span>
            </Link>

            <Button
              size="lg"
              variant="primary"
              loading={submitting}
              onClick={() => handleConnectSupport()}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-sm px-8 order-1 sm:order-2"
            >
              Connect me to support →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
