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
    <div style={s.typingWrap}>
      <div style={s.aiAvatar}>O</div>
      <div style={s.typingBubble}>
        <span style={{ ...s.dot, animationDelay: "0s" }} />
        <span style={{ ...s.dot, animationDelay: "0.18s" }} />
        <span style={{ ...s.dot, animationDelay: "0.36s" }} />
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
    <div style={{ ...s.msgRow, justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && <div style={s.aiAvatar}>O</div>}
      <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start", gap: 4 }}>
        <div style={isUser ? s.userBubble : s.aiBubble}>
          <p style={s.bubbleText}>{msg.content}</p>
        </div>
        <span style={s.timeStamp}>{time}</span>
      </div>
      {isUser && <div style={s.userAvatar}>U</div>}
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
      style={{
        ...s.convItem,
        background: active ? "#E1F5EE" : hover ? "#f5f5f5" : "transparent",
        borderLeft: active ? "3px solid #1D9E75" : "3px solid transparent",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={s.convTitle}>
          {conv.title || `Chat ${conv._id?.slice(-4) || ""}`}
        </p>
        <p style={s.convPreview}>{preview.slice(0, 42)}{preview.length > 42 ? "…" : ""}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column",
        alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={s.convDate}>{date}</span>
        {(hover || active) && (
          <button
            style={s.deleteConvBtn}
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
      const data = await apiPost("/api/chat/conversation", {
        title: "New conversation",
      });
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
        const data = await apiPost("/api/chat/conversation", {
          title: content.slice(0, 40),
        });
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
      const data = await apiPost(
        `/api/chat/conversation/${convId}/message`,
        { content }
      );

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
    <div style={s.root}>

      {/* ── SIDEBAR ── */}
      <aside style={{ ...s.sidebar, width: sidebarOpen ? 280 : 0, overflow: "hidden" }}>
        <div style={s.sidebarInner}>

          {/* Sidebar header */}
          <div style={s.sidebarHeader}>
            <div style={s.brandMark}>
              <span style={s.brandDot} />
              <span style={s.brandName}>ONSY AI</span>
            </div>
            <button style={s.newChatBtn} onClick={startNewConversation} title="New chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New chat
            </button>
          </div>

          {/* Conversation list */}
          <div style={s.convList}>
            {conversations.length === 0 ? (
              <p style={s.emptyConvs}>No conversations yet. Start chatting!</p>
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
          <div style={s.sidebarFooter}>
            <div style={s.footerDot} />
            <span style={s.footerText}>Powered by ONSY AI</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN CHAT PANEL ── */}
      <main style={s.main}>

        {/* Top bar */}
        <header style={s.topBar}>
          <button style={s.sidebarToggle} onClick={() => setSidebarOpen((v) => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div style={s.topBarCenter}>
            <div style={s.topBarAvatar}>O</div>
            <div>
              <p style={s.topBarName}>ONSY Companion</p>
              <p style={s.topBarStatus}>
                <span style={s.statusDot} />
                Always here for you
              </p>
            </div>
          </div>
          <button style={s.newChatTopBtn} onClick={startNewConversation} title="New chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </header>

        {/* Error banner */}
        {error && (
          <div style={s.errorBanner}>
            <span>{error}</span>
            <button style={s.errorClose} onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Messages area */}
        <div style={s.messagesArea}>
          {isEmpty && (
            <div style={s.emptyState}>
              <div style={s.emptyOrb}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                  stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h2 style={s.emptyTitle}>Hi, I'm your ONSY companion</h2>
              <p style={s.emptySubtitle}>
                I'm here to support your mental wellbeing. Ask me anything — about
                your mood, EEG results, breathing, or just talk to me.
              </p>
              <div style={s.suggestionsGrid}>
                {SUGGESTIONS.map((s_, i) => (
                  <button
                    key={i}
                    style={s.suggestionChip}
                    onClick={() => sendMessage(s_)}
                  >
                    {s_}
                  </button>
                ))}
              </div>
            </div>
          )}

          {convLoading && (
            <div style={s.convLoadingWrap}>
              <div style={s.spinnerRing} />
            </div>
          )}

          {!convLoading && messages.map((msg) => (
            <MessageBubble key={msg._id} msg={msg} />
          ))}

          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <footer style={s.inputArea}>
          <div style={s.inputBox}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share how you're feeling…"
              style={s.textarea}
              rows={1}
              disabled={loading}
            />
            <button
              style={{
                ...s.sendButton,
                background: input.trim() && !loading ? "#1D9E75" : "#ccc",
                cursor: input.trim() && !loading ? "pointer" : "default",
              }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              title="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" stroke="none"/>
              </svg>
            </button>
          </div>
          <p style={s.inputHint}>Press Enter to send · Shift+Enter for new line</p>
        </footer>
      </main>

      {/* CSS keyframes injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700&display=swap');
        @keyframes blink {
          0%,80%,100% { opacity:0.2; transform:scale(0.8); }
          40% { opacity:1; transform:scale(1.1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = {
  root: {
    display: "flex",
    height: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    background: "#f7f8fa",
    overflow: "hidden",
  },

  // ── Sidebar ──
  sidebar: {
    transition: "width 0.28s cubic-bezier(.4,0,.2,1)",
    flexShrink: 0,
    borderRight: "1px solid #e8e8e8",
    background: "#fff",
  },
  sidebarInner: {
    width: 280,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarHeader: {
    padding: "20px 16px 12px",
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  brandMark: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#1D9E75",
    display: "inline-block",
    boxShadow: "0 0 0 3px #E1F5EE",
  },
  brandName: {
    fontSize: 15,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    color: "#0F6E56",
    letterSpacing: "0.02em",
  },
  newChatBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 10,
    border: "1px solid #1D9E75",
    background: "#E1F5EE",
    color: "#0F6E56",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    width: "100%",
    justifyContent: "center",
    transition: "background 0.15s",
  },
  convList: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 0",
  },
  emptyConvs: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    padding: "24px 16px",
  },
  convItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    cursor: "pointer",
    transition: "background 0.15s",
    borderLeft: "3px solid transparent",
  },
  convTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#222",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  convPreview: {
    fontSize: 12,
    color: "#999",
    margin: "2px 0 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  convDate: {
    fontSize: 11,
    color: "#bbb",
    whiteSpace: "nowrap",
  },
  deleteConvBtn: {
    background: "none",
    border: "none",
    fontSize: 11,
    color: "#ccc",
    cursor: "pointer",
    padding: "2px 4px",
    borderRadius: 4,
    lineHeight: 1,
  },
  sidebarFooter: {
    padding: "12px 16px",
    borderTop: "1px solid #f0f0f0",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  footerDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1D9E75",
  },
  footerText: {
    fontSize: 11,
    color: "#bbb",
  },

  // ── Main ──
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100vh",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 20px",
    background: "#fff",
    borderBottom: "1px solid #efefef",
    flexShrink: 0,
  },
  sidebarToggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    padding: 6,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarCenter: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  topBarAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#1D9E75",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  topBarName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: "#111",
  },
  topBarStatus: {
    margin: 0,
    fontSize: 12,
    color: "#999",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1D9E75",
    display: "inline-block",
  },
  newChatTopBtn: {
    background: "none",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    cursor: "pointer",
    color: "#555",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
  },

  // ── Error ──
  errorBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff0f0",
    borderBottom: "1px solid #ffd0d0",
    padding: "8px 20px",
    fontSize: 13,
    color: "#c0392b",
    flexShrink: 0,
  },
  errorClose: {
    background: "none",
    border: "none",
    color: "#c0392b",
    cursor: "pointer",
    fontSize: 13,
  },

  // ── Messages ──
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  msgRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    animation: "fadeUp 0.25s ease both",
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#1D9E75",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#085041",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  aiBubble: {
    background: "#fff",
    border: "1px solid #e8f5f0",
    borderRadius: "18px 18px 18px 4px",
    padding: "12px 16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  userBubble: {
    background: "#1D9E75",
    borderRadius: "18px 18px 4px 18px",
    padding: "12px 16px",
  },
  bubbleText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: "inherit",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  timeStamp: {
    fontSize: 11,
    color: "#bbb",
  },

  // ── Typing ──
  typingWrap: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
  },
  typingBubble: {
    background: "#fff",
    border: "1px solid #e8f5f0",
    borderRadius: "18px 18px 18px 4px",
    padding: "14px 18px",
    display: "flex",
    gap: 5,
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1D9E75",
    display: "inline-block",
    animation: "blink 1.2s infinite ease-in-out",
  },

  // ── Empty state ──
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 24px",
    gap: 16,
  },
  emptyOrb: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#E1F5EE",
    border: "2px solid #9FE1CB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    margin: 0,
    fontSize: 22,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    color: "#111",
  },
  emptySubtitle: {
    margin: 0,
    fontSize: 14,
    color: "#888",
    maxWidth: 420,
    lineHeight: 1.6,
  },
  suggestionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 10,
    width: "100%",
    maxWidth: 520,
    marginTop: 8,
  },
  suggestionChip: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #C8EAE0",
    background: "#F0FBF7",
    color: "#0F6E56",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left",
    lineHeight: 1.4,
    transition: "background 0.15s, border-color 0.15s",
  },

  // ── Loading spinner ──
  convLoadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
  },
  spinnerRing: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "3px solid #E1F5EE",
    borderTopColor: "#1D9E75",
    animation: "spin 0.8s linear infinite",
  },

  // ── Input area ──
  inputArea: {
    padding: "12px 20px 16px",
    background: "#fff",
    borderTop: "1px solid #efefef",
    flexShrink: 0,
  },
  inputBox: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    background: "#f7f8fa",
    borderRadius: 16,
    border: "1.5px solid #e0e0e0",
    padding: "8px 8px 8px 16px",
    transition: "border-color 0.15s",
  },
  textarea: {
    flex: 1,
    border: "none",
    background: "transparent",
    resize: "none",
    outline: "none",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#111",
    fontFamily: "'DM Sans', sans-serif",
    maxHeight: 140,
    overflowY: "auto",
    padding: "4px 0",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.2s, transform 0.1s",
  },
  inputHint: {
    margin: "6px 4px 0",
    fontSize: 11,
    color: "#ccc",
    textAlign: "right",
  },
};
