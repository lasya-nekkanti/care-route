import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Select from '../components/Select.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { getCasesApi } from '../services/api.js';
import { SUPPORT_CATEGORIES, getCategoryById } from '../data/supportCategories.js';
import {
  ShieldAlert,
  Inbox,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

/**
 * CareRoute Staff Dashboard
 */
export default function StaffDashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchCases = async () => {
    setLoading(true);
    try {
      const data = await getCasesApi();
      setCases(data.cases || []);
    } catch (err) {
      console.error('Failed to load cases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  // Compute Metrics KPI values
  const openCasesCount = cases.filter((c) => c.status !== 'Resolved').length;
  const highPriorityCount = cases.filter((c) => c.priority === 'high' || c.priority === 'critical').length;
  const pendingCasesCount = cases.filter((c) => c.status === 'Submitted' || c.status === 'Triaged' || c.status === 'Routed').length;
  const escalatedCasesCount = cases.filter((c) => c.escalationRequired || c.priority === 'critical').length;

  // Filter cases based on search and filters
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      !search ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.studentIdentifier.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase()) ||
      c.assignedService.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      selectedPriority === 'all' || c.priority.toLowerCase() === selectedPriority.toLowerCase();

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'open' && c.status !== 'Resolved') ||
      c.status.toLowerCase().includes(selectedStatus.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || c.category === selectedCategory;

    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PageHeader
        title="Support Staff Dashboard"
        subtitle="Manage incoming student cases, review automated triage classifications, and assign department response workflows."
        badge={<Badge variant="brand" size="md">Staff Portal</Badge>}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCases}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh Queues
            </Button>
            <Link to="/analytics">
              <Button variant="primary" size="sm">
                View Analytics
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Cases */}
        <Card padding="normal" className="border-l-4 border-l-brand-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Open Cases
            </span>
            <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {openCasesCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Active cases in pipeline</p>
        </Card>

        {/* High Priority Cases */}
        <Card padding="normal" className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              High Priority
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {highPriorityCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Requiring same-day attention</p>
        </Card>

        {/* Pending Cases */}
        <Card padding="normal" className="border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pending Routing
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            {pendingCasesCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Awaiting service acknowledgement</p>
        </Card>

        {/* Escalated Cases */}
        <Card padding="normal" className="border-l-4 border-l-rose-600 bg-rose-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Escalated Cases
            </span>
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-rose-950">
            {escalatedCasesCount}
          </div>
          <p className="text-xs text-rose-700 mt-1">Flagged for safety priority</p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="tight" className="bg-slate-50/70 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            id="staff-search"
            placeholder="Search cases, students, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />

          <Select
            id="filter-priority"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            options={[
              { value: 'all', label: 'All Priorities' },
              { value: 'critical', label: 'Critical Only' },
              { value: 'high', label: 'High Priority' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'low', label: 'Low Priority' }
            ]}
          />

          <Select
            id="filter-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'open', label: 'Open (Unresolved)' },
              { value: 'routed', label: 'Routed' },
              { value: 'reviewing', label: 'Support Team Reviewing' },
              { value: 'appointment', label: 'Appointment / Response' },
              { value: 'resolved', label: 'Resolved' }
            ]}
          />

          <Select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...SUPPORT_CATEGORIES.map((c) => ({ value: c.id, label: c.name }))
            ]}
          />
        </div>
      </Card>

      {/* Incoming Cases Table / List */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Incoming Student Case Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredCases.length} of {cases.length} total cases
            </p>
          </div>
          {(selectedPriority !== 'all' || selectedStatus !== 'all' || selectedCategory !== 'all' || search) && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedPriority('all');
                setSelectedStatus('all');
                setSelectedCategory('all');
              }}
              className="text-xs text-brand-600 hover:text-brand-800 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-12">
            <LoadingState message="Loading case queues..." />
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No cases match your filters"
              description="Try adjusting your filter criteria or clearing the search query."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setSelectedPriority('all');
                    setSelectedStatus('all');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-3.5 px-4 sm:px-6">Case ID</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Assigned Service</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCases.map((c) => {
                  const categoryInfo = getCategoryById(c.category);
                  const isEscalated = c.escalationRequired || c.priority === 'critical';
                  const formattedDate = new Date(c.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-slate-50/70 transition-smooth ${
                        isEscalated ? 'bg-rose-50/30' : ''
                      }`}
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">
                            {c.id}
                          </span>
                          {isEscalated && (
                            <span className="p-1 rounded bg-rose-100 text-rose-700" title="Safety Escalation Active">
                              <ShieldAlert className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {c.studentIdentifier}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800 text-xs">
                          {categoryInfo.name}
                        </div>
                        {c.secondaryCategory && (
                          <div className="text-[10px] text-slate-400">
                            + {c.secondaryCategory}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <PriorityBadge priority={c.priority} size="sm" />
                      </td>

                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-slate-700 max-w-[200px] truncate" title={c.assignedService}>
                          {c.assignedService}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <StatusBadge status={c.status} size="sm" />
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {formattedDate}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <Link to={`/staff/cases/${c.id}`}>
                          <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                            View Case
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
