import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';
import Select from '../components/Select.jsx';
import TextArea from '../components/TextArea.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import Badge from '../components/Badge.jsx';
import Alert from '../components/Alert.jsx';
import LoadingState from '../components/LoadingState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { getCaseByIdApi, updateCaseStatusApi } from '../services/api.js';
import { getCategoryById, EMERGENCY_PLACEHOLDERS } from '../data/supportCategories.js';
import {
  ArrowLeft,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Calendar,
  UserCheck,
  Send,
  FileEdit,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const ALLOWED_STATUS_UPDATES = [
  { value: 'Acknowledged', label: 'Acknowledged — Staff assigned to file' },
  { value: 'In Progress', label: 'In Progress — Active review under way' },
  { value: 'Appointment Scheduled', label: 'Appointment Scheduled — Student invited' },
  { value: 'Resolved', label: 'Resolved — Support provided and closed' }
];

/**
 * CareRoute Staff Case Details View
 */
export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseItem, setCaseItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status update modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('In Progress');
  const [staffNote, setStaffNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchCase = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCaseByIdApi(id);
      setCaseItem(data);
    } catch (err) {
      console.error('Error fetching case:', err);
      setError(`Case ${id} not found.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updated = await updateCaseStatusApi(id, newStatus, staffNote);
      setCaseItem(updated);
      setIsModalOpen(false);
      setStaffNote('');
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card padding="spacious">
          <LoadingState message="Loading case details..." />
        </Card>
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <EmptyState
          title="Case Not Found"
          description={error || "The requested case could not be located."}
          action={
            <Link to="/staff">
              <Button variant="primary">Return to Staff Dashboard</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const primaryCategory = getCategoryById(caseItem.category);
  const secondaryCategory = caseItem.secondaryCategory ? getCategoryById(caseItem.secondaryCategory) : null;
  const isHighRisk = caseItem.escalationRequired || caseItem.priority === 'critical';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title={`Case File ${caseItem.id}`}
        subtitle={`Confidential student triage dossier assigned to ${caseItem.assignedService}`}
        badge={
          <div className="flex items-center gap-2">
            <PriorityBadge priority={caseItem.priority} size="md" />
            <StatusBadge status={caseItem.status} size="md" />
          </div>
        }
        breadcrumbs={
          <Link to="/staff" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Staff Dashboard
          </Link>
        }
        action={
          <Button
            variant="primary"
            size="md"
            leftIcon={<FileEdit className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Update Case Status
          </Button>
        }
      />

      {updateSuccess && (
        <Alert variant="success" title="Status Updated Successfully">
          Case status has been updated to <strong>{caseItem.status}</strong> and logged to the timeline.
        </Alert>
      )}

      {/* High-Risk Escalation Banner */}
      {isHighRisk && (
        <div className="rounded-xl border-2 border-rose-500 bg-rose-50 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-600 text-white shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-950">
                Escalated Safeguarding / Safety File
              </h3>
              <p className="text-xs text-rose-900 mt-0.5 leading-relaxed">
                This case has triggered high-risk signals during triage. Standard SLA waived. Rapid human verification protocol active. If immediate physical jeopardy is identified, escalate to campus security ({EMERGENCY_PLACEHOLDERS.CAMPUS_SECURITY_CONTACT}).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Case Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Triage & Routing Information */}
        <div className="md:col-span-2 space-y-6">
          <Card padding="normal">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
              Triage & Classification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Primary Concern
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {primaryCategory.name}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Secondary Concern
                </span>
                <span className="font-medium text-slate-700 text-sm">
                  {secondaryCategory ? secondaryCategory.name : 'None detected'}
                </span>
              </div>
            </div>

            {/* AI / Triage Summary */}
            <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-100 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">
                Automated Triage Summary
              </span>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                "{caseItem.summary}"
              </p>
            </div>

            {/* Routing Decision & Assigned Service */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Routing Destination
                </span>
                <Badge variant="brand" size="sm">Active Assignment</Badge>
              </div>
              <div className="text-base font-bold text-slate-900">
                {caseItem.assignedService}
              </div>
              <p className="text-xs text-slate-500">
                Routing decision generated based on urgency: <strong>{caseItem.priority}</strong> and category: <strong>{primaryCategory.name}</strong>.
              </p>
            </div>

            {/* Confidential Student Description */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student Natural Language Input
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Confidential Record</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200">
                "{caseItem.studentMessage}"
              </p>
              <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-500">
                <span>Duration: <strong>{caseItem.duration || '1-2 weeks'}</strong></span>
                <span>•</span>
                <span>Self-reported Impact: <strong>{caseItem.impact || 'moderate'}</strong></span>
              </div>
            </div>
          </Card>

          {/* Activity / Timeline */}
          <Card padding="normal">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
              Case Event Timeline
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {caseItem.timeline && caseItem.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-white"></div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      {event.status}
                    </span>
                    <span className="text-slate-400">
                      {new Date(event.timestamp).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {event.note}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Case Meta & Quick Status Actions */}
        <div className="space-y-6">
          <Card padding="normal">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
              Student Information
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Anonymized Identifier</span>
                <span className="font-semibold text-slate-900 text-sm">{caseItem.studentIdentifier}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Data Privacy Guard</span>
                <span className="text-slate-600">
                  CareRoute restricts raw student PII during initial routing triage to avoid departmental bias.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400 block font-medium">First Logged</span>
                <span className="text-slate-700">
                  {new Date(caseItem.createdAt).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Last Modified</span>
                <span className="text-slate-700">
                  {new Date(caseItem.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card padding="normal" className="bg-slate-50/60">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Staff Actions
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Advance the case along the standard university resolution pipeline.
            </p>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Update Status / Add Note
            </Button>
          </Card>
        </div>
      </div>

      {/* Status Update Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Update Status: ${caseItem.id}`}
        subtitle={`Assigned to ${caseItem.assignedService}`}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={updating}
              onClick={handleUpdateStatus}
            >
              Confirm Update
            </Button>
          </>
        }
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <Select
            label="Select New Status"
            id="status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={ALLOWED_STATUS_UPDATES}
          />

          <TextArea
            label="Staff Internal Note (Appears on Case Timeline)"
            id="staff-note-input"
            rows={3}
            placeholder="Add relevant notes (e.g. 'Contacted student via university email to schedule initial consultation')."
            value={staffNote}
            onChange={(e) => setStaffNote(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
}
