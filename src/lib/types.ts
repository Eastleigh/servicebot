export type JobStatus = "new_lead" | "booked" | "in_progress" | "completed" | "paid" | "cancelled";

export type CustomerSource = "website" | "sms" | "facebook" | "referral" | "other";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  source: CustomerSource;
  notes: string;
  created_at: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  avatar_color: string;
}

export interface Job {
  id: string;
  customer_id: string;
  customer_name: string;
  technician_id: string | null;
  technician_name: string | null;
  title: string;
  description: string;
  status: JobStatus;
  scheduled_date: string | null;
  scheduled_time: string | null;
  estimated_duration: number;
  price: number | null;
  address: string;
  created_at: string;
  completed_at: string | null;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customer_id: string | null;
  customer_name: string;
  channel: "website" | "sms" | "facebook";
  messages: Message[];
  status: "active" | "resolved";
  created_at: string;
}

export interface Invoice {
  id: string;
  job_id: string;
  customer_id: string;
  customer_name: string;
  job_title: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  due_date: string;
  paid_at: string | null;
  created_at: string;
}

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  new_lead: "New Lead",
  booked: "Booked",
  in_progress: "In Progress",
  completed: "Completed",
  paid: "Paid",
  cancelled: "Cancelled",
};

export const JOB_STATUS_COLORS: Record<JobStatus, string> = {
  new_lead: "bg-blue-100 text-blue-800",
  booked: "bg-purple-100 text-purple-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  paid: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};
