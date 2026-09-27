import React from 'react';
import Card from './Card.jsx';
import Badge from './Badge.jsx';
import {
  GraduationCap,
  HeartHandshake,
  Activity,
  Banknote,
  Home,
  Accessibility,
  ShieldAlert,
  AlertOctagon,
  Users,
  HelpCircle
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  HeartHandshake,
  Activity,
  Banknote,
  Home,
  Accessibility,
  ShieldAlert,
  AlertOctagon,
  Users,
  HelpCircle
};

/**
 * CareRoute Design System - CategoryCard
 */
export default function CategoryCard({
  category,
  selected = false,
  onClick,
  showDescription = true,
  className = ''
}) {
  const IconComponent = iconMap[category.icon] || HelpCircle;

  return (
    <Card
      variant={selected ? 'interactive' : 'default'}
      onClick={onClick}
      className={`relative cursor-pointer transition-smooth border-2 ${
        selected
          ? 'border-brand-600 bg-brand-50/40 ring-2 ring-brand-100'
          : category.escalation
          ? 'border-rose-100 hover:border-rose-300'
          : 'border-slate-200/80 hover:border-brand-300'
      } ${className}`}
      padding="tight"
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
            category.escalation
              ? 'bg-rose-100 text-rose-700'
              : selected
              ? 'bg-brand-600 text-white'
              : 'bg-brand-50 text-brand-700'
          }`}
        >
          <IconComponent className="h-5 w-5 stroke-[2]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {category.name}
            </h4>
            {category.escalation && (
              <Badge variant="rose" size="sm">
                Priority Care
              </Badge>
            )}
          </div>

          <p className="text-xs font-medium text-brand-700 mb-1">
            {category.service}
          </p>

          {showDescription && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
