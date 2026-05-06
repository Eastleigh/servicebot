"use client";

import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  parseISO,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import type { Job, Technician } from "@/lib/types";
import { JOB_STATUS_COLORS, JOB_STATUS_LABELS } from "@/lib/types";

interface CalendarViewProps {
  jobs: Job[];
  technicians: Technician[];
  onJobClick?: (job: Job) => void;
}

const HOURS = Array.from({ length: 11 }, (_, i) => i + 7);

const BORDER_COLORS: Record<string, string> = {
  "bg-blue-500": "border-l-blue-500",
  "bg-green-500": "border-l-green-500",
  "bg-purple-500": "border-l-purple-500",
  "bg-red-500": "border-l-red-500",
  "bg-yellow-500": "border-l-yellow-500",
  "bg-indigo-500": "border-l-indigo-500",
  "bg-pink-500": "border-l-pink-500",
  "bg-orange-500": "border-l-orange-500",
};

export default function CalendarView({
  jobs,
  technicians,
  onJobClick,
}: CalendarViewProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const scheduledJobs = jobs.filter((j) => j.scheduled_date);

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-foreground">Dispatch Calendar</h3>
          <div className="flex items-center gap-1">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className={`w-6 h-6 rounded-full ${tech.avatar_color} flex items-center justify-center`}
                title={tech.name}
              >
                <span className="text-white text-[10px] font-bold">
                  {tech.name[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4 text-muted" />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[180px] text-center">
            {format(weekDays[0], "MMM d")} -{" "}
            {format(weekDays[6], "MMM d, yyyy")}
          </span>
          <button
            onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-4 w-4 text-muted" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-2 text-xs text-muted text-center">Time</div>
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={`p-2 text-center border-l border-border ${
                  isSameDay(day, new Date()) ? "bg-primary/5" : ""
                }`}
              >
                <p className="text-xs text-muted">{format(day, "EEE")}</p>
                <p
                  className={`text-sm font-medium ${
                    isSameDay(day, new Date())
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {format(day, "d")}
                </p>
              </div>
            ))}
          </div>

          {HOURS.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 border-b border-border last:border-b-0"
            >
              <div className="p-2 text-xs text-muted text-center border-r border-border">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
              </div>
              {weekDays.map((day) => {
                const dayJobs = scheduledJobs.filter((j) => {
                  if (!j.scheduled_date || !j.scheduled_time) return false;
                  const jobDate = parseISO(j.scheduled_date);
                  const jobHour = parseInt(j.scheduled_time.split(":")[0], 10);
                  return isSameDay(jobDate, day) && jobHour === hour;
                });

                return (
                  <div
                    key={day.toISOString()}
                    className={`p-1 border-l border-border min-h-[60px] ${
                      isSameDay(day, new Date()) ? "bg-primary/5" : ""
                    }`}
                  >
                    {dayJobs.map((job) => {
                      const tech = technicians.find(
                        (t) => t.id === job.technician_id
                      );
                      return (
                        <button
                          key={job.id}
                          onClick={() => onJobClick?.(job)}
                          className={`w-full text-left p-1.5 rounded text-xs mb-1 border-l-2 ${
                            tech
                              ? BORDER_COLORS[tech.avatar_color] || "border-l-gray-400"
                              : "border-l-gray-400"
                          } bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer`}
                        >
                          <p className="font-medium text-foreground truncate">
                            {job.title}
                          </p>
                          <div className="flex items-center gap-1 text-muted mt-0.5">
                            <User className="h-2.5 w-2.5" />
                            <span className="truncate">
                              {job.customer_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted">
                            <Clock className="h-2.5 w-2.5" />
                            {job.estimated_duration}h
                          </div>
                          <span
                            className={`inline-block mt-0.5 px-1 py-0.5 rounded text-[10px] font-medium ${JOB_STATUS_COLORS[job.status]}`}
                          >
                            {JOB_STATUS_LABELS[job.status]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
