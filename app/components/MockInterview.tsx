"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  employer: string;
  companyName: string;
}

const MAX_MESSAGES = 20;

export default function MockInterview({ employer, companyName }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function startSession() {
    setStarted(true);
    setLoading(true);
    setError("");
    await sendToAPI([{ role: "user", content: "Start the interview. Ask me your first question." }]);
  }

  async function sendToAPI(msgs: Message[]) {
    setLoading(true);
    setError("");

    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employer, messages: msgs }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Stream the response
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let assistantText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantText += decoder.decode(value, { stream: true });
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: assistantText };
        return updated;
      });
    }

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    if (newMessages.length >= MAX_MESSAGES) {
      setError("Session complete — you've reached the 20-message limit. Email your transcript below or start a new session.");
      setShowTranscript(true);
      return;
    }

    await sendToAPI(newMessages);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  async function sendTranscript(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const res = await fetch("/api/send-transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, employer, messages }),
    });
    setSending(false);
    if (res.ok) {
      setSent(true);
    } else {
      setError("Failed to send transcript — check your email address and try again.");
    }
  }

  const userCount = messages.filter((m) => m.role === "user").length;
  const atLimit = userCount >= MAX_MESSAGES / 2;

  if (!started) {
    return (
      <div className="py-10 max-w-lg mx-auto">
        <div className="text-4xl mb-4">🎤</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Practice Interview — {companyName}</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          This is not a generic AI chatbot. The coach is trained specifically on the {companyName} prep pack —
          it knows the exact application stages, competencies, and question formats {companyName} uses.
          Every question it asks is grounded in that content. Every piece of feedback is specific to how {companyName} assesses candidates.
        </p>
        <ul className="space-y-2 mb-6">
          {[
            `Questions drawn from ${companyName}'s actual application process`,
            "Structured feedback after every answer: what worked + what to improve",
            "Push-back and follow-up questions — just like the real thing",
            "Email your full transcript to yourself when done",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={startSession}
          className="bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors w-full sm:w-auto"
        >
          Start interview
        </button>
        <p className="text-xs text-slate-400 mt-3">
          Not affiliated with {companyName}. This is a practice tool only.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-slate-100 text-slate-800 rounded-bl-sm"
              }`}
            >
              {msg.content || (loading && i === messages.length - 1 ? <span className="opacity-50">Thinking…</span> : "")}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-400 rounded-2xl rounded-bl-sm px-4 py-3 text-sm">Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2 mb-2">{error}</p>
      )}

      {/* Transcript email form — appears after session or at limit */}
      {(showTranscript || atLimit) && messages.length > 2 && (
        <div className="border border-slate-200 rounded-xl p-4 mb-3 bg-slate-50">
          {sent ? (
            <p className="text-sm text-green-700 font-medium">✓ Transcript sent to {email}</p>
          ) : (
            <form onSubmit={sendTranscript} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                disabled={sending}
                className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {sending ? "Sending…" : "Email transcript"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Input */}
      {!showTranscript && (
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
            rows={3}
            maxLength={2000}
            disabled={loading}
            className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 resize-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 font-medium text-sm self-end"
          >
            Send
          </button>
        </form>
      )}

      <p className="text-xs text-slate-400 mt-2 text-center">
        {userCount}/{MAX_MESSAGES / 2} answers used · Not affiliated with {companyName}
      </p>
    </div>
  );
}
