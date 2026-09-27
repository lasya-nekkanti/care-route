import React from 'react';
import Badge from './Badge.jsx';

/**
 * CareRoute StatusBadge
 * Standardized status indicators across student and staff views
 */
export default function StatusBadge({ status = 'Submitted', size = 'md' }) {
  const norm = (status || '').toLowerCase().trim();

  let variant = 'slate';
  let label = status;

  if (norm.includes('submitted')) {
    variant = 'slate';
    label = 'Submitted';
  } else if (norm.includes('triaged')) {
    variant = 'blue';
    label = 'Triaged';
  } else if (norm.includes('routed')) {
    variant = 'brand';
    label = 'Routed';
  } else if (norm.includes('reviewing') || norm.includes('in progress') || norm.includes('acknowledged')) {
    variant = 'amber';
    label = status;
  } else if (norm.includes('appointment') || norm.includes('scheduled') || norm.includes('response')) {
    variant = 'indigo';
    label = status;
  } else if (norm.includes('resolved') || norm.includes('closed')) {
    variant = 'emerald';
    label = 'Resolved';
  }

  return (
    <Badge variant={variant} size={size} dot>
      {label}
    </Badge>
  );
}
