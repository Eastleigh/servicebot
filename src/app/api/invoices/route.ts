import { NextResponse } from "next/server";
import { mockInvoices } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ invoices: mockInvoices });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newInvoice = {
    id: `inv${Date.now()}`,
    job_id: body.job_id || "",
    customer_id: body.customer_id || "",
    customer_name: body.customer_name || "",
    job_title: body.job_title || "",
    amount: body.amount || 0,
    status: "draft" as const,
    due_date: body.due_date || "",
    paid_at: null,
    created_at: new Date().toISOString(),
  };

  return NextResponse.json({ invoice: newInvoice }, { status: 201 });
}
