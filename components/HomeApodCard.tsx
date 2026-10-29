"use client";

import React from "react";
import { Sparkles, Calendar, ExternalLink } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { ApodData } from "@/app/api/apod/route";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

export function HomeApodCard() {
  const { data: apod, loading, error, isFallback, retry } = useFetch<ApodData>("/api/apod");

  if (loading) {
    return (
      <div className="p-6 rounded-2xl border border-space-800 bg-space-900/60 space-y-4">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded" />
      </div>
    );
  }

  if (error && !apod) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  if (!apod) return null;

  return (
    <div className="p-6 rounded-2xl border border-space-800 bg-space-900/70 backdrop-blur-md space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="cyan" size="sm">
            <Sparkles className="w-3 h-3" />
            NASA APOD Showcase
          </Badge>
          {isFallback && <SampleDataBadge />}
        </div>

        <div>
          <h3 className="text-base font-bold font-display text-white leading-snug">
            {apod.title}
          </h3>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3 h-3 text-slate-500" />
            {apod.date} {apod.copyright ? `&bull; ${apod.copyright}` : ""}
          </span>
        </div>

        {/* Media Container with safe fallback */}
        <div className="h-52 w-full rounded-xl overflow-hidden relative border border-space-800 bg-space-950 flex items-center justify-center">
          {apod.media_type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={apod.url}
              alt={apod.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-500"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                // If remote NASA image fails to load in browser, display space fallback
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              className="w-full h-full border-0"
              allowFullScreen
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent pointer-events-none" />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
          {apod.explanation}
        </p>
      </div>

      <div className="pt-3 border-t border-space-850 text-right">
        <a
          href="https://apod.nasa.gov/apod/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-ember-400 hover:text-ember-300 inline-flex items-center gap-1 font-mono"
        >
          View APOD Archive <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
