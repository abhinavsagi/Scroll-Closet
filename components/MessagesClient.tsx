"use client";

import { useRef, useState, useEffect } from "react";
import { Send, ArrowLeft, Phone, Info } from "lucide-react";
import type { Thread, Message } from "@/lib/types";
import { threads as seedThreads } from "@/lib/data";

export default function MessagesClient() {
  const [threads, setThreads] = useState<Thread[]>(seedThreads);
  const [activeId, setActiveId] = useState<string>(seedThreads[0].id);
  const [text, setText] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const active = threads.find((t) => t.id === activeId)!;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.messages.length, activeId]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg: Message = {
      id: "m-" + Date.now(),
      from: "me",
      text: text.trim(),
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, messages: [...t.messages, msg], lastTime: "now" }
          : t
      )
    );
    setText("");
  };

  const openThread = (id: string) => {
    setActiveId(id);
    setMobileOpen(true);
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: 0 } : t))
    );
  };

  return (
    <div className="card grid h-[calc(100vh-240px)] min-h-[520px] grid-cols-1 overflow-hidden md:grid-cols-[320px_1fr]">
      {/* Thread list */}
      <aside
        className={`flex-col border-r border-ink/[0.06] bg-cream-50 ${
          mobileOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="border-b border-ink/[0.06] px-5 py-4">
          <h2 className="font-display text-xl text-ink">Messages</h2>
          <p className="text-xs text-ink-muted">
            Chat with renters and outfit owners
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => openThread(t.id)}
              className={`flex w-full items-center gap-3 border-b border-ink/[0.04] px-5 py-4 text-left transition ${
                activeId === t.id ? "bg-white" : "hover:bg-white/60"
              }`}
            >
              <div className="relative">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                {t.unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-white ring-2 ring-cream-50">
                    {t.unread}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-semibold text-ink">
                    {t.name}
                  </p>
                  <span className="shrink-0 text-xs text-ink-muted">
                    {t.lastTime}
                  </span>
                </div>
                <p className="truncate text-xs text-ink-muted">
                  {t.messages[t.messages.length - 1].text}
                </p>
                <span className="mt-1 inline-block rounded-full bg-cobalt-soft px-2 py-0.5 text-[10px] font-medium text-cobalt">
                  {t.outfit}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Conversation */}
      <section
        className={`flex-col ${mobileOpen ? "flex" : "hidden md:flex"}`}
      >
        <header className="flex items-center justify-between border-b border-ink/[0.06] bg-cream-50 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-ink/5 md:hidden"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img
              src={active.avatar}
              alt={active.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-ink">{active.name}</p>
              <p className="text-xs text-ink-muted">
                Renting · {active.outfit}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-ink-muted">
            <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink">
              <Phone className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink">
              <Info className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto bg-cream px-5 py-5">
          {active.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-3xl px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "rounded-br-md bg-cobalt text-white"
                    : "rounded-bl-md bg-white text-ink shadow-sm"
                }`}
              >
                <p>{m.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    m.from === "me" ? "text-white/60" : "text-ink-muted"
                  }`}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={send}
          className="flex items-center gap-2 border-t border-ink/[0.06] bg-cream-50 px-4 py-3"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message…"
            className="input flex-1"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cobalt text-white transition hover:bg-cobalt-dark disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
