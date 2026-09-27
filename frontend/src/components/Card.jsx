import React from 'react';

/**
 * CareRoute Design System - Card
 */
export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'normal',
  onClick,
  ...props
}) {
  const baseClasses = 'bg-white rounded-xl transition-smooth text-slate-800';

  const variantClasses = {
    default: 'border border-slate-200/80 shadow-subtle',
    elevated: 'border border-slate-200/60 shadow-elevated',
    flat: 'border border-slate-100 bg-slate-50/50',
    interactive: 'border border-slate-200/90 shadow-sm hover:border-brand-400 hover:shadow-card cursor-pointer',
    crisis: 'border-2 border-rose-300 bg-rose-50/40 shadow-sm',
    warning: 'border-2 border-amber-300 bg-amber-50/40 shadow-sm',
    success: 'border-2 border-emerald-300 bg-emerald-50/40 shadow-sm'
  };

  const paddingClasses = {
    none: 'p-0',
    tight: 'p-4',
    normal: 'p-6',
    spacious: 'p-8'
  };

  const hoverClass = hover ? 'hover:shadow-card hover:-translate-y-0.5' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${paddingClasses[padding]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between pb-4 border-b border-slate-100 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 leading-snug">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`pt-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`pt-4 mt-4 border-t border-slate-100 flex items-center justify-between ${className}`}>{children}</div>;
}
