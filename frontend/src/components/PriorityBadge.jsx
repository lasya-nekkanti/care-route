import React from 'react';
import Badge from './Badge.jsx';

/**
 * CareRoute PriorityBadge
 * Displays priority / urgency level with both accessible text label and color coding
 */
export default function PriorityBadge({ priority = 'moderate', size = 'md' }) {
  const norm = (priority || '').toLowerCase();

  switch (norm) {
    case 'critical':
      return (
        <Badge variant="rose" size={size} dot className="font-semibold uppercase tracking-wider">
          Critical Priority
        </Badge>
      );
    case 'high':
      return (
        <Badge variant="amber" size={size} dot className="font-medium">
          High Priority
        </Badge>
      );
    case 'moderate':
      return (
        <Badge variant="brand" size={size} dot className="font-medium">
          Moderate
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="slate" size={size} dot className="font-medium">
          Low Priority
        </Badge>
      );
    default:
      return (
        <Badge variant="slate" size={size}>
          {priority}
        </Badge>
      );
  }
}
