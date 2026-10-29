import React from "react";
import Link from "next/link";
import { DATA_SOURCES } from "@/lib/data/dataSources";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Badge } from "@/components/ui/Badge";
import {
  Database,
  ExternalLink,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  FileText,
  Search,
} from "lucide-react";

export default function DataSourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">
              <Database className="w-3.5 h-3.5" />
              Open Science & Datasets
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              {EXPERIMENTS.length} Harmonized Experiments &bull; {DATA_SOURCES.length} Repositories
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Data Sources & Scientific Attribution
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-3xl leading-relaxed">
            Every dataset, mission archive, flight technical report, and public API ingested into the FlameLens microgravity fire safety intelligence platform.
          </p>
        </div>

        {/* Mandatory Attribution Notice */}
        <div className="inline-flex items-center gap-2 p-3.5 rounded-xl bg-space-900 border border-space-800 text-xs font-mono text-slate-300 max-w-md shadow-lg">
          <Info className="w-4 h-4 text-astro-cyan shrink-0" />
          <span>
            Data courtesy of NASA. Not affiliated with or endorsed by NASA.
          </span>
        </div>
      </div>

      {/* Main Datasets Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-space-850 pb-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-ember-400" />
            <h2 className="text-xl font-bold font-display text-white">
              Ingested Sources, Repositories & APIs
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click links to inspect raw repositories
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-space-800 bg-space-950/80">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="border-b border-space-800 bg-space-900/80 text-xs font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 font-semibold w-64">Source & Provider</th>
                <th className="py-3.5 px-4 font-semibold w-72">What We Used It For</th>
                <th className="py-3.5 px-4 font-semibold w-72">Processing & Normalization</th>
                <th className="py-3.5 px-4 font-semibold">Known Limitations</th>
                <th className="py-3.5 px-4 font-semibold text-right w-28">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-space-850 text-xs">
              {DATA_SOURCES.map((src) => (
                <tr key={src.id} className="hover:bg-space-900/40 transition-colors">
                  {/* Source Name & Provider */}
                  <td className="py-4 px-4 align-top space-y-1">
                    <span className="font-bold text-white text-sm font-display block">
                      {src.name}
                    </span>
                    <span className="text-astro-cyan font-mono text-[11px] block">
                      {src.provider}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono mt-1">
                      {src.category}
                    </Badge>
                  </td>

                  {/* Used For */}
                  <td className="py-4 px-4 align-top text-slate-300 leading-relaxed">
                    {src.usedFor}
                  </td>

                  {/* Processing Done */}
                  <td className="py-4 px-4 align-top text-slate-300 leading-relaxed bg-space-900/20">
                    <span className="font-mono text-[10px] uppercase text-ember-400 block mb-0.5 font-bold">
                      Normalization:
                    </span>
                    {src.processingDone}
                  </td>

                  {/* Limitations */}
                  <td className="py-4 px-4 align-top text-slate-400 leading-relaxed italic">
                    {src.limitations}
                  </td>

                  {/* Link & Date */}
                  <td className="py-4 px-4 align-top text-right whitespace-nowrap space-y-1.5">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-ember-400 hover:text-ember-300 hover:underline"
                    >
                      <span>Visit Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      Accessed: {src.accessDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Known Limitations and How to Verify */}
      <section className="bg-space-900/80 border border-space-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-space-850 pb-3 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Known Dataset Limitations & Verification Guidelines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3 bg-space-950/60 p-5 rounded-xl border border-space-850">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Dataset Boundaries & Caveats
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 shrink-0">&bull;</span>
                <span>
                  <strong>Sparse Flight Hours:</strong> Physical microgravity combustion tests are exceptionally scarce due to flight manifest constraints. Results are compiled from targeted test runs rather than continuous years-long sensor logs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 shrink-0">&bull;</span>
                <span>
                  <strong>Uncrewed vs Crewed Scale:</strong> Spacecraft-scale fires (0.4 × 1.0 m) have only been executed inside uncrewed departing Cygnus freighters (Saffire). Tests inside crewed stations (CIR, Kibo MSPR) are strictly confined to 100-liter or glovebox chambers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 shrink-0">&bull;</span>
                <span>
                  <strong>Sensor Disparities:</strong> Older payloads (Skylab, Mir, early Shuttle MSL-1) relied on 35mm film or standard analog video, whereas modern CIR and Mengtian CEC rigs use high-speed Schlieren imaging and laser spectrometers.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 bg-space-950/60 p-5 rounded-xl border border-space-850">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              How to Verify Independent Findings
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Cross-Check NTRS:</strong> Query the NASA Technical Reports Server (ntrs.nasa.gov) using the principal investigator name and experiment acronym (e.g., &quot;Saffire Urban Ferkul&quot;).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Consult NASA-STD-6001B:</strong> Cross-reference materials flammability ratings with published test records from the White Sands Test Facility (WSTF).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Primary Research DOI:</strong> Every experiment in the FlameLens catalog links directly to the peer-reviewed flight source page or PSI dataset entry.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Methodology of the Fire-Risk Ranking Model */}
      <section className="bg-space-900/80 border border-space-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-space-850 pb-3 text-astro-cyan">
          <Scale className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Methodology: Transparent Multi-Criteria Ranking Model
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            The FlameLens ranking algorithm computes a normalized Composite Fire-Risk Index (0 to 100) per experiment using an explainable, linear additive multi-criteria model. Rather than relying on black-box neural networks, every component score is mathematically derived from physical parameters and flight observations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {/* Component 1 */}
            <div className="bg-space-950 p-4 rounded-xl border border-space-850 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-ember-400 font-bold block">
                Dimension 01 (Default 35%)
              </span>
              <h4 className="text-sm font-bold text-white">Fire-Risk Severity</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates flame spread rate, ease of ignition under low ventilation (5–15 cm/s), polymer flammability, and high-pressure oxygen hazard.
              </p>
            </div>

            {/* Component 2 */}
            <div className="bg-space-950 p-4 rounded-xl border border-space-850 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-astro-cyan font-bold block">
                Dimension 02 (Default 25%)
              </span>
              <h4 className="text-sm font-bold text-white">Exploration Relevance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scores applicability to Artemis Moon base camps (34% O2, 8.2 psia) and Mars transit vehicles compared to Earth-like 21% O2 baselines.
              </p>
            </div>

            {/* Component 3 */}
            <div className="bg-space-950 p-4 rounded-xl border border-space-850 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Dimension 03 (Default 20%)
              </span>
              <h4 className="text-sm font-bold text-white">Evidence Strength</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Weights flight campaign confidence, open-access public dataset availability, repeat runs, and peer-reviewed sensor instrumentation.
              </p>
            </div>

            {/* Component 4 */}
            <div className="bg-space-950 p-4 rounded-xl border border-space-850 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                Dimension 04 (Default 20%)
              </span>
              <h4 className="text-sm font-bold text-white">Suppression Insight Value</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quantifies lessons learned for active fire protection, fine water mist effectiveness, depressurization limits, and cool flame prevention.
              </p>
            </div>
          </div>

          <div className="bg-space-950/70 p-4 rounded-xl border border-space-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <span>
              Users can interactively adjust weights from 0% to 100% on the Rankings page to re-rank the leaderboard live.
            </span>
            <Link
              href="/rankings"
              className="text-ember-400 hover:text-ember-300 hover:underline shrink-0 font-bold"
            >
              Open Live Rankings Engine &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
