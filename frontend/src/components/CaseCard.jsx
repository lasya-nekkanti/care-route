import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import PriorityBadge from './PriorityBadge.jsx';
import StatusBadge from './StatusBadge.jsx';
import Button from './Button.jsx';
import { ChevronRight, Clock, ShieldAlert } from 'lucide-react';
import { getCategoryById } from '../data/supportCategories.js';

/**
 * CareRoute Design System - CaseCard
 */
export default function CaseCard({
  caseItem,
  viewUrl = null,
  showActions = true,
  className = ''
}) {
  const categoryInfo = getCategoryById(caseItem.category);
  const formattedTime = new Date(caseItem.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card
      variant={caseItem.escalationRequired || caseItem.priority === 'critical' ? 'crisis' : 'default'}
      hover
      className={`relative ${className}`}
      padding="normal"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-bold text-slate-900 tracking-tight">
            {caseItem.id}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-medium text-slate-500">
            {caseItem.studentIdentifier}
          </span>
          {caseItem.escalationRequired && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              <ShieldAlert className="w-3 h-3" />
              Escalated
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <PriorityBadge priority={caseItem.priority} size="sm" />
          <StatusBadge status={caseItem.status} size="sm" />
        </div>
      </div>

      <div className="py-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1">
          {categoryInfo.name}
        </div>
        <p className="text-sm text-slate-700 font-medium line-clamp-2 leading-relaxed">
          {caseItem.summary}
        </p>
        <div className="mt-2 text-xs text-slate-500">
          Assigned to: <span className="font-semibold text-slate-700">{caseItem.assignedService}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Received {formattedTime}</span>
        </div>

        {showActions && viewUrl && (
          <Link to={viewUrl}>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
              View Details
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
