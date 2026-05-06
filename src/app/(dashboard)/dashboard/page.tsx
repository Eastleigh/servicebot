"use client";

import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { getStats, mockJobs, mockConversations } from "@/lib/mock-data";
import { JOB_STATUS_LABELS, JOB_STATUS_COLORS } from "@/lib/types";
import Link from "next/link";

export default function DashboardPage() {
  const stats = getStats();

  const recentJobs = [...mockJobs]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted text-sm mt-1">
          Welcome back. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          subtitle={`$${stats.pendingRevenue.toLocaleString()} pending`}
          icon={DollarSign}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers.toString()}
          icon={Users}
          trend={{ value: "3 new", positive: true }}
        />
        <StatsCard
          title="Active Jobs"
          value={(stats.totalJobs - stats.completedJobs).toString()}
          subtitle={`${stats.completedJobs} completed`}
          icon={Briefcase}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          subtitle="Leads to completed"
          icon={TrendingUp}
          trend={{ value: "5%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Jobs</h2>
            <Link
              href="/jobs"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {job.title}
                  </p>
                  <p className="text-xs text-muted">{job.customer_name}</p>
                </div>
                <div className="flex items-center gap-3">
                  {job.price !== null && job.price > 0 && (
                    <span className="text-sm font-medium text-foreground">
                      ${job.price.toLocaleString()}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${JOB_STATUS_COLORS[job.status]}`}
                  >
                    {JOB_STATUS_LABELS[job.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              Active Conversations
            </h2>
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded">
              {mockConversations.filter((c) => c.status === "active").length}{" "}
              active
            </span>
          </div>
          <div className="space-y-3">
            {mockConversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <div
                  key={conv.id}
                  className="flex items-start gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">
                      {conv.customer_name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm text-foreground">
                        {conv.customer_name}
                      </p>
                      <span className="text-xs text-muted capitalize flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {conv.channel}
                      </span>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 mt-0.5">
                      {lastMsg?.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">
          Pipeline Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {(
            ["new_lead", "booked", "in_progress", "completed", "paid"] as const
          ).map((status) => {
            const count = mockJobs.filter((j) => j.status === status).length;
            const revenue = mockJobs
              .filter((j) => j.status === status && j.price)
              .reduce((sum, j) => sum + (j.price || 0), 0);
            return (
              <div
                key={status}
                className="text-center p-4 rounded-lg bg-gray-50"
              >
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${JOB_STATUS_COLORS[status]}`}
                >
                  {JOB_STATUS_LABELS[status]}
                </span>
                <p className="text-2xl font-bold text-foreground">{count}</p>
                {revenue > 0 && (
                  <p className="text-xs text-muted mt-1">
                    ${revenue.toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
