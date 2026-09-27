import React from 'react';
import { Inbox } from 'lucide-react';

/**
 * CareRoute Design System - EmptyState
 */
export default function EmptyState({
  icon = null,
  title = "No items found",
  description = "There are no records matching your current filter or request.",
  action = null,
  className = ''
}) {
  return (
    <div className={`text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white/60 ${className}`}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-4">
        {icon || <Inbox className="h-7 w-7 stroke-[1.5]" />}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
