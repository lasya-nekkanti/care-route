import React from 'react';

/**
 * CareRoute Design System - PageHeader
 */
export default function PageHeader({
  title,
  subtitle,
  badge,
  action,
  breadcrumbs,
  className = ''
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {breadcrumbs && <div className="mb-3 text-xs text-slate-500">{breadcrumbs}</div>}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && (
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
      </div>
    </div>
  );
}
