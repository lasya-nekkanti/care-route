import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import TextArea from '../components/TextArea.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';
import Badge from '../components/Badge.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { SUPPORT_CATEGORIES, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';
import { DEMO_SCENARIOS } from '../data/demoScenarios.js';
import { triageStudentApi } from '../services/api.js';
import { ArrowRight, Sparkles, RotateCcw, HeartHandshake, HelpCircle } from 'lucide-react';

/**
 * CareRoute Student Triage Page
 * Conversational, lightweight, and calm.
 */
export default function Triage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Demo mode is activated ONLY when ?demo=true is in the URL
  const isDemoMode = searchParams.get('demo') === 'true' || searchParams.get('demo') === '1';

  // Form State
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [duration, setDuration] = useState('A few weeks');
  const [impact, setImpact] = useState('Somewhat');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check URL query parameters for pre-selected demo scenario
  useEffect(() => {
    const scenarioId = searchParams.get('scenario');
    if (scenarioId) {
      const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
      if (scenario) {
        applyDemoScenario(scenario);
      }
    }
  }, [searchParams]);

  const applyDemoScenario = (scenario) => {
    setMessage(scenario.message);
    setDuration(scenario.duration);
    setImpact(scenario.impact === 'severe' ? 'A lot' : scenario.impact === 'mild' ? 'A little' : 'Somewhat');
    setSelectedCategory(scenario.categoryHint);
    setError(null);
  };

  const handleClear = () => {
    setMessage('');
    setSelectedCategory(null);
    setDuration('A few weeks');
    setImpact('Somewhat');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || message.trim().length === 0) {
      setError("Please share a few words about what you're experiencing so we can guide you to the right place.");
      return;
    }

    setLoading(true);
    setError(null);

    // Map conversational impact to internal values
    const impactMap = {
      'A little': 'mild',
      'Somewhat': 'moderate',
      'A lot': 'severe'
    };

    try {
      const assessmentResult = await triageStudentApi({
        message,
        duration,
        impact: impactMap[impact] || 'moderate',
        selectedCategory
      });

      // Pass result into assessment view
      navigate('/assessment', {
        state: {
          assessment: assessmentResult,
          studentInput: {
            message,
            duration,
            impact: impactMap[impact] || 'moderate',
            selectedCategory
          }
        }
      });
    } catch (err) {
      console.error('Triage failed:', err);
      setError('An unexpected issue occurred while finding support. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4">
        <Card padding="spacious" className="text-center">
          <LoadingState
            message="Finding the support that can help..."
            subtext="Connecting your concern with the right campus service"
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Demo Mode Ribbon - ONLY SHOWN WHEN ?demo=true */}
      {isDemoMode && (
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-elevated border border-slate-700 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Judge Demo Mode Active
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Click a scenario to auto-fill:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {DEMO_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                type="button"
                onClick={() => applyDemoScenario(scen)}
                className="text-left p-2 rounded-lg bg-slate-800 hover:bg-brand-600 border border-slate-700 transition-smooth text-xs group"
              >
                <div className="font-semibold text-slate-200 group-hover:text-white truncate">
                  {scen.badge}
                </div>
                <div className="text-[10px] text-slate-400 group-hover:text-brand-100 truncate mt-0.5">
                  {scen.isHighRisk ? 'Immediate' : 'Standard'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversational Intro Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          What would you like help with?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tell us what's been going on. You don't need to know which department can help.
        </p>
      </div>

      {/* Main Conversational Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card padding="spacious" className="shadow-card border-slate-200/80">
          <div className="space-y-6">
            {/* Primary Large Text Area */}
            <div>
              <label htmlFor="student-concern" className="block text-sm font-semibold text-slate-800 mb-2">
                Describe your concern in your own words
              </label>
              <textarea
                id="student-concern"
                rows={6}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Share whatever you're comfortable with. For example: 'I've missed several assignment deadlines because I haven't been sleeping well and my landlord is threatening eviction...'"
                className={`w-full rounded-xl border p-4 text-sm text-slate-900 placeholder:text-slate-400 transition-smooth focus:border-brand-500 focus:ring-2 focus:ring-brand-100 leading-relaxed ${
                  error ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-300'
                }`}
              />
              {error && (
                <p className="mt-2 text-xs text-rose-600 font-medium">{error}</p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                You can write as little or as much as you'd like. Everything is treated with care and privacy.
              </p>
            </div>

            {/* Conversational Question 1: Duration */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-800 mb-2.5">
                How long has this been affecting you?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Today', 'A few days', 'A few weeks', 'Longer'].map((opt) => {
                  const isSelected = duration === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDuration(opt)}
                      className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-smooth text-center ${
                        isSelected
                          ? 'bg-brand-50 border-brand-600 text-brand-800 font-semibold ring-1 ring-brand-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conversational Question 2: Daily Life Impact */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-800 mb-2.5">
                How much is this affecting your daily life?
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {['A little', 'Somewhat', 'A lot'].map((opt) => {
                  const isSelected = impact === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setImpact(opt)}
                      className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-smooth text-center ${
                        isSelected
                          ? 'bg-brand-50 border-brand-600 text-brand-800 font-semibold ring-1 ring-brand-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Category Chips (Examples) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">
                  Optional: Or choose a topic below if that's easier (you can skip this)
                </span>
                {selectedCategory && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                  >
                    Clear tag
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      className={`text-xs px-3 py-1 rounded-full border transition-smooth ${
                        isSelected
                          ? 'bg-slate-800 text-white border-slate-800 font-medium shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-slate-600 transition-smooth font-medium order-2 sm:order-1"
            >
              Reset
            </button>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-sm order-1 sm:order-2 px-8"
            >
              Continue
            </Button>
          </div>
        </Card>
      </form>

      {/* Supportive footer note */}
      <div className="text-center text-xs text-slate-500">
        <p>
          Not sure where to begin? Just write what's on your mind. CareRoute will help direct you to the right campus person.
        </p>
      </div>
    </div>
  );
}
