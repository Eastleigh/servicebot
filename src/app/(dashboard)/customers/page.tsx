"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Filter,
  ArrowUpRight,
} from "lucide-react";
import { mockCustomers, mockJobs } from "@/lib/mock-data";
import type { Customer, CustomerSource } from "@/lib/types";

const SOURCE_LABELS: Record<CustomerSource, string> = {
  website: "Website",
  sms: "SMS",
  facebook: "Facebook",
  referral: "Referral",
  other: "Other",
};

const SOURCE_COLORS: Record<CustomerSource, string> = {
  website: "bg-blue-100 text-blue-800",
  sms: "bg-green-100 text-green-800",
  facebook: "bg-indigo-100 text-indigo-800",
  referral: "bg-amber-100 text-amber-800",
  other: "bg-gray-100 text-gray-800",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<CustomerSource | "all">(
    "all"
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockCustomers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesSource =
      sourceFilter === "all" || c.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted text-sm mt-1">
            {mockCustomers.length} total customers
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <select
            value={sourceFilter}
            onChange={(e) =>
              setSourceFilter(e.target.value as CustomerSource | "all")
            }
            className="pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
          >
            <option value="all">All Sources</option>
            {Object.entries(SOURCE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted">
            No customers found matching your search.
          </div>
        )}
      </div>

      {showAddModal && (
        <AddCustomerModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

function CustomerCard({ customer }: { customer: Customer }) {
  const jobCount = mockJobs.filter(
    (j) => j.customer_id === customer.id
  ).length;
  const totalSpent = mockJobs
    .filter(
      (j) =>
        j.customer_id === customer.id &&
        (j.status === "completed" || j.status === "paid") &&
        j.price
    )
    .reduce((sum, j) => sum + (j.price || 0), 0);

  return (
    <Link
      href={`/customers/${customer.id}`}
      className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{customer.name}</h3>
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-medium ${SOURCE_COLORS[customer.source]}`}
            >
              {SOURCE_LABELS[customer.source]}
            </span>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted" />
      </div>

      <div className="space-y-1.5 text-sm text-muted">
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          {customer.phone}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{customer.address}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-xs text-muted">{jobCount} jobs</span>
        {totalSpent > 0 && (
          <span className="text-sm font-medium text-foreground">
            ${totalSpent.toLocaleString()} total
          </span>
        )}
      </div>
    </Link>
  );
}

function AddCustomerModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Add New Customer
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="tel"
                placeholder="(555) 000-0000"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Street address"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Source
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {Object.entries(SOURCE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Notes
            </label>
            <textarea
              placeholder="Additional notes..."
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
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
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
