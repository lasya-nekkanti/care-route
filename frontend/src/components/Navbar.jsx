import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Shield, BarChart3, Search, Menu, X, HeartHandshake, ArrowRight, LogOut } from 'lucide-react';

/**
 * CareRoute Design System - Navbar
 * Context-aware: renders calm student navigation for students,
 * and operational management navigation for staff areas.
 */
export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStaffArea = location.pathname.startsWith('/staff') || location.pathname === '/analytics';

  const isStudentActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isStaffActive = (path) => {
    if (path === '/staff' && (location.pathname === '/staff' || location.pathname.startsWith('/staff/cases'))) return true;
    if (path === '/analytics' && location.pathname === '/analytics') return true;
    return false;
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-smooth ${
      isStaffArea
        ? 'bg-slate-900/95 text-slate-100 border-slate-800 shadow-md'
        : 'bg-white/95 text-slate-800 border-slate-200/80 shadow-subtle'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to={isStaffArea ? '/staff' : '/'}
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
          >
            <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-sm transition-smooth ${
              isStaffArea
                ? 'bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-600'
                : 'bg-gradient-to-tr from-brand-600 to-brand-500 group-hover:scale-105'
            }`}>
              <Compass className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <span className={`text-lg font-bold tracking-tight transition-smooth ${
                isStaffArea ? 'text-white' : 'text-slate-900 group-hover:text-brand-600'
              }`}>
                Care<span className={isStaffArea ? 'text-brand-400' : 'text-brand-600'}>Route</span>
              </span>
              <span className={`block text-[10px] uppercase font-semibold tracking-wider -mt-1 ${
                isStaffArea ? 'text-brand-400' : 'text-slate-400'
              }`}>
                {isStaffArea ? 'Staff Operations' : 'Student Support'}
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          {isStaffArea ? (
            /* Staff Portal Navigation */
            <nav className="hidden md:flex items-center gap-1.5" aria-label="Staff Navigation">
              <Link
                to="/staff"
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-smooth ${
                  isStaffActive('/staff')
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Shield className="w-4 h-4 text-brand-400" />
                <span>Case Queue</span>
              </Link>

              <Link
                to="/analytics"
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-smooth ${
                  isStaffActive('/analytics')
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-brand-400" />
                <span>Analytics</span>
              </Link>
            </nav>
          ) : (
            /* Calm Student Navigation */
            <nav className="hidden md:flex items-center gap-2" aria-label="Student Navigation">
              <Link
                to="/triage"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                  isStudentActive('/triage')
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-brand-600" />
                <span>Get Support</span>
              </Link>

              <Link
                to="/status"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                  isStudentActive('/status')
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>My Request</span>
              </Link>
            </nav>
          )}

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            {isStaffArea ? (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-smooth"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Student View</span>
              </Link>
            ) : (
              <Link
                to="/staff"
                className="text-xs text-slate-400 hover:text-slate-600 transition-smooth font-medium px-2 py-1 rounded hover:bg-slate-100"
              >
                Staff Portal →
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-500 ${
              isStaffArea
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-2 pb-4 space-y-2 ${
          isStaffArea ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
        }`}>
          {isStaffArea ? (
            <>
              <Link
                to="/staff"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800"
              >
                Case Queue
              </Link>
              <Link
                to="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800"
              >
                Analytics
              </Link>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                ← Return to Student View
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/triage"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium rounded-lg hover:bg-slate-50"
              >
                Get Support
              </Link>
              <Link
                to="/status"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium rounded-lg hover:bg-slate-50"
              >
                My Request
              </Link>
              <Link
                to="/staff"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-400 hover:text-slate-600"
              >
                Staff Portal
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
