import React from "react";
import { AGENCY_COMPARISON_DATA, AgencyComparisonEntry } from "@/lib/data/agencies";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, AlertCircle, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

export function AgencyComparisonTable() {
  return (
    <div className="bg-space-900/90 border border-space-800 rounded-xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Comparative Safety Governance
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Cross-Agency Fire Safety Standards & Testing Approaches
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Systematic comparison of material screening standards, testing philosophies, and suppression architectures.
          </p>
        </div>

        {/* Mandatory Flag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-mono shrink-0">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Summarized from public information, verify before relying</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-space-800 bg-space-950/80">
        <table className="w-full text-left border-collapse min-w-[840px]">
          <thead>
            <tr className="border-b border-space-800 bg-space-900/70 text-xs font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 font-semibold">Agency</th>
              <th className="py-3.5 px-4 font-semibold">Primary Standard</th>
              <th className="py-3.5 px-4 font-semibold">Testing Philosophy</th>
              <th className="py-3.5 px-4 font-semibold">In-Flight Suppression</th>
              <th className="py-3.5 px-4 font-semibold">Exploration Atmosphere Readiness</th>
              <th className="py-3.5 px-4 font-semibold text-right">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-space-850 text-xs">
            {AGENCY_COMPARISON_DATA.map((entry) => (
              <tr key={entry.agency} className="hover:bg-space-900/40 transition-colors">
                {/* Agency */}
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-white text-sm font-mono flex items-center gap-1.5">
                    {entry.agency}
                  </div>
                  <div className="text-[11px] text-slate-400 max-w-[160px] mt-0.5 line-clamp-2">
                    {entry.fullName}
                  </div>
                </td>

                {/* Primary Standard */}
                <td className="py-4 px-4 align-top font-mono">
                  <span className="text-astro-cyan font-semibold block text-xs">
                    {entry.primaryStandard}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Screening & Offgassing
                  </span>
                </td>

                {/* Testing Philosophy */}
                <td className="py-4 px-4 align-top text-slate-300 max-w-xs leading-relaxed">
                  {entry.testingPhilosophy}
                </td>

                {/* In-Flight Suppression */}
                <td className="py-4 px-4 align-top text-slate-300 max-w-xs leading-relaxed">
                  <span className="text-ember-400 font-medium block">
                    {entry.inFlightSuppressionDoctrine.split(",")[0]}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {entry.inFlightSuppressionDoctrine.split(",").slice(1).join(",")}
                  </span>
                </td>

                {/* Exploration Atmosphere Readiness */}
                <td className="py-4 px-4 align-top max-w-[200px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Badge
                      variant={
                        entry.explorationReadinessScore === "Operational"
                          ? "cyan"
                          : entry.explorationReadinessScore === "Harmonized"
                          ? "outline"
                          : "ember"
                      }
                      className="text-[10px] uppercase font-mono py-0.5 px-2"
                    >
                      {entry.explorationReadinessScore}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {entry.explorationAtmosphereNote}
                  </p>
                </td>

                {/* Profile Link */}
                <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                  <Link
                    href={`/agencies/${entry.agency.toLowerCase()}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-ember-400 hover:text-ember-300 hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footnote Notice */}
      <div className="text-[11px] text-slate-400 italic bg-space-950 p-3 rounded-lg border border-space-850 flex items-center justify-between flex-wrap gap-2">
        <span>
          * Note: Standard titles, testing codes, and suppression procedures are derived from published civil space documents.
        </span>
        <span className="text-astro-cyan font-mono font-medium">
          Verify against current revision releases before engineering usage.
        </span>
      </div>
    </div>
  );
}
