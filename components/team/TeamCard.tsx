"use client";

import React, { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TeamMember } from "@/lib/data/team";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
  compact?: boolean;
}

export function TeamCard({ member, index = 0, compact = false }: TeamCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Extract GitHub username to optionally fetch avatar image
  const username = member.github.split("/").filter(Boolean).pop();
  const avatarUrl = username ? `https://github.com/${username}.png` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col justify-between space-y-5 shadow-xl ${
        shouldReduceMotion
          ? ""
          : "hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-ember-glow transition-all duration-300"
      }`}
    >
      <div className="space-y-4">
        {/* Top Row: Avatar + Name & Role + GitHub / LinkedIn Buttons */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Initials Avatar with Orange-to-Teal Gradient Border */}
            <div className="w-12 h-12 rounded-xl p-[1.5px] bg-gradient-to-br from-ember-500/70 via-amber-500/50 to-astro-cyan/70 flex items-center justify-center shrink-0 shadow-inner">
              <div className="w-full h-full rounded-[10px] bg-space-950 flex items-center justify-center overflow-hidden">
                {avatarUrl && !imgFailed ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl}
                      alt={`${member.name} avatar`}
                      loading="lazy"
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgFailed(true)}
                      className={`w-full h-full object-cover ${
                        imgLoaded ? "block" : "hidden"
                      }`}
                    />
                    {!imgLoaded && (
                      <span className="font-display font-bold text-white text-sm tracking-tight">
                        {member.initials}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-display font-bold text-white text-sm tracking-tight">
                    {member.initials}
                  </span>
                )}
              </div>
            </div>

            {/* Name & Role */}
            <div className="min-w-0">
              <h3 className="text-lg font-bold font-display text-white leading-tight truncate">
                {member.name}
              </h3>
              <span className="text-xs text-amber-400 font-mono block mt-0.5 truncate">
                {member.role}
              </span>
            </div>
          </div>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="w-8 h-8 rounded-lg bg-space-950/80 hover:bg-space-850 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="w-8 h-8 rounded-lg bg-space-950/80 hover:bg-space-850 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bio in Darker Inner Panel */}
        <p className="text-xs text-slate-300 leading-relaxed bg-space-950/70 p-3.5 rounded-xl border border-white/5">
          {member.bio}
        </p>

        {/* Primary Focus */}
        <div className="text-xs font-mono text-slate-400">
          Primary Focus:{" "}
          <span className="text-astro-cyan font-medium">
            {member.primaryFocus}
          </span>
        </div>

        {/* Key Hackathon Contributions */}
        {!compact && (
          <div className="space-y-2 pt-2 border-t border-space-850">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Key Hackathon Contributions:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {member.contributions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
