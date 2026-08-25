import { NextRequest, NextResponse } from "next/server";
import { saveAppointment, getAllAppointments } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.preferredDate) {
      return NextResponse.json({ error: "Missing required appointment fields" }, { status: 400 });
    }
    const appointment = saveAppointment(body);
    return NextResponse.json({ appointment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save appointment" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ appointments: getAllAppointments() });
}
