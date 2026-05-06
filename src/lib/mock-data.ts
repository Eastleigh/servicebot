import type { Customer, Technician, Job, Conversation, Invoice } from "./types";

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street, Austin, TX 78701",
    source: "website",
    notes: "Prefers morning appointments",
    created_at: "2025-04-15T10:00:00Z",
  },
  {
    id: "c2",
    name: "Mike Rodriguez",
    email: "mike.r@example.com",
    phone: "(555) 234-5678",
    address: "456 Elm Ave, Austin, TX 78702",
    source: "sms",
    notes: "Commercial property manager",
    created_at: "2025-04-18T14:30:00Z",
  },
  {
    id: "c3",
    name: "Jennifer Lee",
    email: "jlee@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine Rd, Austin, TX 78703",
    source: "referral",
    notes: "Referred by Mike Rodriguez",
    created_at: "2025-04-20T09:15:00Z",
  },
  {
    id: "c4",
    name: "David Chen",
    email: "dchen@example.com",
    phone: "(555) 456-7890",
    address: "321 Maple Dr, Austin, TX 78704",
    source: "facebook",
    notes: "",
    created_at: "2025-04-22T16:45:00Z",
  },
  {
    id: "c5",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    phone: "(555) 567-8901",
    address: "654 Cedar Ln, Austin, TX 78705",
    source: "website",
    notes: "Has two HVAC units",
    created_at: "2025-04-25T11:00:00Z",
  },
  {
    id: "c6",
    name: "Robert Kim",
    email: "rkim@example.com",
    phone: "(555) 678-9012",
    address: "987 Birch Ct, Austin, TX 78706",
    source: "sms",
    notes: "Needs annual maintenance plan",
    created_at: "2025-04-28T08:30:00Z",
  },
];

export const mockTechnicians: Technician[] = [
  {
    id: "t1",
    name: "Carlos Martinez",
    email: "carlos@servicepro.com",
    phone: "(555) 111-2222",
    specialty: "HVAC Installation",
    avatar_color: "bg-blue-500",
  },
  {
    id: "t2",
    name: "James Wilson",
    email: "james@servicepro.com",
    phone: "(555) 222-3333",
    specialty: "HVAC Repair",
    avatar_color: "bg-green-500",
  },
  {
    id: "t3",
    name: "Maria Garcia",
    email: "maria@servicepro.com",
    phone: "(555) 333-4444",
    specialty: "Maintenance",
    avatar_color: "bg-purple-500",
  },
];

