"use client";

/**
 * MOCK ACCOUNT SYSTEM, DEMO ONLY, NOT REAL AUTH.
 * ------------------------------------------------
 * Stores accounts in localStorage on the visitor's own browser. There is no
 * server, no password hashing, no session security, this exists purely to
 * prove the sign-up -> log in -> order-history UX flow for the mockup.
 * Production needs real auth (e.g. via Medusa's customer module, or
 * NextAuth + Supabase) before this touches real customers or real orders.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Account {
  name: string;
  email: string;
  password: string; // plain text on purpose, mock only, never do this in production
}

interface AccountContextValue {
  currentUser: { name: string; email: string } | null;
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logIn: (email: string, password: string) => { ok: boolean; error?: string };
  logOut: () => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const ACCOUNTS_KEY = "defabiano-accounts-v1";
const SESSION_KEY = "defabiano-session-v1";

function readAccounts(): Account[] {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: Account[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session hydration on mount, intentional
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function signUp(name: string, email: string, password: string) {
    const accounts = readAccounts();
    if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const account: Account = { name, email, password };
    writeAccounts([...accounts, account]);
    const session = { name, email };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return { ok: true };
  }

  function logIn(email: string, password: string) {
    const accounts = readAccounts();
    const match = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!match) return { ok: false, error: "Incorrect email or password." };
    const session = { name: match.name, email: match.email };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return { ok: true };
  }

  function logOut() {
    window.localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }

  return (
    <AccountContext.Provider value={{ currentUser, signUp, logIn, logOut }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
