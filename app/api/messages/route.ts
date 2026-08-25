import { NextRequest, NextResponse } from "next/server";
import { saveMessage, getAllMessages } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required message fields" }, { status: 400 });
    }
    const message = saveMessage(body);
    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ messages: getAllMessages() });
}
