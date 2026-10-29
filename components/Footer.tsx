import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Shield, Award } from "lucide-react";
import { EXPERIMENTS } from "@/lib/data/experiments";

export function Footer() {
  return (
    <footer className="w-full border-t border-space-800 bg-space-950/90 backdrop-blur-md text-slate-400 py-10 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo size={34} />
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              FlameLens translates decades of NASA microgravity combustion research from ISS experiments
              (ACME, FLEX-2, BASS-II, SOFIE) into predictive fire safety intelligence for Moon, Mars,
              and deep-space orbital habitats.
            </p>
          </div>

          {/* Research & Analytics Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-display">
              Research &amp; Intelligence
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/experiments" className="hover:text-ember-400 transition-colors">
                  Experiments Catalog ({EXPERIMENTS.length})
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-ember-400 transition-colors">
                  Fire-Risk Rankings
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-ember-400 transition-colors">
                  Multi-Experiment Comparison
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-ember-400 transition-colors flex items-center gap-1.5">
                  <span>AI Fire-Safety Assistant</span>
                  <span className="text-[10px] font-mono bg-ember-500/20 text-ember-400 px-1 rounded">AI</span>
                </Link>
              </li>
              <li>
                <Link href="/safety-guide" className="hover:text-ember-400 transition-colors">
                  Fire Safety Guide
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-ember-400 transition-colors text-astro-cyan flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Learn Mode &amp; Quiz</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon Project & Standards Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-display">
              Space Apps &amp; Project
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-ember-400 transition-colors">
                  About FlameLens
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-ember-400 transition-colors">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-ember-400 transition-colors">
                  Roadmap &amp; Future Work
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="hover:text-ember-400 transition-colors">
                  Data Sources &amp; Attribution
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ember-400 transition-colors">
                  Contact &amp; Inquiries
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                <Shield className="w-3 h-3 text-ember-500" />
                NASA-STD-6001B Aligned
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
