import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card, { CardBody, CardFooter } from '../components/Card.jsx';
import TextArea from '../components/TextArea.jsx';
import Select from '../components/Select.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';
import Badge from '../components/Badge.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { SUPPORT_CATEGORIES, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';
import { DEMO_SCENARIOS } from '../data/demoScenarios.js';
import { triageStudentApi } from '../services/api.js';
import { ArrowRight, Sparkles, ShieldAlert, RotateCcw, HelpCircle } from 'lucide-react';

/**
 * CareRoute Student Triage Page
 */
export default function Triage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Form State
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [duration, setDuration] = useState('1-2 weeks');
  const [impact, setImpact] = useState('moderate');
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
    setImpact(scenario.impact);
    setSelectedCategory(scenario.categoryHint);
    setError(null);
  };

  const handleClear = () => {
    setMessage('');
    setSelectedCategory(null);
    setDuration('1-2 weeks');
    setImpact('moderate');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || message.trim().length === 0) {
      setError('Please tell us what you have been experiencing so we can route you to the right support.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const assessmentResult = await triageStudentApi({
        message,
        duration,
        impact,
        selectedCategory
      });

      // Pass result into assessment view via React Router state
      navigate('/assessment', {
        state: {
          assessment: assessmentResult,
          studentInput: {
            message,
            duration,
            impact,
            selectedCategory
          }
        }
      });
    } catch (err) {
      console.error('Triage failed:', err);
      setError('An error occurred during triage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card padding="spacious">
          <LoadingState
            message="Analyzing your description..."
            subtext="Evaluating support categories, urgency indicators, and campus routing policies"
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Student Support Triage"
        subtitle="Tell us what's been going on. You don't need to know which department can help — CareRoute will guide you."
        badge={<Badge variant="brand" size="md">Step 1 of 3</Badge>}
      />

      {/* Demo Mode Quick Scenarios Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-elevated border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Judges / Demo Quick Scenarios
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Click a scenario below to auto-fill the triage form:
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {DEMO_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => applyDemoScenario(scen)}
              className="text-left p-2 rounded-lg bg-slate-800/80 hover:bg-brand-600 border border-slate-700 hover:border-brand-400 transition-smooth text-xs group"
            >
              <div className="font-semibold text-slate-200 group-hover:text-white truncate">
                {scen.badge}
              </div>
              <div className="text-[10px] text-slate-400 group-hover:text-brand-100 truncate mt-0.5">
                {scen.isHighRisk ? '⚠️ High-Risk' : 'Standard'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Triage Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card padding="spacious">
          <div className="space-y-6">
            {/* Primary Natural Language Description */}
            <div>
              <TextArea
                label="Describe what you are currently experiencing"
                id="student-concern"
                required
                rows={5}
                placeholder="Share whatever details you are comfortable with. For example: 'I've missed several assignment deadlines because I haven't been sleeping well and my landlord is threatening eviction...'"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError(null);
                }}
                error={error}
                helperText="Everything you write here is treated confidentially to assist with routing."
              />
            </div>

            {/* Optional Category Chips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Optional: Do you already suspect a primary category?
                </label>
                {selectedCategory && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {SUPPORT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-smooth font-medium ${
                        isSelected
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context Questions: Duration and Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
              <Select
                label="How long has this concern been affecting you?"
                id="duration-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                options={[
                  { value: 'Just started / few days', label: 'Just started / few days' },
                  { value: '1-2 weeks', label: '1 to 2 weeks' },
                  { value: 'About a month', label: 'About a month' },
                  { value: 'Several months or ongoing', label: 'Several months or ongoing' }
                ]}
              />

              <Select
                label="How significantly is this impacting your daily routine?"
                id="impact-select"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                options={[
                  { value: 'mild', label: 'Mild — Manageable with some guidance' },
                  { value: 'moderate', label: 'Moderate — Noticeable strain on study/life' },
                  { value: 'severe', label: 'Severe — Struggling to cope or feel overwhelmed' }
                ]}
              />
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="md"
              onClick={handleClear}
              leftIcon={<RotateCcw className="w-4 h-4 text-slate-400" />}
            >
              Reset Form
            </Button>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-elevated"
            >
              Analyze & Continue
            </Button>
          </div>
        </Card>
      </form>

      {/* Safety Notice & Contact Placeholders */}
      <Alert
        variant="info"
        title="Prototype Notice & Safety Protocol"
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          CareRoute is an intelligent navigation router, not a clinical healthcare or emergency provider.
          If your situation involves immediate personal danger or acute crisis, please access immediate help:
          <span className="block mt-1 font-semibold text-slate-800">
            Emergency Services: {EMERGENCY_PLACEHOLDERS.EMERGENCY_SUPPORT_NUMBER} • Campus Safety: {EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_CONTACT}
          </span>
        </p>
      </Alert>
    </div>
  );
}
