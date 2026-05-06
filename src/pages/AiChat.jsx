import { useState, useEffect, useRef, useCallback } from "react";

// ─── API helpers ────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─── Quick-suggestion chips ──────────────────────────────────────────────────
const SUGGESTIONS = [
  "How am I feeling today?",
  "Give me a breathing exercise",
  "Help me journal my thoughts",
  "Why do I feel anxious?",
  "Motivate me",
  "Sleep tips for tonight",
];

// ─── Typing indicator dots ───────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-[#1D9E75] dark:bg-teal-600 text-white flex items-center justify-center font-bold text-xs font-syne shrink-0">O</div>
      <div className="bg-white dark:bg-slate-700 border border-teal-100 dark:border-slate-600 rounded-[18px_18px_18px_4px] px-5 py-3.5 shadow-sm flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] dark:bg-teal-400 inline-block" style={{ animation: "blink 1.2s infinite ease-in-out", animationDelay: "0s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] dark:bg-teal-400 inline-block" style={{ animation: "blink 1.2s infinite ease-in-out", animationDelay: "0.18s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] dark:bg-teal-400 inline-block" style={{ animation: "blink 1.2s infinite ease-in-out", animationDelay: "0.36s" }} />
      </div>
    </div>
  );
}

// ─── Single message bubble ───────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  const time = new Date(msg.sent_at || msg.createdAt || Date.now())
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.25s ease both" }}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#1D9E75] dark:bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">O</div>
      )}
      <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`} style={{ maxWidth: "72%" }}>
        <div className={isUser
          ? "bg-[#1D9E75] dark:bg-teal-600 rounded-[18px_18px_4px_18px] px-4 py-3"
          : "bg-white dark:bg-slate-700 border border-teal-50 dark:border-slate-600 rounded-[18px_18px_18px_4px] px-4 py-3 shadow-sm"
        }>
          <p className={`m-0 text-sm leading-relaxed whitespace-pre-wrap break-words ${isUser ? "text-white" : "text-slate-800 dark:text-slate-100"}`}>
            {msg.content}
          </p>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">{time}</span>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#085041] dark:bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0">U</div>
      )}
    </div>
  );
}

// ─── Conversation list sidebar item ─────────────────────────────────────────
function ConvItem({ conv, active, onClick, onDelete }) {
  const [hover, setHover] = useState(false);
  const preview = conv.lastMessage || "New conversation";
  const date = new Date(conv.started_at || conv.createdAt || Date.now())
    .toLocaleDateString([], { month: "short", day: "numeric" });

  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-all duration-150 border-l-[3px] ${
        active
          ? "bg-teal-50 dark:bg-teal-900/30 border-[#1D9E75] dark:border-teal-400"
          : hover
            ? "bg-slate-50 dark:bg-slate-700/50 border-transparent"
            : "bg-transparent border-transparent"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 m-0 whitespace-nowrap overflow-hidden text-ellipsis">
          {conv.title || `Chat ${conv._id?.slice(-4) || ""}`}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 m-0 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
          {preview.slice(0, 42)}{preview.length > 42 ? "…" : ""}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[11px] text-slate-300 dark:text-slate-600 whitespace-nowrap">{date}</span>
        {(hover || active) && (
          <button
            className="text-[11px] text-slate-300 dark:text-slate-600 hover:text-red-400 dark:hover:text-red-400 bg-none border-none cursor-pointer p-1 rounded leading-none transition-colors"
            onClick={(e) => { e.stopPropagation(); onDelete(conv._id); }}
            title="Delete conversation"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main AiChat component ────────────────────────────────────────────────────
export default function AiChat() {
  const [conversations, setConversations]   = useState([]);
  const [activeConvId, setActiveConvId]     = useState(null);
  const [messages, setMessages]             = useState([]);
  const [input, setInput]                   = useState("");
  const [loading, setLoading]               = useState(false);  
  const [convLoading, setConvLoading]       = useState(false);  
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [error, setError]                   = useState(null);

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const textareaRef = useRef(null);

  // ── scroll to bottom on new messages ──────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── auto-resize textarea ───────────────────────────────────────────────────
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 140) + "px";
    }
  }, [input]);

  // ── load conversations on mount ────────────────────────────────────────────
  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      const data = await apiGet("/api/chat/conversation");
      const list = data.conversations || data || [];
      setConversations(list);
    } catch (e) {
      setError("Failed to load conversations.");
    }
  }

  // ── load messages when active conversation changes ─────────────────────────
  useEffect(() => {
    if (!activeConvId) { setMessages([]); return; }
    loadMessages(activeConvId);
  }, [activeConvId]);

  async function loadMessages(convId) {
    setConvLoading(true);
    setError(null);
    try {
      const data = await apiGet(`/api/chat/conversation/${convId}/messages`);
      setMessages(data.messages || data || []);
    } catch (e) {
      setError("Failed to load messages.");
    } finally {
      setConvLoading(false);
    }
  }

  // ── start a new conversation ───────────────────────────────────────────────
  async function startNewConversation() {
    try {
      const data = await apiPost("/api/chat/conversation", { title: "New conversation" });
      const conv = data.conversation || data;
      setConversations((prev) => [conv, ...prev]);
      setActiveConvId(conv._id);
      setMessages([]);
      inputRef.current?.focus();
    } catch (e) {
      setError("Could not start a new conversation.");
    }
  }

  // ── send a message ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    setInput("");
    setError(null);

    // If no active conversation, create one first
    let convId = activeConvId;
    if (!convId) {
      try {
        const data = await apiPost("/api/chat/conversation", { title: content.slice(0, 40) });
        const conv = data.conversation || data;
        convId = conv._id;
        setConversations((prev) => [conv, ...prev]);
        setActiveConvId(convId);
      } catch {
        setError("Failed to create conversation.");
        return;
      }
    }

    // Optimistically add user message
    const userMsg = {
      _id: `temp-${Date.now()}`,
      role: "user",
      content,
      sent_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await apiPost(`/api/chat/conversation/${convId}/message`, { content });

      const aiMsg = data.aiMessage || data.message || {
        _id: `ai-${Date.now()}`,
        role: "ai",
        content: data.response || data.content || "I'm here for you.",
        sent_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Update conversation preview in sidebar
      setConversations((prev) =>
        prev.map((c) =>
          c._id === convId ? { ...c, lastMessage: aiMsg.content } : c
        )
      );
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          _id: `err-${Date.now()}`,
          role: "ai",
          content: "Sorry, I'm having trouble connecting right now. Please try again.",
          sent_at: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [activeConvId, input, loading]);

  // ── delete conversation ────────────────────────────────────────────────────
  async function deleteConversation(convId) {
    try {
      await apiDelete(`/api/chat/conversation/${convId}`);
      setConversations((prev) => prev.filter((c) => c._id !== convId));
      if (activeConvId === convId) {
        setActiveConvId(null);
        setMessages([]);
      }
    } catch {
      setError("Failed to delete conversation.");
    }
  }

  // ── keyboard handler ───────────────────────────────────────────────────────
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ── render ─────────────────────────────────────────────────────────────────
  const isEmpty = messages.length === 0 && !convLoading;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans transition-colors duration-300">

      {/* ── SIDEBAR ── */}
      <aside
        className="flex-shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
        style={{ width: sidebarOpen ? 280 : 0 }}
      >
        <div className="w-[280px] h-full flex flex-col overflow-hidden">

          {/* Sidebar header */}
          <div className="px-4 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D9E75] dark:bg-teal-400 inline-block shadow-[0_0_0_3px_#E1F5EE] dark:shadow-[0_0_0_3px_rgba(52,211,153,0.15)]" />
              <span className="text-[15px] font-bold text-[#0F6E56] dark:text-teal-400 tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>ONSY AI</span>
            </div>
            <button
              className="new-chat-btn flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#1D9E75] dark:border-teal-600 bg-teal-50 dark:bg-teal-900/30 text-[#0F6E56] dark:text-teal-300 text-[13px] font-medium cursor-pointer w-full transition-all duration-200 hover:bg-teal-100 dark:hover:bg-teal-900/50"
              onClick={startNewConversation}
              title="New chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New chat
            </button>
          </div>

          {/* Conversation list */}
          <div className="conv-list flex-1 overflow-y-auto py-2">
            {conversations.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-slate-500 text-center py-6 px-4">No conversations yet. Start chatting!</p>
            ) : (
              conversations.map((conv) => (
                <ConvItem
                  key={conv._id}
                  conv={conv}
                  active={conv._id === activeConvId}
                  onClick={() => setActiveConvId(conv._id)}
                  onDelete={deleteConversation}
                />
              ))
            )}
          </div>

          {/* Sidebar footer */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] dark:bg-teal-400" />
            <span className="text-[11px] text-slate-400 dark:text-slate-500">Powered by ONSY AI</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN CHAT PANEL ── */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">

        {/* Top bar */}
        <header className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <button
            className="bg-none border-none cursor-pointer text-slate-500 dark:text-slate-400 p-1.5 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="flex-1 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1D9E75] dark:bg-teal-600 text-white flex items-center justify-center font-bold text-base shrink-0" style={{ fontFamily: "'Syne', sans-serif" }}>O</div>
            <div>
              <p className="m-0 text-sm font-semibold text-slate-800 dark:text-slate-100">ONSY Companion</p>
              <p className="m-0 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] dark:bg-teal-400 inline-block" />
                Always here for you
              </p>
            </div>
          </div>
          <button
            className="border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer text-slate-500 dark:text-slate-400 p-2 flex items-center justify-center bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={startNewConversation}
            title="New chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </header>

        {/* Error banner */}
        {error && (
          <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800/40 px-5 py-2 text-[13px] text-red-600 dark:text-red-400 shrink-0">
            <span>{error}</span>
            <button className="bg-none border-none text-red-500 dark:text-red-400 cursor-pointer text-[13px]" onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Messages area */}
        <div className="messages-area flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
          {isEmpty && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 gap-4">
              <div className="w-20 h-20 rounded-full bg-teal-50 dark:bg-teal-900/30 border-2 border-teal-200 dark:border-teal-700 flex items-center justify-center mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h2 className="m-0 text-[22px] font-bold text-slate-800 dark:text-slate-100" style={{ fontFamily: "'Syne', sans-serif" }}>Hi, I'm your ONSY companion</h2>
              <p className="m-0 text-sm text-slate-500 dark:text-slate-400 max-w-[420px] leading-relaxed">
                I'm here to support your mental wellbeing. Ask me anything — about
                your mood, EEG results, breathing, or just talk to me.
              </p>
              <div className="grid gap-2.5 w-full max-w-[520px] mt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {SUGGESTIONS.map((s_, i) => (
                  <button
                    key={i}
                    className="suggestion-chip px-3.5 py-2.5 rounded-xl border border-teal-100 dark:border-teal-800/60 bg-teal-50/80 dark:bg-teal-900/20 text-[#0F6E56] dark:text-teal-300 text-[13px] font-medium cursor-pointer text-left leading-snug transition-all duration-150 hover:-translate-y-0.5"
                    onClick={() => sendMessage(s_)}
                  >
                    {s_}
                  </button>
                ))}
              </div>
            </div>
          )}

          {convLoading && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 rounded-full border-[3px] border-teal-100 dark:border-teal-900 border-t-[#1D9E75] dark:border-t-teal-400" style={{ animation: "spin 0.8s linear infinite" }} />
            </div>
          )}

          {!convLoading && messages.map((msg) => (
            <MessageBubble key={msg._id} msg={msg} />
          ))}

          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <footer className="px-5 py-3 pb-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="input-box flex items-end gap-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border-[1.5px] border-slate-200 dark:border-slate-700 px-4 py-2 transition-all duration-150">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share how you're feeling…"
              className="flex-1 border-none bg-transparent resize-none outline-none text-sm leading-relaxed text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 max-h-[140px] overflow-y-auto py-1 font-sans"
              rows={1}
              disabled={loading}
            />
            <button
              className={`send-btn w-10 h-10 rounded-xl border-none flex items-center justify-center shrink-0 transition-all duration-200 ${input.trim() && !loading ? 'bg-[#1D9E75] dark:bg-teal-600 cursor-pointer hover:bg-teal-600 dark:hover:bg-teal-500 hover:-translate-y-0.5' : 'bg-slate-200 dark:bg-slate-700 cursor-default'}`}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              title="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" stroke="none"/>
              </svg>
            </button>
          </div>
          <p className="mt-1.5 mx-1 text-[11px] text-slate-300 dark:text-slate-600 text-right">Press Enter to send · Shift+Enter for new line</p>
        </footer>
      </main>
    </div>
  );
}
