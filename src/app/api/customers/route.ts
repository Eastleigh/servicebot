import { NextResponse } from "next/server";
import { mockCustomers } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ customers: mockCustomers });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newCustomer = {
    id: `c${Date.now()}`,
    name: body.name || "",
    email: body.email || "",
    phone: body.phone || "",
    address: body.address || "",
    source: body.source || "other",
    notes: body.notes || "",
    created_at: new Date().toISOString(),
  };

  return NextResponse.json({ customer: newCustomer }, { status: 201 });
}
