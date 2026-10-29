"use client";

import React from "react";
import { Newspaper, ExternalLink, Calendar } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { SpaceNewsItem } from "@/app/api/news/route";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

export function HomeNewsFeed() {
  const { data: news, loading, error, isFallback, retry } = useFetch<SpaceNewsItem[]>("/api/news");

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-space-800 bg-space-900/60 space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-3.5 w-full rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error && (!news || news.length === 0)) {
    return <ErrorState message={error} onRetry={retry} isCompact />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-astro-cyan" />
          <h3 className="text-base font-bold font-display text-white">Orbital Science News Wire</h3>
        </div>
        {isFallback && <SampleDataBadge />}
      </div>

      <div className="space-y-3">
        {news?.map((item) => (
          <article
            key={item.id}
            className="p-4 rounded-xl border border-space-800 bg-space-900/60 hover:border-space-700 transition-colors space-y-2 group"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="text-astro-cyan font-semibold">{item.newsSite}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {item.publishedAt.slice(0, 10)}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white group-hover:text-ember-400 transition-colors leading-snug">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                <span>{item.title}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
              </a>
            </h4>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
