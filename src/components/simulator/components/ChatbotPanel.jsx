import { useMemo, useRef, useState } from "react";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hi! Ask me about the current algorithm, the step you're on, or the code.",
};

export default function ChatbotPanel({ algorithm, language, step, code }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [isOpen, setIsOpen] = useState(false);
  const endRef = useRef(null);

  const context = useMemo(() => {
    const desc = step?.desc ? String(step.desc).trim() : "";
    const line = Number.isFinite(step?.line) ? step.line : null;
    const snippet = typeof code === "string" ? code.slice(0, 1600) : "";
    return {
      algorithm: algorithm || "",
      language: language || "",
      stepDesc: desc,
      stepLine: line,
      codeSnippet: snippet,
    };
  }, [algorithm, language, step, code]);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || status === "sending") return;

    const nextMessages = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setStatus("sending");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, context }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json();
      const reply = data?.text?.trim() || "Sorry, I didn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setStatus("idle");
      scrollToEnd();
    } catch (err) {
      setStatus("error");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-3 text-sm shadow-lg"
      >
        {isOpen ? "Close Chat" : "AI Chat"}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[92vw] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[420px] shadow-xl">
          <div className="text-sm font-semibold">AI Chat</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Context-aware assistant
          </div>

          <div className="mt-3 flex-1 overflow-auto space-y-2 pr-1 text-sm">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[90%] rounded-xl bg-zinc-900 text-white px-3 py-2"
                    : "mr-auto max-w-[90%] rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-3 py-2"
                }
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="Ask about this step..."
              className="flex-1 resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={status === "sending"}
              className="rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 text-sm transition disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
