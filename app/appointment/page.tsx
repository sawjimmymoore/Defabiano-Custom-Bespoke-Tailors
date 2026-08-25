import type { Metadata } from "next";
import AppointmentClient from "./AppointmentClient";

export const metadata: Metadata = {
  title: "Book a Fitting",
  description: "Book a bespoke fitting appointment at De Fabiano, Sukhumvit Road, Bangkok.",
};

export default function AppointmentPage() {
  return <AppointmentClient />;
}
