import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, Copy, Check, RefreshCw } from 'lucide-react';
import { ChatMessage, WeddingData } from '../types';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wedding: WeddingData;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({ isOpen, onClose, wedding }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      content: `សួស្តី! Hello and warm welcome! I am Memento Assistant, the AI Wedding Concierge for the wedding of ${wedding.groomName} & ${wedding.brideName}.\n\nHow can I help you today? You can ask me about the schedule of ceremonies, venue directions, dress code recommendations, or request an auspicious Khmer wedding blessing!`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What is the schedule of ceremonies?",
    "Where is the venue & how to park?",
    "What is the dress code?",
    "Write a traditional Khmer blessing for the couple",
    "How do wedding envelopes (Sambot Ka) work?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          weddingContext: {
            groomName: wedding.groomName,
            brideName: wedding.brideName,
            weddingDate: wedding.weddingDateDisplay,
            venueName: wedding.venueName,
            locationAddress: wedding.venueAddress,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        content: data.reply || "Thank you for asking! Please let me know if you need any further assistance with Suyhong & Vinaya's wedding celebration.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: 'bot-err-' + Date.now(),
        role: 'model',
        content: "I apologize, I am temporarily having trouble reaching the server. Please feel free to check the schedule and location sections directly on the invitation, or ask me again shortly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div 
        className="w-full max-w-md h-full bg-[#1b2b2b] text-stone-100 flex flex-col shadow-2xl border-l border-[#c5a059]/30 animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#c5a059]/30 bg-[#213535] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#f4e4bf] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#1b2b2b] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#f1e1be]" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-serif font-semibold text-[#f1e1be] flex items-center gap-1.5">
                <span>Memento Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h3>
              <p className="text-[10px] text-stone-300">
                Wedding Assistant for Suyhong &amp; Vinaya
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#b38d47] text-stone-950 font-medium rounded-br-xs shadow-md'
                    : 'bg-[#253939] text-stone-100 border border-[#c5a059]/20 rounded-bl-xs shadow-md whitespace-pre-wrap'
                }`}
              >
                {msg.content}
              </div>

              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                {msg.role === 'model' && (
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="text-[10px] text-stone-400 hover:text-[#c5a059] flex items-center gap-0.5"
                    title="Copy text"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#253939] border border-[#c5a059]/20 max-w-[70%]">
              <RefreshCw className="w-3.5 h-3.5 text-[#c5a059] animate-spin" />
              <span className="text-xs text-stone-300">Memento Assistant is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-[#1e2f2f] border-t border-stone-800">
          <div className="flex items-center gap-1 text-[11px] text-[#d2be92] mb-1.5 px-1">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-stone-900/80 border border-[#c5a059]/30 text-stone-300 hover:text-white hover:border-[#c5a059] transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#203333] border-t border-[#c5a059]/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the wedding ceremony..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-900/80 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b38d47] text-stone-950 hover:brightness-110 disabled:opacity-40 transition-all cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
