"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  ExternalLink,
} from "lucide-react";
import { mockInvoices, mockJobs, mockCustomers } from "@/lib/mock-data";
import type { Invoice } from "@/lib/types";

const STATUS_CONFIG = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800",
    icon: Clock,
  },
  sent: {
    label: "Sent",
    color: "bg-blue-100 text-blue-800",
    icon: Send,
  },
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  overdue: {
    label: "Overdue",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    Invoice["status"] | "all"
  >("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = mockInvoices.filter((inv) => {
    const matchesSearch =
      inv.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      inv.job_title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = mockInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPending = mockInvoices
    .filter((i) => i.status === "sent" || i.status === "draft")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = mockInvoices
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted text-sm mt-1">
            Manage billing and payments
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Collected</p>
              <p className="text-xl font-bold text-foreground">
                ${totalPaid.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Pending</p>
              <p className="text-xl font-bold text-foreground">
                ${totalPending.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Overdue</p>
              <p className="text-xl font-bold text-foreground">
                ${totalOverdue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoices..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as Invoice["status"] | "all")
          }
          className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                Invoice
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                Job
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                Due Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase">
                Amount
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((invoice) => {
              const config = STATUS_CONFIG[invoice.status];
              return (
                <tr
                  key={invoice.id}
                  className="border-b border-border last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">
                      #{invoice.id.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {invoice.customer_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {invoice.job_title}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {new Date(invoice.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.color}`}
                    >
                      <config.icon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {invoice.status !== "paid" && (
                      <button className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Send Link
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-muted"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Create Invoice
            </h2>
            <form className="space-y-4">
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
                  Job
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Select job</option>
                  {mockJobs
                    .filter((j) => j.status === "completed")
                    .map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} - {j.customer_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="$0.00"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
