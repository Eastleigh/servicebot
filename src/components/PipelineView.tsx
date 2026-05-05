"use client";

import type { Job, JobStatus } from "@/lib/types";
import { JOB_STATUS_LABELS, JOB_STATUS_COLORS } from "@/lib/types";
import { Clock, MapPin, User } from "lucide-react";

const PIPELINE_STAGES: JobStatus[] = [
  "new_lead",
  "booked",
  "in_progress",
  "completed",
  "paid",
];

interface PipelineViewProps {
  jobs: Job[];
  onJobClick?: (job: Job) => void;
}

export default function PipelineView({ jobs, onJobClick }: PipelineViewProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {PIPELINE_STAGES.map((stage) => {
        const stageJobs = jobs.filter((j) => j.status === stage);
        return (
          <div key={stage} className="flex-shrink-0 w-72">
            <div className="flex items-center gap-2 mb-3 px-1">
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${JOB_STATUS_COLORS[stage]}`}
              >
                {JOB_STATUS_LABELS[stage]}
              </span>
              <span className="text-xs text-muted">{stageJobs.length}</span>
            </div>
            <div className="space-y-2">
              {stageJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => onJobClick?.(job)}
                  className="w-full text-left bg-white border border-border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {job.title}
                  </h4>
                  <p className="text-xs text-muted mb-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <User className="h-3 w-3" />
                      {job.customer_name}
                    </div>
                    {job.technician_name && (
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Clock className="h-3 w-3" />
                        {job.technician_name}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{job.address}</span>
                    </div>
                  </div>
                  {job.price !== null && job.price > 0 && (
                    <p className="text-sm font-semibold text-foreground mt-2">
                      ${job.price.toLocaleString()}
                    </p>
                  )}
                </button>
              ))}
              {stageJobs.length === 0 && (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted">
                  No jobs
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
