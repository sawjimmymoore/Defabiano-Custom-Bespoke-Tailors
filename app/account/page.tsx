import type { Metadata } from "next";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "My Account",
  description: "Log in or create an account to track your De Fabiano commissions.",
};

export default function AccountPage() {
  return <AccountClient />;
}
