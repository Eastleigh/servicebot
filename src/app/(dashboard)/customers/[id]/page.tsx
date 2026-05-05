import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { mockCustomers, mockJobs, mockConversations } from "@/lib/mock-data";
import { JOB_STATUS_LABELS, JOB_STATUS_COLORS } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = mockCustomers.find((c) => c.id === id);

  if (!customer) {
    notFound();
  }

  const customerJobs = mockJobs.filter((j) => j.customer_id === id);
  const customerConvos = mockConversations.filter(
    (c) => c.customer_id === id
  );
  const totalSpent = customerJobs
    .filter(
      (j) => (j.status === "completed" || j.status === "paid") && j.price
    )
    .reduce((sum, j) => sum + (j.price || 0), 0);

  return (
    <div className="space-y-6">
      <Link
        href="/customers"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {customer.name}
              </h1>
              <p className="text-sm text-muted">
                Customer since{" "}
                {new Date(customer.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted">
              <Mail className="h-4 w-4" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <Phone className="h-4 w-4" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <MapPin className="h-4 w-4" />
              <span>{customer.address}</span>
            </div>
          </div>

          {customer.notes && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted uppercase mb-1">
                Notes
              </p>
              <p className="text-sm text-foreground">{customer.notes}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">
                {customerJobs.length}
              </p>
              <p className="text-xs text-muted">Total Jobs</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">
                ${totalSpent.toLocaleString()}
              </p>
              <p className="text-xs text-muted">Total Spent</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Job History</h2>
            {customerJobs.length > 0 ? (
              <div className="space-y-3">
                {customerJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">
                        {job.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                        {job.scheduled_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(job.scheduled_date).toLocaleDateString()}
                          </span>
                        )}
                        {job.technician_name && (
                          <span>Tech: {job.technician_name}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {job.price !== null && job.price > 0 && (
                        <span className="text-sm font-medium">
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
            ) : (
              <p className="text-sm text-muted">No jobs yet.</p>
            )}
          </div>

          {customerConvos.length > 0 && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">
                Conversations
              </h2>
              {customerConvos.map((conv) => (
                <div key={conv.id} className="space-y-2">
                  <p className="text-xs text-muted uppercase font-medium">
                    {conv.channel} - {conv.status}
                  </p>
                  {conv.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-gray-50 ml-8"
                          : "bg-primary/5 mr-8"
                      }`}
                    >
                      <p className="text-xs font-medium text-muted mb-1">
                        {msg.role === "user" ? customer.name : "ServiceBot AI"}
                      </p>
                      <p className="text-foreground">{msg.content}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
