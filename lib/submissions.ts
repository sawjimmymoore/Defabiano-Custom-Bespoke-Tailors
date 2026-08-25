import fs from "fs";
import path from "path";
import type { CartLine } from "./types";

/**
 * SUBMISSIONS LAYER, DOCUMENTED PLACEHOLDER
 * ------------------------------------------
 * This writes to local JSON files in /data. It proves the order/appointment/
 * message capture flow works end-to-end for the demo.
 *
 * It is NOT durable in production: Vercel's serverless filesystem is
 * ephemeral, so writes here may not persist across deploys/cold starts.
 *
 * Real production use needs Medusa.js (or Supabase) swapped in here, * this file is the only place that needs to change. None of the pages or
 * components need to know the difference. Schema below is deliberately
 * close to what Medusa's order model expects, to make that swap mechanical.
 */

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filename: string): T[] {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeJson<T>(filename: string, data: T[]) {
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string; address?: string };
  lines: CartLine[];
  subtotal: number;
  status: "received";
  notes?: string;
}

export interface AppointmentRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  purpose: string;
  notes?: string;
}

export interface MessageRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  message: string;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function saveOrder(input: Omit<OrderRecord, "id" | "createdAt" | "status">): OrderRecord {
  const orders = readJson<OrderRecord>("orders.json");
  const record: OrderRecord = {
    ...input,
    id: makeId(),
    createdAt: new Date().toISOString(),
    status: "received",
  };
  orders.push(record);
  writeJson("orders.json", orders);
  return record;
}

export function saveAppointment(
  input: Omit<AppointmentRecord, "id" | "createdAt">
): AppointmentRecord {
  const appointments = readJson<AppointmentRecord>("appointments.json");
  const record: AppointmentRecord = {
    ...input,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
  appointments.push(record);
  writeJson("appointments.json", appointments);
  return record;
}

export function saveMessage(input: Omit<MessageRecord, "id" | "createdAt">): MessageRecord {
  const messages = readJson<MessageRecord>("messages.json");
  const record: MessageRecord = {
    ...input,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
  messages.push(record);
  writeJson("messages.json", messages);
  return record;
}

export function getAllOrders(): OrderRecord[] {
  return readJson<OrderRecord>("orders.json");
}

export function getAllAppointments(): AppointmentRecord[] {
  return readJson<AppointmentRecord>("appointments.json");
}

export function getAllMessages(): MessageRecord[] {
  return readJson<MessageRecord>("messages.json");
}
