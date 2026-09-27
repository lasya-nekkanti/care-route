import React from 'react';

/**
 * CareRoute Design System - LoadingState
 */
export default function LoadingState({
  message = "Analyzing your concern and checking campus routing rules...",
  subtext = "This usually takes just a few seconds",
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="relative flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 rounded-full bg-brand-500 animate-ping"></span>
        </div>
      </div>
      <h3 className="text-base font-semibold text-slate-800">{message}</h3>
      {subtext && <p className="mt-1.5 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
}
