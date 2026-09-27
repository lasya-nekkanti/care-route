import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BarChart3, AlertOctagon, Clock, CheckCircle2, ListFilter } from 'lucide-react';

/**
 * CareRoute Design System - Sidebar
 * Used for Staff Portal and administrative workflows
 */
export default function Sidebar({
  activeFilter = 'all',
  onFilterChange,
  counts = { all: 0, critical: 0, high: 0, reviewing: 0, resolved: 0 }
}) {
  const filterItems = [
    { id: 'all', label: 'All Incoming Cases', icon: <ListFilter className="w-4 h-4" />, count: counts.all },
    { id: 'critical', label: 'Immediate Escalations', icon: <AlertOctagon className="w-4 h-4 text-rose-600" />, count: counts.critical, highlight: true },
    { id: 'high', label: 'High Priority', icon: <Clock className="w-4 h-4 text-amber-600" />, count: counts.high },
    { id: 'reviewing', label: 'Under Review', icon: <Shield className="w-4 h-4 text-brand-600" />, count: counts.reviewing },
    { id: 'resolved', label: 'Resolved Cases', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />, count: counts.resolved },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white rounded-xl border border-slate-200/80 p-4 shadow-subtle">
      <div className="mb-4 pb-3 border-b border-slate-100">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Staff Case Queues
        </h2>
      </div>

      <nav className="space-y-1" aria-label="Staff filters">
        {filterItems.map((item) => {
          const isSelected = activeFilter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange && onFilterChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg font-medium transition-smooth ${
                isSelected
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    item.highlight && item.count > 0
                      ? 'bg-rose-100 text-rose-800'
                      : isSelected
                      ? 'bg-brand-200 text-brand-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-4 border-t border-slate-100">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Management Links
        </h2>
        <NavLink
          to="/analytics"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth font-medium"
        >
          <BarChart3 className="w-4 h-4 text-slate-500" />
          <span>Operational Analytics</span>
        </NavLink>
      </div>
    </aside>
  );
}
