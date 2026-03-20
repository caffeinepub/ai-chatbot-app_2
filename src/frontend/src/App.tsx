import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  type Message,
  createMessage,
  getBotResponse,
  getTypingDelay,
  getWelcomeMessage,
} from "@/lib/chatbot";
import {
  Bot,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Send,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const QUICK_REPLIES = [
  { en: "Earning Tips", hi: "पैसे कमाने के टिप्स", query: "Earning Tips" },
  { en: "Tech Help", hi: "टेक मदद", query: "Tech Help" },
  { en: "Business Ideas", hi: "बिज़नेस आइडिया", query: "Business Ideas" },
  { en: "Education", hi: "शिक्षा", query: "Education" },
];

const HISTORY_ITEMS = [
  { id: 1, title: "Freelancing Tips", time: "2h ago" },
  { id: 2, title: "Python सीखना", time: "Yesterday" },
  { id: 3, title: "Startup Ideas 2025", time: "2 days ago" },
];

function formatMessageText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const boldProcessed = parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`bold-${part}`} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static line rendering
      <span key={`line-${lineIdx}`}>
        {boldProcessed}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2 mb-3"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="bg-bubble-bot rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-primary inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary inline-block" />
        <span className="ml-2 text-xs text-muted-foreground">
          AI Saathi is typing...
        </span>
      </div>
    </motion.div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isBot = message.sender === "bot";
  const timeStr = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 mb-3 ${
        isBot ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      {!isBot && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-bubble-user flex items-center justify-center text-white text-xs font-bold">
          R
        </div>
      )}
      <div
        className={`max-w-[75%] ${
          isBot ? "items-start" : "items-end"
        } flex flex-col gap-1`}
      >
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? "bg-bubble-bot text-foreground rounded-2xl rounded-bl-sm"
              : "bg-bubble-user text-white rounded-2xl rounded-br-sm"
          }`}
        >
          {formatMessageText(message.text)}
        </div>
        <span className="text-[11px] text-muted-foreground px-1">
          {timeStr}
        </span>
      </div>
    </motion.div>
  );
}

function QuickReplies({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {QUICK_REPLIES.map((qr) => (
        <button
          type="button"
          key={qr.en}
          data-ocid={`chat.${qr.en.toLowerCase().replace(/ /g, "_")}.button`}
          onClick={() => onSelect(qr.query)}
          className="text-xs px-3 py-1.5 rounded-full font-medium text-white transition-all hover:opacity-90 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.58 0.185 253), oklch(0.52 0.19 270))",
          }}
        >
          {qr.en} / {qr.hi}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCount = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages/typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageCount, isTyping]);

  function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;
    const userMsg = createMessage(text.trim(), "user");
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    const delay = getTypingDelay();
    setTimeout(() => {
      const botResponse = getBotResponse(text.trim());
      const botMsg = createMessage(botResponse, "bot");
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  }

  function handleNewChat() {
    setMessages([getWelcomeMessage()]);
    setIsTyping(false);
    setInputText("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  }

  const lastBotIdx = [...messages]
    .reverse()
    .findIndex((m) => m.sender === "bot");
  const showQuickReplies = lastBotIdx !== -1 && !isTyping;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-5xl h-[calc(100vh-3rem)] max-h-[800px] flex rounded-3xl overflow-hidden shadow-card bg-card">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 270, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col bg-card border-r border-border overflow-hidden flex-shrink-0"
            >
              {/* Brand */}
              <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-foreground tracking-tight">
                  AI Saathi
                </span>
                <span className="text-xs text-muted-foreground font-medium ml-0.5">
                  AI साथी
                </span>
              </div>

              {/* AI Assistant section */}
              <div className="px-4 pt-4 pb-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                  Assistant
                </p>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-accent/50">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-green border-2 border-card" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      AI Saathi
                    </p>
                    <p
                      className="text-[11px] font-medium"
                      style={{ color: "oklch(var(--online-green))" }}
                    >
                      ● Online
                    </p>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="px-4 pt-3 pb-2 flex-1 overflow-hidden">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                  History
                </p>
                <div className="space-y-1">
                  {HISTORY_ITEMS.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      data-ocid={`sidebar.history.item.${item.id}`}
                      className="w-full flex items-start justify-between gap-2 px-3 py-2 rounded-xl hover:bg-accent/50 transition-colors text-left group"
                    >
                      <span className="text-sm text-foreground truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex-shrink-0">
                        {item.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* New Chat button */}
              <div className="px-4 pb-4">
                <button
                  type="button"
                  data-ocid="sidebar.new_chat.button"
                  onClick={handleNewChat}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.185 253), oklch(0.52 0.19 270))",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  New Chat / नई बातचीत
                </button>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-3 px-4 py-3 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-bubble-user flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  R
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Rahul</p>
                  <p className="text-[11px] text-muted-foreground">
                    rahul@example.com
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="sidebar.settings.button"
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-accent/50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Chat Panel */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card flex-shrink-0">
            <button
              type="button"
              data-ocid="chat.sidebar_toggle.button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent/50 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-green border-2 border-card" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">AI Saathi</p>
              <p
                className="text-[11px] font-medium"
                style={{ color: "oklch(var(--online-green))" }}
              >
                ● Online — bilingual assistant
              </p>
            </div>
            <button
              type="button"
              data-ocid="chat.options.button"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent/50 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-5 py-4" ref={scrollAreaRef}>
            <div className="flex flex-col">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-0 pb-2"
                >
                  <QuickReplies onSelect={sendMessage} />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Composer */}
          <div className="flex-shrink-0 border-t border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-ocid="chat.attachment.button"
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-accent/50 transition-colors flex-shrink-0"
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </button>
              <Input
                ref={inputRef}
                data-ocid="chat.input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type in English or Hindi... / हिंदी या अंग्रेजी में टाइप करें..."
                className="flex-1 rounded-xl border-border bg-background text-sm h-10 focus-visible:ring-primary"
                disabled={isTyping}
              />
              <Button
                data-ocid="chat.send.button"
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                size="icon"
                className="w-9 h-9 rounded-xl flex-shrink-0 bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-2 left-0 right-0 flex justify-center">
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
