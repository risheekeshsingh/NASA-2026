"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Copy,
  Check,
  Bot,
  User,
  ExternalLink,
  ShieldAlert,
  FileText,
  Languages,
  Users,
  Compass,
  AlertCircle,
} from "lucide-react";
import { Audience, Language } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { MissionBriefModal } from "@/components/insights/MissionBriefModal";
import { EXPERIMENTS } from "@/lib/data/experiments";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  citedIds?: string[];
  isFallback?: boolean;
  audience?: Audience;
  timestamp: string;
}

export function InsightsChatPanel() {
  const { language, setLanguage, t } = useLanguage();
  const [audience, setAudience] = useState<Audience>("Engineer");
  const [inputQuestion, setInputQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isBriefOpen, setIsBriefOpen] = useState(false);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text:
        language === "hi"
          ? "नमस्ते! मैं FlameLens AI अग्नि सुरक्षा सहायक हूँ। मैं दशकों के नासा माइक्रोग्रैविटी दहन डेटा से चंद्रमा और मंगल अन्वेषण मिशनों के लिए साक्ष्य-आधारित सुरक्षा अंतर्दृष्टि प्रदान करता हूँ। नीचे दिए गए सुझाए गए प्रश्नों में से चुनें या अपना प्रश्न पूछें।\n\nमूल स्रोत से सत्यापन करें।"
          : "Welcome! I am the FlameLens Fire-Safety Intelligence Assistant. I translate decades of NASA, ESA, and international microgravity flight combustion research into evidence-backed fire safety guidance for human Moon and Mars exploration.\n\nSelect a suggested question below or enter your inquiry to begin.\n\nVerify against the original source.",
      citedIds: ["saffire-i", "bass-ii", "flex-ii"],
      isFallback: true,
      timestamp: "Just now",
    },
  ]);

  const suggestedQuestions = [
    "Which materials are riskiest for a Mars habitat?",
    "How does lower pressure change flame spread?",
    "What suppression methods look promising?",
    "Why do flames in microgravity become spherical?",
  ];

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend ?? inputQuestion).trim();
    if (!q || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          audience,
          language,
        }),
      });

      const data = await response.json();

      if (data.success && data.answer) {
        const assistantMessage: ChatMessage = {
          id: `ast-${Date.now()}`,
          sender: "assistant",
          text: data.answer,
          citedIds: data.citedExperimentIds || [],
          isFallback: data.isFallback,
          audience: data.audience,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          sender: "assistant",
          text: data.error || "Unable to complete telemetry analysis. Please try again.",
          isFallback: true,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text: "Network or server connection interrupted. Showing offline heuristic synthesis.",
        isFallback: true,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Control Bar */}
      <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-space-850 pb-4">
          {/* Audience Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-astro-cyan" /> {t.audienceLabel}:
            </span>
            <div className="flex flex-wrap gap-2">
              {(["Engineer", "Astronaut", "Student"] as Audience[]).map((aud) => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setAudience(aud)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    audience === aud
                      ? "bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-ember-glow"
                      : "bg-space-950 border border-space-800 text-slate-300 hover:bg-space-850"
                  }`}
                >
                  {aud === "Astronaut"
                    ? t.audienceAstronaut
                    : aud === "Engineer"
                    ? t.audienceEngineer
                    : t.audienceStudent}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              {audience === "Astronaut"
                ? t.audienceAstronautDesc
                : audience === "Engineer"
                ? t.audienceEngineerDesc
                : t.audienceStudentDesc}
            </p>
          </div>

          {/* Language & Mission Brief Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-space-950 border border-space-800 rounded-lg p-1 text-xs">
              <Languages className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded text-xs font-mono font-semibold transition-colors ${
                  language === "en" ? "bg-ember-500 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-2 py-0.5 rounded text-xs font-mono font-semibold transition-colors ${
                  language === "hi" ? "bg-ember-500 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Mission Brief Action */}
            <Button
              variant="cyan"
              size="sm"
              onClick={() => setIsBriefOpen(true)}
              className="text-xs"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              {t.generateBriefButton}
            </Button>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
            {t.suggestedQuestionsLabel}:
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(sq)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-space-950/80 hover:bg-space-800 border border-space-850 hover:border-space-700 text-xs text-slate-300 hover:text-white transition-all text-left disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3 inline mr-1.5 text-ember-400" />
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="space-y-4 min-h-[380px]">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-600 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-ember-glow">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-3xl rounded-2xl p-5 space-y-3 ${
                  isUser
                    ? "bg-space-800 border border-space-700 text-white"
                    : "bg-space-900/90 border border-space-800 text-slate-200"
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-4 border-b border-space-850 pb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-display">
                      {isUser ? "You" : "FlameLens AI Assistant"}
                    </span>
                    {!isUser && msg.audience && (
                      <Badge variant="cyan" size="sm">
                        {msg.audience} Mode
                      </Badge>
                    )}
                    {!isUser && msg.isFallback && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Flight Heuristic
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{msg.timestamp}</span>
                </div>

                {/* Message Text */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {/* Cited Sources Chips */}
                {!isUser && msg.citedIds && msg.citedIds.length > 0 && (
                  <div className="pt-2 border-t border-space-850 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      {t.sourcesCited}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citedIds.map((cid) => {
                        const exp = EXPERIMENTS.find((e) => e.id === cid);
                        return (
                          <Link
                            key={cid}
                            href={`/experiments/${cid}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-space-950 border border-space-800 hover:border-astro-cyan text-astro-cyan text-[11px] font-mono transition-colors"
                            title={`Inspect ${exp?.name || cid}`}
                          >
                            <span>[{exp?.acronym || cid}]</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Assistant Footer: Copy Button */}
                {!isUser && (
                  <div className="flex items-center justify-between pt-2 border-t border-space-850/60 text-xs">
                    <span className="text-[10px] font-mono text-slate-500">
                      {t.verifyNotice}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-space-800"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-mono text-xs">{t.copiedButton}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="font-mono text-xs">{t.copyButton}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-9 h-9 rounded-xl bg-space-800 border border-space-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-600 to-amber-600 flex items-center justify-center text-white shrink-0 animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-space-900 border border-space-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-ember-500 animate-ping" />
              <span className="text-xs font-mono text-slate-300">{t.thinking}</span>
            </div>
          </div>
        )}
      </div>

      {/* Question Input Box */}
      <div className="sticky bottom-4 z-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center shadow-2xl rounded-2xl bg-space-900/95 border border-space-700 focus-within:border-ember-500 backdrop-blur-md p-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder={t.inputPlaceholder}
            maxLength={1000}
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <Button
            type="submit"
            variant="ember"
            size="md"
            disabled={!inputQuestion.trim() || isLoading}
            className="shrink-0"
          >
            <Send className="w-4 h-4 mr-1.5" />
            {t.sendButton}
          </Button>
        </form>
      </div>

      {/* Mission Fire Safety Brief Modal */}
      <MissionBriefModal isOpen={isBriefOpen} onClose={() => setIsBriefOpen(false)} />
    </div>
  );
}
