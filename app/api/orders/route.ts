import { NextRequest, NextResponse } from "next/server";
import { saveOrder, getAllOrders } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.customer?.name || !body.customer?.email || !body.lines?.length) {
      return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
    }
    const order = saveOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ orders: getAllOrders() });
}
