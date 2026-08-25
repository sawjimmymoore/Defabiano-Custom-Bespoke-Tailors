import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Planning a custom suit during your visit to Bangkok? Book a consultation, ask about fabrics, or send your own measurements.",
};

export default function ContactPage() {
  return <ContactClient />;
}
