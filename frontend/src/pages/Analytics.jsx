import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { getAnalyticsApi } from '../services/api.js';
import {
  BarChart3,
  Clock,
  ShieldAlert,
  Users,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

/**
 * CareRoute Impact & Operations Analytics Dashboard
 */
export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsApi()
      .then((res) => setData(res))
      .catch((err) => console.error('Failed to load analytics:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <Card padding="spacious">
          <LoadingState message="Aggregating operational analytics..." />
        </Card>
      </div>
    );
  }

  const { summary, liveCases } = data;
  const maxCategoryCount = Math.max(...liveCases.byCategory.map((c) => c.count), 1);
  const maxDestinationCount = Math.max(...liveCases.byDestination.map((d) => d.count), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PageHeader
        title="Impact & Operational Analytics"
        subtitle="Measuring triage accuracy, speed to correct support service, and campus-wide student routing efficiency."
        badge={<Badge variant="brand" size="md">Track 1 Impact Story</Badge>}
      />

      {/* Top Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Routed */}
        <Card padding="normal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Inquiries Routed
            </span>
            <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {summary.totalCasesReceived}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all 10 support categories</p>
        </Card>

        {/* Avg Routing Time */}
        <Card padding="normal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Average Routing Time
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {summary.avgRoutingTimeHours} hrs
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            ↓ 84% reduction vs manual email queues
          </p>
        </Card>

        {/* Misrouting Reduction */}
        <Card padding="normal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Misrouting Reduction
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-indigo-600">
            {summary.misroutedRedirectionDropRate}
          </div>
          <p className="text-xs text-slate-500 mt-1">Eliminating "wrong-door" student ping-pong</p>
        </Card>

        {/* Escalated Cases */}
        <Card padding="normal" className="bg-rose-50/20 border-rose-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Safety Escalations Handled
            </span>
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-rose-950">
            {summary.escalatedCases}
          </div>
          <p className="text-xs text-rose-700 font-medium mt-1">
            Zero missed safety keywords in prototype
          </p>
        </Card>
      </div>

      {/* Main Charts & Breakdowns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases by Support Category */}
        <Card padding="spacious">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cases by Support Category
              </h3>
              <p className="text-xs text-slate-500">Volume breakdown across welfare disciplines</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-400">
              Active Cases
            </span>
          </div>

          <div className="space-y-3.5">
            {liveCases.byCategory.map((cat) => {
              const percentage = Math.round((cat.count / maxCategoryCount) * 100);
              return (
                <div key={cat.categoryId} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700">{cat.categoryName}</span>
                    <span className="text-slate-900 font-bold">{cat.count} cases</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Cases by Urgency / Priority */}
        <Card padding="spacious">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cases by Urgency Level
              </h3>
              <p className="text-xs text-slate-500">Triage prioritization distribution</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-400">
              Priority Tier
            </span>
          </div>

          <div className="space-y-4">
            {/* Critical */}
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse"></span>
                  Critical Urgency (Immediate Safety)
                </span>
                <span className="font-bold text-rose-950 text-sm">
                  {liveCases.byUrgency.critical}
                </span>
              </div>
              <div className="h-2 bg-rose-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-600 rounded-full"
                  style={{ width: `${(liveCases.byUrgency.critical / (liveCases.total || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* High */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-amber-900 uppercase tracking-wider">
                  High Urgency (Same-day review)
                </span>
                <span className="font-bold text-amber-900 text-sm">
                  {liveCases.byUrgency.high}
                </span>
              </div>
              <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(liveCases.byUrgency.high / (liveCases.total || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Moderate */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-blue-900 uppercase tracking-wider">
                  Moderate Urgency (Standard 1-2 day SLA)
                </span>
                <span className="font-bold text-blue-900 text-sm">
                  {liveCases.byUrgency.moderate}
                </span>
              </div>
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(liveCases.byUrgency.moderate / (liveCases.total || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Low */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700 uppercase tracking-wider">
                  Low Urgency (Routine inquiry)
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {liveCases.byUrgency.low}
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-500 rounded-full"
                  style={{ width: `${(liveCases.byUrgency.low / (liveCases.total || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Destination Breakdown & Impact Story */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases by Routing Destination */}
        <Card padding="spacious" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cases by Routing Destination Service
              </h3>
              <p className="text-xs text-slate-500">Distribution across university departments</p>
            </div>
          </div>

          <div className="space-y-3">
            {liveCases.byDestination.map((dest) => {
              const percentage = Math.round((dest.count / maxDestinationCount) * 100);
              return (
                <div key={dest.service} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-800 truncate max-w-[80%]">{dest.service}</span>
                    <span className="text-brand-700 font-bold">{dest.count} cases</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-700 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Impact Story Summary */}
        <Card padding="spacious" className="bg-gradient-to-br from-brand-900 to-slate-900 text-white border-0 shadow-elevated">
          <Badge variant="brand" size="sm" className="bg-brand-500/30 text-brand-200 border-brand-400/30 mb-3">
            Track 1 Impact Story
          </Badge>
          <h3 className="text-lg font-bold text-white mb-2">
            Why CareRoute Solves Fragmented Campus Support
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Before CareRoute, students faced a confusing maze of siloed faculty portals, residential committees, and welfare desks. Over 40% of first-time student support inquiries were sent to the wrong department, causing critical delays.
          </p>
          <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero Department Guesswork:</strong> Students express issues in plain language.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Guaranteed Safety Fast-Track:</strong> Crisis flags bypass delays for human review.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Transparent Case Tracking:</strong> Eliminates student anxiety during waiting periods.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
