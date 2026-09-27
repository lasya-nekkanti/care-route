import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

/**
 * CareRoute Design System - Alert
 */
export default function Alert({
  variant = 'info',
  title,
  children,
  action,
  className = ''
}) {
  const styles = {
    info: {
      container: 'bg-brand-50 border-brand-200 text-brand-900',
      icon: <Info className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
    },
    danger: {
      container: 'bg-rose-50 border-rose-300 text-rose-950',
      icon: <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
    },
    crisis: {
      container: 'bg-rose-100 border-2 border-rose-500 text-rose-950 shadow-sm',
      icon: <ShieldAlert className="h-6 w-6 text-rose-700 shrink-0 mt-0.5" />
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
    }
  };

  const current = styles[variant] || styles.info;

  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 flex items-start gap-3.5 ${current.container} ${className}`}
    >
      {current.icon}
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold mb-1 text-inherit">{title}</h4>}
        <div className="text-inherit leading-relaxed opacity-95">{children}</div>
      </div>
      {action && <div className="shrink-0 ml-2">{action}</div>}
    </div>
  );
}