export const mockJobs: Job[] = [
  {
    id: "j1",
    customer_id: "c1",
    customer_name: "Sarah Johnson",
    technician_id: "t1",
    technician_name: "Carlos Martinez",
    title: "AC Unit Installation",
    description: "Install new central AC unit, remove old window units",
    status: "completed",
    scheduled_date: "2025-05-01",
    scheduled_time: "09:00",
    estimated_duration: 4,
    price: 3500,
    address: "123 Oak Street, Austin, TX 78701",
    created_at: "2025-04-15T10:00:00Z",
    completed_at: "2025-05-01T13:00:00Z",
  },
  {
    id: "j2",
    customer_id: "c2",
    customer_name: "Mike Rodriguez",
    technician_id: "t2",
    technician_name: "James Wilson",
    title: "Furnace Repair",
    description: "Furnace making loud noise, not heating properly",
    status: "paid",
    scheduled_date: "2025-04-28",
    scheduled_time: "14:00",
    estimated_duration: 2,
    price: 450,
    address: "456 Elm Ave, Austin, TX 78702",
    created_at: "2025-04-18T14:30:00Z",
    completed_at: "2025-04-28T16:30:00Z",
  },
  {
    id: "j3",
    customer_id: "c3",
    customer_name: "Jennifer Lee",
    technician_id: "t1",
    technician_name: "Carlos Martinez",
    title: "Duct Cleaning",
    description: "Full house duct cleaning and inspection",
    status: "booked",
    scheduled_date: "2025-05-10",
    scheduled_time: "10:00",
    estimated_duration: 3,
    price: 800,
    address: "789 Pine Rd, Austin, TX 78703",
    created_at: "2025-04-20T09:15:00Z",
    completed_at: null,
  },
  {
    id: "j4",
    customer_id: "c4",
    customer_name: "David Chen",
    technician_id: null,
    technician_name: null,
    title: "AC Not Cooling",
    description: "Central AC running but not cooling. Thermostat set to 72 but house stays at 80+",
    status: "new_lead",
    scheduled_date: null,
    scheduled_time: null,
    estimated_duration: 2,
    price: null,
    address: "321 Maple Dr, Austin, TX 78704",
    created_at: "2025-04-22T16:45:00Z",
    completed_at: null,
  },
  {
    id: "j5",
    customer_id: "c5",
    customer_name: "Lisa Thompson",
    technician_id: "t3",
    technician_name: "Maria Garcia",
    title: "Annual Maintenance",
    description: "Annual HVAC maintenance check for two units",
    status: "in_progress",
    scheduled_date: "2025-05-05",
    scheduled_time: "08:00",
    estimated_duration: 2,
    price: 250,
    address: "654 Cedar Ln, Austin, TX 78705",
    created_at: "2025-04-25T11:00:00Z",
    completed_at: null,
  },
  {
    id: "j6",
    customer_id: "c6",
    customer_name: "Robert Kim",
    technician_id: null,
    technician_name: null,
    title: "Thermostat Installation",
    description: "Install smart thermostat, Nest or Ecobee",
    status: "new_lead",
    scheduled_date: null,
    scheduled_time: null,
    estimated_duration: 1,
    price: null,
    address: "987 Birch Ct, Austin, TX 78706",
    created_at: "2025-04-28T08:30:00Z",
    completed_at: null,
  },
  {
    id: "j7",
    customer_id: "c1",
    customer_name: "Sarah Johnson",
    technician_id: "t2",
    technician_name: "James Wilson",
    title: "Follow-up Inspection",
    description: "Post-installation inspection of new AC unit",
    status: "booked",
    scheduled_date: "2025-05-12",
    scheduled_time: "11:00",
    estimated_duration: 1,
    price: 0,
    address: "123 Oak Street, Austin, TX 78701",
    created_at: "2025-05-01T13:00:00Z",
    completed_at: null,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    customer_id: "c4",
    customer_name: "David Chen",
    channel: "website",
    status: "active",
    created_at: "2025-04-22T16:45:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Hi, my AC is not cooling properly. Can someone come take a look?",
        timestamp: "2025-04-22T16:45:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Hi David! I'm sorry to hear about your AC issues. I'd be happy to help get that resolved. Can you tell me what type of AC system you have (central, window unit, or mini-split)?",
        timestamp: "2025-04-22T16:45:30Z",
      },
      {
        id: "m3",
        role: "user",
        content: "It's a central AC. The thermostat is set to 72 but the house stays at 80+",
        timestamp: "2025-04-22T16:46:00Z",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "That sounds like it could be a refrigerant issue or a compressor problem. We can send a technician out to diagnose and fix the issue. Our diagnostic fee is $89, which gets applied to the repair if you proceed. Would you like to schedule a visit? We have availability this week.",
        timestamp: "2025-04-22T16:46:30Z",
      },
    ],
  },
  {
    id: "conv2",
    customer_id: "c6",
    customer_name: "Robert Kim",
    channel: "sms",
    status: "active",
    created_at: "2025-04-28T08:30:00Z",
    messages: [
      {
        id: "m5",
        role: "user",
        content: "Hey, I want to get a smart thermostat installed. How much does that cost?",
        timestamp: "2025-04-28T08:30:00Z",
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "Hi Robert! Great choice — smart thermostats can save 10-15% on energy bills. We offer installation for Nest and Ecobee thermostats. Installation is $150 (thermostat not included) or $350-$450 with the thermostat. Would you like to book an installation?",
        timestamp: "2025-04-28T08:30:30Z",
      },
    ],
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    job_id: "j1",
    customer_id: "c1",
    customer_name: "Sarah Johnson",
    job_title: "AC Unit Installation",
    amount: 3500,
    status: "sent",
    due_date: "2025-05-15",
    paid_at: null,
    created_at: "2025-05-01T13:30:00Z",
  },
  {
    id: "inv2",
    job_id: "j2",
    customer_id: "c2",
    customer_name: "Mike Rodriguez",
    job_title: "Furnace Repair",
    amount: 450,
    status: "paid",
    due_date: "2025-05-12",
    paid_at: "2025-05-05T10:00:00Z",
    created_at: "2025-04-28T17:00:00Z",
  },
];

export function getStats() {
  const totalRevenue = mockInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = mockInvoices
    .filter((inv) => inv.status === "sent" || inv.status === "draft")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalJobs = mockJobs.length;
  const completedJobs = mockJobs.filter(
    (j) => j.status === "completed" || j.status === "paid"
  ).length;
  const newLeads = mockJobs.filter((j) => j.status === "new_lead").length;
  const bookedJobs = mockJobs.filter((j) => j.status === "booked").length;
  const conversionRate =
    totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  return {
    totalRevenue,
    pendingRevenue,
    totalJobs,
    completedJobs,
    newLeads,
    bookedJobs,
    conversionRate,
    totalCustomers: mockCustomers.length,
  };
}
