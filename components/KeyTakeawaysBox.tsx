"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, ChevronUp, ExternalLink, Lightbulb, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

interface KeyTakeawaysBoxProps {
  pageContext: "experiments" | "rankings";
}

export function KeyTakeawaysBox({ pageContext }: KeyTakeawaysBoxProps) {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const takeaways = [
    {
      id: "takeaway-1",
      text: t.keyTakeaway1,
      citedId: "bass-ii",
      acronym: "BASS-II",
    },
    {
      id: "takeaway-2",
      text: t.keyTakeaway2,
      citedId: "saffire-iv",
      acronym: "SAFFIRE-IV",
    },
    {
      id: "takeaway-3",
      text: t.keyTakeaway3,
      citedId: "flex-2",
      acronym: "FLEX-2",
    },
    {
      id: "takeaway-4",
      text: t.keyTakeaway4,
      citedId: "saffire-i",
      acronym: "SAFFIRE-I",
    },
  ];

  const handleCopy = () => {
    const textToCopy = takeaways.map((tk, idx) => `${idx + 1}. ${tk.text} [${tk.acronym}]`).join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-space-900/90 to-space-950/90 border border-ember-500/30 overflow-hidden shadow-ember-glow-sm">
      {/* Header bar */}
      <div className="px-5 py-3.5 flex items-center justify-between gap-3 bg-space-950/60 border-b border-space-850">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ember-500/20 border border-ember-500/40 flex items-center justify-center text-ember-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              {t.keyTakeawaysTitle}
              <Badge variant="ember" size="sm">
                Executive Synthesis
              </Badge>
            </h3>
            <p className="text-[11px] text-slate-400">
              {t.keyTakeawaysSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-space-900 hover:bg-space-800 text-slate-400 hover:text-white transition-colors"
            title="Copy Key Takeaways"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg bg-space-900 hover:bg-space-800 text-slate-400 hover:text-white transition-colors"
            title={expanded ? "Collapse Takeaways" : "Expand Takeaways"}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          {takeaways.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-space-950/60 border border-space-850/80 space-y-1.5 hover:border-space-750 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-ember-400 uppercase tracking-wider">
                  Finding #{idx + 1}
                </span>
                <Link
                  href={`/experiments/${item.citedId}`}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-astro-cyan hover:underline"
                >
                  <span>[{item.acronym}]</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
