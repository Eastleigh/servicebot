"use client";

import { useState } from "react";
import CalendarView from "@/components/CalendarView";
import { mockJobs, mockTechnicians } from "@/lib/mock-data";
import type { Job } from "@/lib/types";
import { JOB_STATUS_LABELS, JOB_STATUS_COLORS } from "@/lib/types";

export default function DispatchPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const scheduledJobs = mockJobs.filter((j) => j.scheduled_date);
  const unassignedJobs = mockJobs.filter(
    (j) => !j.technician_id && j.status !== "cancelled"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dispatch</h1>
        <p className="text-muted text-sm mt-1">
          {scheduledJobs.length} scheduled jobs &middot;{" "}
          {unassignedJobs.length} unassigned
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CalendarView
            jobs={mockJobs}
            technicians={mockTechnicians}
            onJobClick={setSelectedJob}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">
              Technicians
            </h3>
            <div className="space-y-2">
              {mockTechnicians.map((tech) => {
                const techJobs = mockJobs.filter(
                  (j) =>
                    j.technician_id === tech.id &&
                    (j.status === "booked" || j.status === "in_progress")
                );
                return (
                  <div
                    key={tech.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${tech.avatar_color} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {tech.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {tech.name}
                      </p>
                      <p className="text-xs text-muted">{tech.specialty}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-muted px-2 py-0.5 rounded">
                      {techJobs.length} jobs
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">
              Unassigned Jobs
            </h3>
            {unassignedJobs.length > 0 ? (
              <div className="space-y-2">
                {unassignedJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="w-full text-left p-2 rounded-lg border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {job.title}
                    </p>
                    <p className="text-xs text-muted">{job.customer_name}</p>
                    <span
                      className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${JOB_STATUS_COLORS[job.status]}`}
                    >
                      {JOB_STATUS_LABELS[job.status]}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted text-center py-4">
                All jobs assigned
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {selectedJob.title}
            </h2>
            <span
              className={`text-xs px-2 py-0.5 rounded font-medium ${JOB_STATUS_COLORS[selectedJob.status]}`}
            >
              {JOB_STATUS_LABELS[selectedJob.status]}
            </span>
            <p className="text-sm text-muted mt-3">{selectedJob.description}</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Customer</span>
                <span className="font-medium">{selectedJob.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Technician</span>
                <span className="font-medium">
                  {selectedJob.technician_name || "Unassigned"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Scheduled</span>
                <span className="font-medium">
                  {selectedJob.scheduled_date
                    ? `${new Date(selectedJob.scheduled_date).toLocaleDateString()} ${selectedJob.scheduled_time}`
                    : "Not scheduled"}
                </span>
              </div>
            </div>

            {!selectedJob.technician_id && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">
                  Assign to:
                </p>
                <div className="space-y-2">
                  {mockTechnicians.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedJob(null)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-6 h-6 rounded-full ${tech.avatar_color} flex items-center justify-center`}
                      >
                        <span className="text-white text-[10px] font-bold">
                          {tech.name[0]}
                        </span>
                      </div>
                      <span className="text-sm">{tech.name}</span>
                      <span className="text-xs text-muted ml-auto">
                        {tech.specialty}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedJob(null)}
              className="mt-4 w-full px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
