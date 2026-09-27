import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { getCaseByIdApi, getCasesApi } from '../services/api.js';
import { getCategoryById } from '../data/supportCategories.js';
import {
  Search,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const STATUS_STAGES = [
  'Submitted',
  'Triaged',
  'Routed',
  'Support Team Reviewing',
  'Appointment / Response',
  'Resolved'
];

/**
 * CareRoute Student Case Status View
 */
export default function CaseStatus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState(id || 'CR-1002');
  const [currentCase, setCurrentCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableCases, setAvailableCases] = useState([]);

  useEffect(() => {
    // Load list of cases for quick lookup dropdown / demo selector
    getCasesApi().then((data) => {
      if (data && data.cases) {
        setAvailableCases(data.cases);
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    const targetId = id || searchId;
    if (targetId) {
      loadCase(targetId);
    }
  }, [id]);

  const loadCase = async (caseId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCaseByIdApi(caseId);
      setCurrentCase(data);
      setSearchId(caseId);
    } catch (err) {
      console.warn('Could not find case:', err);
      setError(`Case "${caseId}" was not found. Please verify your reference number.`);
      setCurrentCase(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/status/${searchId.trim()}`);
    }
  };

  // Determine which step in the 6-stage lifecycle the case has reached
  const getStageIndex = (statusStr) => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('resolved')) return 5;
    if (s.includes('appointment') || s.includes('response') || s.includes('scheduled')) return 4;
    if (s.includes('reviewing') || s.includes('in progress') || s.includes('acknowledged')) return 3;
    if (s.includes('routed')) return 2;
    if (s.includes('triaged')) return 1;
    return 0; // Submitted
  };

  const currentStageIndex = currentCase ? getStageIndex(currentCase.status) : 0;
  const categoryInfo = currentCase ? getCategoryById(currentCase.category) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Student Case Status"
        subtitle="Track your support request progress, view assigned university services, and review communication notes."
        action={
          <Link to="/triage">
            <Button variant="outline" size="sm">
              Submit New Request
            </Button>
          </Link>
        }
      />

      {/* Case ID Search & Quick Picker Bar */}
      <Card padding="tight" className="bg-slate-50/80 border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <Input
              id="case-search"
              placeholder="Search by Case ID (e.g. CR-1002)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              className="max-w-md"
            />
            <Button type="submit" variant="primary" size="md">
              Lookup
            </Button>
          </form>

          {/* Quick Demo Case Switcher */}
          {availableCases.length > 0 && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium shrink-0">Demo switcher:</span>
              <select
                aria-label="Select demo case"
                value={currentCase?.id || ''}
                onChange={(e) => navigate(`/status/${e.target.value}`)}
                className="text-xs bg-white border border-slate-300 rounded-lg p-1.5 text-slate-700 font-mono"
              >
                {availableCases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.category} ({c.priority})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </Card>

      {/* Loading & Error States */}
      {loading && (
        <Card padding="spacious">
          <LoadingState message="Fetching case information..." subtext="Checking routing timeline" />
        </Card>
      )}

      {error && !loading && (
        <EmptyState
          title="Case Not Found"
          description={error}
          action={
            <Button variant="secondary" onClick={() => loadCase('CR-1002')}>
              Load Sample Case CR-1002
            </Button>
          }
        />
      )}

      {/* Case Details View */}
      {currentCase && !loading && (
        <div className="space-y-6">
          {/* Main Case Header Card */}
          <Card
            variant={currentCase.escalationRequired || currentCase.priority === 'critical' ? 'crisis' : 'default'}
            padding="spacious"
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-mono font-extrabold text-slate-900 tracking-tight">
                      {currentCase.id}
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {currentCase.studentIdentifier}
                    </span>
                    {currentCase.escalationRequired && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Escalated Case
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Submitted on {new Date(currentCase.createdAt).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <PriorityBadge priority={currentCase.priority} size="md" />
                  <StatusBadge status={currentCase.status} size="md" />
                </div>
              </div>

              {/* Grid Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Concern Category
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {categoryInfo ? categoryInfo.name : currentCase.category}
                  </div>
                  {currentCase.secondaryCategory && (
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Secondary: {currentCase.secondaryCategory}
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Assigned University Service
                  </span>
                  <div className="text-sm font-bold text-brand-700">
                    {currentCase.assignedService}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Handling department responsible for review and appointment
                  </span>
                </div>
              </div>

              {/* Case Summary */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Triage Summary & Notes
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {currentCase.summary}
                </p>
              </div>

              {/* Student Message Preview (Confidential) */}
              {currentCase.studentMessage && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Your Submitted Description (Encrypted / Anonymized)
                  </span>
                  <p className="text-slate-600 italic">
                    "{currentCase.studentMessage}"
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Stepped Status Timeline */}
          <Card padding="spacious">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Case Routing & Resolution Timeline
            </h3>

            {/* Visual Stepper */}
            <div className="mb-10">
              <div className="hidden md:flex items-center justify-between relative">
                {/* Background Line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0"></div>
                <div
                  className="absolute top-4 left-6 h-0.5 bg-brand-600 -z-0 transition-all duration-500"
                  style={{ width: `${(currentStageIndex / (STATUS_STAGES.length - 1)) * 100}%` }}
                ></div>

                {STATUS_STAGES.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage} className="flex flex-col items-center relative z-10 w-28 text-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-smooth ${
                          isCurrent
                            ? 'bg-brand-600 text-white ring-4 ring-brand-100 shadow-sm'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {isCompleted && !isCurrent ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold mt-2.5 leading-tight ${
                          isCurrent
                            ? 'text-brand-700'
                            : isCompleted
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Stepper Notice */}
              <div className="md:hidden flex items-center gap-2 p-3 rounded-lg bg-brand-50 border border-brand-200">
                <Clock className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-semibold text-brand-900">
                  Current Stage {currentStageIndex + 1} of {STATUS_STAGES.length}: {STATUS_STAGES[currentStageIndex]}
                </span>
              </div>
            </div>

            {/* Chronological Event History */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Activity Log
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {currentCase.timeline && currentCase.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-white"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="font-bold text-slate-900 text-sm">
                        {event.status}
                      </span>
                      <span className="text-slate-400">
                        {new Date(event.timestamp).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {event.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
