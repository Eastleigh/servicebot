import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let jobs = mockJobs;
  if (status) {
    jobs = mockJobs.filter((j) => j.status === status);
  }

  return NextResponse.json({ jobs });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newJob = {
    id: `j${Date.now()}`,
    customer_id: body.customer_id || "",
    customer_name: body.customer_name || "",
    technician_id: body.technician_id || null,
    technician_name: body.technician_name || null,
    title: body.title || "",
    description: body.description || "",
    status: "new_lead" as const,
    scheduled_date: body.scheduled_date || null,
    scheduled_time: body.scheduled_time || null,
    estimated_duration: body.estimated_duration || 1,
    price: body.price ?? null,
    address: body.address || "",
    created_at: new Date().toISOString(),
    completed_at: null,
  };

  return NextResponse.json({ job: newJob }, { status: 201 });
}
