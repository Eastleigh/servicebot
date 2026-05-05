"use client";

import { useState } from "react";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import PipelineView from "@/components/PipelineView";
import { mockJobs, mockCustomers, mockTechnicians } from "@/lib/mock-data";
import type { Job, JobStatus } from "@/lib/types";
import { JOB_STATUS_LABELS, JOB_STATUS_COLORS } from "@/lib/types";

export default function JobsPage() {
  const [view, setView] = useState<"pipeline" | "list">("pipeline");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered = mockJobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.customer_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
          <p className="text-muted text-sm mt-1">
            {mockJobs.length} total jobs across all stages
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Job
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as JobStatus | "all")
            }
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            <option value="all">All Statuses</option>
            {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setView("pipeline")}
            className={`p-1.5 rounded ${view === "pipeline" ? "bg-white shadow-sm" : ""}`}
          >
            <LayoutGrid className="h-4 w-4 text-foreground" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded ${view === "list" ? "bg-white shadow-sm" : ""}`}
          >
            <List className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      {view === "pipeline" ? (
        <PipelineView jobs={filtered} onJobClick={setSelectedJob} />
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                  Job
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                  Customer
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                  Technician
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="border-b border-border last:border-0 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm text-foreground">
                      {job.title}
                    </p>
                    <p className="text-xs text-muted line-clamp-1">
                      {job.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {job.customer_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {job.technician_name || "Unassigned"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {job.scheduled_date
                      ? new Date(job.scheduled_date).toLocaleDateString()
                      : "Not scheduled"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${JOB_STATUS_COLORS[job.status]}`}
                    >
                      {JOB_STATUS_LABELS[job.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-foreground">
                    {job.price !== null && job.price > 0
                      ? `$${job.price.toLocaleString()}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {showAddModal && (
        <AddJobModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

function JobDetailModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {job.title}
            </h2>
            <span
              className={`text-xs px-2 py-0.5 rounded font-medium ${JOB_STATUS_COLORS[job.status]}`}
            >
              {JOB_STATUS_LABELS[job.status]}
            </span>
          </div>
          {job.price !== null && job.price > 0 && (
            <span className="text-xl font-bold text-foreground">
              ${job.price.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-sm text-muted mb-4">{job.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted">Customer</span>
            <span className="font-medium text-foreground">
              {job.customer_name}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted">Technician</span>
            <span className="font-medium text-foreground">
              {job.technician_name || "Unassigned"}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted">Address</span>
            <span className="font-medium text-foreground text-right max-w-[60%]">
              {job.address}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted">Scheduled</span>
            <span className="font-medium text-foreground">
              {job.scheduled_date
                ? `${new Date(job.scheduled_date).toLocaleDateString()} at ${job.scheduled_time}`
                : "Not scheduled"}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">Duration</span>
            <span className="font-medium text-foreground">
              {job.estimated_duration} hours
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            Edit Job
          </button>
        </div>
      </div>
    </div>
  );
}

function AddJobModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Create New Job
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. AC Repair"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Customer
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">Select customer</option>
              {mockCustomers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Assign Technician
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">Unassigned</option>
              {mockTechnicians.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} - {t.specialty}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description
            </label>
            <textarea
              placeholder="Job details..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Price
              </label>
              <input
                type="number"
                placeholder="$0.00"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
