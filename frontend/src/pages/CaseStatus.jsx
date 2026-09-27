import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { getCaseByIdApi, getCasesApi } from '../services/api.js';
import { getCategoryById } from '../data/supportCategories.js';
import {
  Search,
  Clock,
  CheckCircle2,
  Calendar,
  HelpCircle,
  ArrowRight
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
 * CareRoute Student Case Status View ("My Request")
 * Calm, transparent progress tracking for the student.
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
      setError(`Case reference "${caseId}" was not found. Please check your reference code.`);
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

  const getStageIndex = (statusStr) => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('resolved')) return 5;
    if (s.includes('appointment') || s.includes('response') || s.includes('scheduled')) return 4;
    if (s.includes('reviewing') || s.includes('in progress') || s.includes('acknowledged')) return 3;
    if (s.includes('routed')) return 2;
    if (s.includes('triaged')) return 1;
    return 0;
  };

  const currentStageIndex = currentCase ? getStageIndex(currentCase.status) : 0;
  const categoryInfo = currentCase ? getCategoryById(currentCase.category) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Track Your Request
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Check live updates and messages regarding your support case.
        </p>
      </div>

      {/* Case Lookup Bar */}
      <Card padding="tight" className="bg-white border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full flex-1">
            <Input
              id="case-search"
              placeholder="Enter Case Reference (e.g. CR-1002)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
            <Button type="submit" variant="primary" size="md">
              Find
            </Button>
          </form>

          {/* Discreet case switcher for demonstration */}
          {availableCases.length > 0 && (
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto text-xs text-slate-400">
              <span>Sample:</span>
              <select
                aria-label="Select demo case"
                value={currentCase?.id || ''}
                onChange={(e) => navigate(`/status/${e.target.value}`)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-1 text-slate-600 font-mono"
              >
                {availableCases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id}
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
          <LoadingState message="Checking request status..." />
        </Card>
      )}

      {error && !loading && (
        <EmptyState
          title="Case Not Found"
          description={error}
          action={
            <Button variant="secondary" onClick={() => loadCase('CR-1002')}>
              View Sample Request
            </Button>
          }
        />
      )}

      {/* Case Overview */}
      {currentCase && !loading && (
        <div className="space-y-6">
          <Card padding="spacious" className="shadow-card border-slate-200/80">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Case Reference
                  </span>
                  <div className="text-xl font-mono font-bold text-slate-900 mt-0.5">
                    {currentCase.id}
                  </div>
                </div>

                <div>
                  <StatusBadge status={currentCase.status} size="md" />
                </div>
              </div>

              {/* Grid Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Support Category
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {categoryInfo ? categoryInfo.name : currentCase.category}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Assigned Campus Service
                  </span>
                  <div className="text-sm font-bold text-brand-700">
                    {currentCase.assignedService}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Visual Progress Timeline */}
          <Card padding="spacious" className="shadow-card border-slate-200/80">
            <h2 className="text-base font-bold text-slate-900 mb-6">
              Progress Timeline
            </h2>

            {/* Stepper */}
            <div className="mb-8">
              <div className="hidden md:flex items-center justify-between relative">
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-100 -z-0"></div>
                <div
                  className="absolute top-4 left-6 h-0.5 bg-brand-600 -z-0 transition-all duration-500"
                  style={{ width: `${(currentStageIndex / (STATUS_STAGES.length - 1)) * 100}%` }}
                ></div>

                {STATUS_STAGES.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage} className="flex flex-col items-center relative z-10 w-24 text-center">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs transition-smooth ${
                          isCurrent
                            ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border-2 border-slate-200 text-slate-400'
                        }`}
                      >
                        {isCompleted && !isCurrent ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-medium mt-2 leading-tight ${
                          isCurrent
                            ? 'text-brand-700 font-semibold'
                            : isCompleted
                            ? 'text-slate-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Stepper */}
              <div className="md:hidden flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="text-slate-700">
                  Current Stage: <strong className="text-slate-900">{STATUS_STAGES[currentStageIndex]}</strong>
                </span>
              </div>
            </div>

            {/* Updates Log */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Updates Log
              </span>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {currentCase.timeline && currentCase.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 h-2 w-2 rounded-full bg-brand-600 ring-4 ring-white"></div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">
                        {event.status}
                      </span>
                      <span className="text-slate-400">
                        {new Date(event.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
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
