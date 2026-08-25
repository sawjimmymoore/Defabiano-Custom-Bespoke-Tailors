"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import siteContent from "@/content/site-content.json";

/**
 * Automated, button-driven chat. Deliberately not an AI chatbot: every
 * reply is a canned answer already published on the site's real FAQ, so
 * there is no hallucination risk and it needs no backend or model call.
 * A visitor can always escalate to a real human on WhatsApp from any point.
 */

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

const FAQ = siteContent.faq as { q: string; a: string }[];
const WHATSAPP_URL = `https://wa.me/${siteContent.contact.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
  siteContent.contact.whatsappMessage
)}`;

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: uid(), from: "bot", text: "Hi, I'm the De Fabiano front desk assistant. What can I help with?" },
  ]);
  const [askedIds, setAskedIds] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  function askQuestion(index: number) {
    const item = FAQ[index];
    setMessages((m) => [
      ...m,
      { id: uid(), from: "user", text: item.q },
      { id: uid(), from: "bot", text: item.a },
    ]);
    setAskedIds((a) => [...a, index]);
  }

  function resetToMenu() {
    setMessages((m) => [...m, { id: uid(), from: "bot", text: "Anything else?" }]);
  }

  const remaining = FAQ.map((_, i) => i).filter((i) => !askedIds.includes(i));

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-[80] grid h-14 w-14 place-items-center rounded-full bg-ink text-paper shadow-lg transition-transform hover:scale-105 hover:bg-brass"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[80] flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-2xl">
          <div className="flex items-center gap-3 border-b border-line bg-ink px-4 py-3 text-paper">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-brass text-xs font-semibold">DF</div>
            <div>
              <div className="font-display text-sm font-semibold">De Fabiano</div>
              <div className="text-[10px] uppercase tracking-widest text-paper/60">
                Automated replies. No AI, just answers.
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={[
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  m.from === "bot"
                    ? "mr-auto bg-paper-2 text-ink"
                    : "ml-auto bg-brass text-white",
                ].join(" ")}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="max-h-56 overflow-y-auto border-t border-line bg-paper-2 px-3 py-3">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gray">
              {remaining.length > 0 ? "Choose a question" : "More options"}
            </div>
            <div className="flex flex-wrap gap-2">
              {remaining.length > 0 ? (
                remaining.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => askQuestion(i)}
                    className="rounded-full border border-line bg-paper px-3 py-1.5 text-left text-xs text-ink transition-colors hover:border-brass hover:text-brass"
                  >
                    {FAQ[i].q}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onClick={() => setAskedIds([])}
                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink transition-colors hover:border-brass hover:text-brass"
                >
                  Show questions again
                </button>
              )}
              <Link
                href="/appointment"
                className="rounded-full bg-ink px-3 py-1.5 text-xs text-paper transition-colors hover:bg-brass"
                onClick={() => resetToMenu()}
              >
                Book a fitting
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brass px-3 py-1.5 text-xs text-brass transition-colors hover:bg-brass hover:text-white"
              >
                Talk to a person on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
