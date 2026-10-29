"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Flame,
  Search,
  Filter,
  X,
  LayoutGrid,
  Table as TableIcon,
  Download,
  RotateCcw,
  Bookmark,
  ExternalLink,
  Eye,
  SlidersHorizontal,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Experiment, Agency, Platform, FuelType, GravityLevel } from "@/types";
import { useBookmarks } from "@/context/BookmarkContext";
import { KeyTakeawaysBox } from "@/components/KeyTakeawaysBox";

function ExperimentsContent() {
  const searchParams = useSearchParams();
  const agencyQuery = searchParams.get("agency");
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

  // Filters State
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [, startTransition] = React.useTransition();

  // 250ms debounce for search input
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setSearchTerm(searchInput);
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const [selectedAgency, setSelectedAgency] = useState<string>("ALL");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("ALL");

  useEffect(() => {
    if (agencyQuery) {
      const validAgencies = ["NASA", "ESA", "JAXA", "CSA", "Roscosmos", "CNSA", "Multi"];
      const matched = validAgencies.find((a) => a.toLowerCase() === agencyQuery.toLowerCase());
      if (matched) {
        setSelectedAgency(matched);
      }
    }
  }, [agencyQuery]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("ALL");
  const [selectedGravity, setSelectedGravity] = useState<string>("ALL");
  const [selectedConfidence, setSelectedConfidence] = useState<string>("ALL");
  const [selectedDataAccess, setSelectedDataAccess] = useState<string>("ALL");
  const [minYear, setMinYear] = useState<number>(1999);
  const [maxYear, setMaxYear] = useState<number>(2025);
  const [sortBy, setSortBy] = useState<string>("yearDesc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState<boolean>(false);

  // Extract all distinct material names
  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    EXPERIMENTS.forEach((e) => {
      e.materials.forEach((m) => {
        // Extract basic names (e.g. PMMA, Nomex, Heptane, Methane)
        if (m.toLowerCase().includes("pmma") || m.toLowerCase().includes("acrylic")) set.add("PMMA");
        if (m.toLowerCase().includes("cotton") || m.toLowerCase().includes("sibal")) set.add("Cotton / Sibal");
        if (m.toLowerCase().includes("nomex")) set.add("Nomex");
        if (m.toLowerCase().includes("heptane") || m.toLowerCase().includes("decane")) set.add("Hydrocarbon Droplets");
        if (m.toLowerCase().includes("methane") || m.toLowerCase().includes("ethylene")) set.add("Methane / Ethylene Gas");
        if (m.toLowerCase().includes("silicone")) set.add("Silicone");
        if (m.toLowerCase().includes("wire") || m.toLowerCase().includes("etfe") || m.toLowerCase().includes("ptfe")) set.add("Wire Insulation (ETFE/PTFE)");
        if (m.toLowerCase().includes("foam") || m.toLowerCase().includes("polyurethane")) set.add("Polyurethane Foam");
      });
    });
    return Array.from(set).sort();
  }, []);

  // Filtered and Sorted Experiments
  const filteredExperiments = useMemo(() => {
    let list = EXPERIMENTS.filter((exp) => {
      // Bookmark filter
      if (showBookmarksOnly && !bookmarks.includes(exp.id)) {
        return false;
      }

      // Search keyword filter
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesName = exp.name.toLowerCase().includes(query);
        const matchesAcronym = exp.acronym.toLowerCase().includes(query);
        const matchesMaterials = exp.materials.some((m) => m.toLowerCase().includes(query));
        const matchesFindings = exp.keyFindings.some((f) => f.toLowerCase().includes(query));
        const matchesTags = exp.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesAcronym && !matchesMaterials && !matchesFindings && !matchesTags) {
          return false;
        }
      }

      // Dropdown filters
      if (selectedAgency !== "ALL" && exp.agency !== selectedAgency) return false;
      if (selectedPlatform !== "ALL" && exp.platform !== selectedPlatform) return false;
      if (selectedFuelType !== "ALL" && exp.fuelType !== selectedFuelType) return false;
      if (selectedGravity !== "ALL" && exp.gravityLevel !== selectedGravity) return false;
      if (selectedConfidence !== "ALL" && exp.confidence !== selectedConfidence) return false;
      if (selectedDataAccess !== "ALL" && exp.dataAccess !== selectedDataAccess) return false;

      // Material filter
      if (selectedMaterial !== "ALL") {
        const query = selectedMaterial.toLowerCase();
        const matchesMat = exp.materials.some((m) => m.toLowerCase().includes(query.slice(0, 4)));
        if (!matchesMat) return false;
      }

      // Year range filter
      if (exp.yearStart < minYear || (exp.yearEnd || exp.yearStart) > maxYear) {
        return false;
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "yearAsc") return a.yearStart - b.yearStart;
      if (sortBy === "yearDesc") return b.yearStart - a.yearStart;
      if (sortBy === "riskScore") {
        const aRisk = (a.oxygenPercent ?? 21) >= 28 ? 3 : (a.oxygenPercent ?? 21) > 23 ? 2 : 1;
        const bRisk = (b.oxygenPercent ?? 21) >= 28 ? 3 : (b.oxygenPercent ?? 21) > 23 ? 2 : 1;
        return bRisk - aRisk;
      }
      if (sortBy === "relevance") return a.acronym.localeCompare(b.acronym);
      return b.yearStart - a.yearStart;
    });

    return list;
  }, [
    searchTerm,
    selectedAgency,
    selectedPlatform,
    selectedFuelType,
    selectedMaterial,
    selectedGravity,
    selectedConfidence,
    selectedDataAccess,
    minYear,
    maxYear,
    sortBy,
    showBookmarksOnly,
    bookmarks,
  ]);

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm !== "" ||
    selectedAgency !== "ALL" ||
    selectedPlatform !== "ALL" ||
    selectedFuelType !== "ALL" ||
    selectedMaterial !== "ALL" ||
    selectedGravity !== "ALL" ||
    selectedConfidence !== "ALL" ||
    selectedDataAccess !== "ALL" ||
    minYear !== 1999 ||
    maxYear !== 2025 ||
    showBookmarksOnly;

  const handleResetFilters = () => {
    setSearchInput("");
    setSearchTerm("");
    setSelectedAgency("ALL");
    setSelectedPlatform("ALL");
    setSelectedFuelType("ALL");
    setSelectedMaterial("ALL");
    setSelectedGravity("ALL");
    setSelectedConfidence("ALL");
    setSelectedDataAccess("ALL");
    setMinYear(1999);
    setMaxYear(2025);
    setShowBookmarksOnly(false);
  };

  // Export current list as JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredExperiments, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `flamelens_experiments_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export current list as CSV
  const handleExportCsv = () => {
    const headers = [
      "ID",
      "Acronym",
      "Name",
      "Agency",
      "Platform",
      "YearStart",
      "YearEnd",
      "FuelType",
      "OxygenPercent",
      "PressureKPa",
      "ConvectiveVelocityCmS",
      "GravityLevel",
      "Materials",
      "Confidence",
      "DataAccess",
      "SourceUrl",
    ];

    const rows = filteredExperiments.map((e) => [
      `"${e.id}"`,
      `"${e.acronym}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.agency}"`,
      `"${e.platform}"`,
      e.yearStart,
      e.yearEnd ?? "",
      `"${e.fuelType}"`,
      e.oxygenPercent ?? "",
      e.pressureKPa ?? "",
      e.flowVelocityCmS ?? "",
      `"${e.gravityLevel}"`,
      `"${e.materials.join("; ").replace(/"/g, '""')}"`,
      `"${e.confidence}"`,
      `"${e.dataAccess}"`,
      `"${e.sourceUrl}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `flamelens_experiments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ember">
              <Flame className="w-3.5 h-3.5" />
              Microgravity Combustion Catalog
            </Badge>
            <SampleDataBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Exploration Experiments Database
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Query and filter flight telemetry across ISS, Cygnus, Tiangong, and drop-tower combustion investigations.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <Button onClick={handleExportCsv} variant="secondary" size="sm" className="gap-1.5 text-xs">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            Export CSV
          </Button>
          <Button onClick={handleExportJson} variant="secondary" size="sm" className="gap-1.5 text-xs">
            <FileJson className="w-3.5 h-3.5 text-astro-cyan" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Auto-Summary: Executive Key Takeaways */}
      <KeyTakeawaysBox pageContext="experiments" />

      {/* Primary Search Bar & Views */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by experiment acronym, material (e.g. PMMA), findings, or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-space-900 border border-space-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  setSearchTerm("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Shortlist Filter Tab */}
            <button
              type="button"
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                showBookmarksOnly
                  ? "bg-ember-500/20 text-ember-400 border-ember-500/40 shadow-ember-glow"
                  : "bg-space-900 text-slate-300 border-space-800 hover:text-white"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? "fill-ember-400" : ""}`} />
              <span>Shortlisted ({bookmarks.length})</span>
            </button>

            {/* Toggle Advanced Filters Button */}
            <Button
              type="button"
              onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}
              variant={advancedFiltersOpen ? "primary" : "secondary"}
              size="sm"
              className="py-2.5 px-3 rounded-xl gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </Button>

            {/* Grid / Table Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-space-900 border border-space-800">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === "grid" ? "bg-space-800 text-ember-400 font-bold" : ""
                }`}
                title="Grid View"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors ${
                  viewMode === "table" ? "bg-space-800 text-ember-400 font-bold" : ""
                }`}
                title="Table View"
                aria-label="Table view"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns Bar */}
        <div className={`p-4 rounded-2xl bg-space-900/80 border border-space-800 space-y-4 ${advancedFiltersOpen ? "block" : "hidden sm:block"}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {/* Agency */}
            <div>
              <label htmlFor="filter-agency" className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Agency
              </label>
              <select
                id="filter-agency"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="w-full bg-space-950 border border-space-800 rounded-lg p-2 text-white focus:outline-none focus:border-ember-500"
              >
                <option value="ALL">All Agencies</option>
                <option value="NASA">NASA</option>
                <option value="ESA">ESA</option>
                <option value="JAXA">JAXA</option>
                <option value="CNSA">CNSA</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="filter-platform" className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Platform
              </label>
              <select
                id="filter-platform"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full bg-space-950 border border-space-800 rounded-lg p-2 text-white focus:outline-none focus:border-ember-500"
              >
                <option value="ALL">All Platforms</option>
                <option value="ISS">ISS</option>
                <option value="Cygnus">Cygnus</option>
                <option value="Drop tower">Drop Tower</option>
                <option value="Parabolic flight">Parabolic Flight</option>
                <option value="Tiangong">Tiangong</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label htmlFor="filter-fuel" className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Fuel Type
              </label>
              <select
                id="filter-fuel"
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="w-full bg-space-950 border border-space-800 rounded-lg p-2 text-white focus:outline-none focus:border-ember-500 capitalize"
              >
                <option value="ALL">All Fuel Types</option>
                <option value="solid">Solid</option>
                <option value="gas">Gas</option>
                <option value="droplet">Droplet</option>
                <option value="smoldering">Smoldering</option>
              </select>
            </div>

            {/* Material */}
            <div>
              <label htmlFor="filter-material" className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Material Substrate
              </label>
              <select
                id="filter-material"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full bg-space-950 border border-space-800 rounded-lg p-2 text-white focus:outline-none focus:border-ember-500"
              >
                <option value="ALL">All Materials</option>
                {allMaterials.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            {/* Gravity Level */}
            <div>
              <label htmlFor="filter-gravity" className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Gravity Level
              </label>
              <select
                id="filter-gravity"
                value={selectedGravity}
                onChange={(e) => setSelectedGravity(e.target.value)}
                className="w-full bg-space-950 border border-space-800 rounded-lg p-2 text-white focus:outline-none focus:border-ember-500 capitalize"
              >
                <option value="ALL">All Gravities</option>
                <option value="microgravity">Microgravity (0-g)</option>
                <option value="lunar">Lunar (0.16-g)</option>
                <option value="martian">Martian (0.38-g)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sort-by" className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Sort Results
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-space-950 border border-space-800 rounded-lg p-2 text-white focus:outline-none focus:border-ember-500"
              >
                <option value="yearDesc">Newest First</option>
                <option value="yearAsc">Oldest First</option>
                <option value="riskScore">Highest Risk Score</option>
                <option value="relevance">Acronym (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Year Range, Confidence, Data Access */}
          <div className="pt-2 border-t border-space-850 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">Year Range:</span>
                <input
                  type="number"
                  min={1999}
                  max={2025}
                  value={minYear}
                  onChange={(e) => setMinYear(Number(e.target.value))}
                  className="w-16 bg-space-950 border border-space-800 rounded p-1 text-center font-mono text-white text-xs"
                />
                <span className="text-slate-500">&ndash;</span>
                <input
                  type="number"
                  min={1999}
                  max={2025}
                  value={maxYear}
                  onChange={(e) => setMaxYear(Number(e.target.value))}
                  className="w-16 bg-space-950 border border-space-800 rounded p-1 text-center font-mono text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[11px]">Confidence:</span>
                {["ALL", "high", "medium"].map((conf) => (
                  <button
                    key={conf}
                    type="button"
                    onClick={() => setSelectedConfidence(conf)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize ${
                      selectedConfidence === conf
                        ? "bg-astro-cyan/20 text-astro-cyan font-bold border border-astro-cyan/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {conf}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <Button
                type="button"
                onClick={handleResetFilters}
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs py-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-mono text-[11px]">Active Filters:</span>
            {searchTerm && (
              <Badge variant="ember" className="gap-1">
                Query: &quot;{searchTerm}&quot;
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    setSearchInput("");
                    setSearchTerm("");
                  }}
                />
              </Badge>
            )}
            {selectedAgency !== "ALL" && (
              <Badge variant="cyan" className="gap-1">
                Agency: {selectedAgency}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedAgency("ALL")} />
              </Badge>
            )}
            {selectedPlatform !== "ALL" && (
              <Badge variant="default" className="gap-1">
                Platform: {selectedPlatform}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPlatform("ALL")} />
              </Badge>
            )}
            {selectedFuelType !== "ALL" && (
              <Badge variant="default" className="gap-1 capitalize">
                Fuel: {selectedFuelType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFuelType("ALL")} />
              </Badge>
            )}
            {selectedMaterial !== "ALL" && (
              <Badge variant="warning" className="gap-1">
                Material: {selectedMaterial}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMaterial("ALL")} />
              </Badge>
            )}
            {selectedGravity !== "ALL" && (
              <Badge variant="default" className="gap-1 capitalize">
                Gravity: {selectedGravity}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGravity("ALL")} />
              </Badge>
            )}
            {showBookmarksOnly && (
              <Badge variant="ember" className="gap-1">
                Shortlisted Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setShowBookmarksOnly(false)} />
              </Badge>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-slate-400 hover:text-ember-400 text-[11px] underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>
          Showing <strong className="text-white">{filteredExperiments.length}</strong> of {EXPERIMENTS.length} investigations
        </span>
        <span>
          {bookmarks.length > 0 && `${bookmarks.length} experiment(s) bookmarked`}
        </span>
      </div>

      {/* Main Content: Card Grid View or Table View */}
      {filteredExperiments.length === 0 ? (
        <div className="text-center py-16 bg-space-900/40 rounded-2xl border border-space-800 space-y-3">
          <Flame className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold font-display text-white">No Matching Investigations Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords, broadening the year range, or clearing active filters.
          </p>
          <Button onClick={handleResetFilters} variant="secondary" size="sm" className="gap-1.5 mt-2">
            <RotateCcw className="w-3 h-3" />
            Reset All Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((exp) => {
            const isCriticalRisk = (exp.oxygenPercent ?? 21) >= 28 || exp.tags.includes("spacecraft-scale");
            const bookmarked = isBookmarked(exp.id);

            return (
              <Card
                key={exp.id}
                glow={isCriticalRisk ? "ember" : "none"}
                className="border-space-800 bg-space-900/80 hover:border-space-700 flex flex-col justify-between transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-ember-400">{exp.acronym}</span>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="cyan" size="sm">
                        {exp.agency}
                      </Badge>
                      <Badge variant="default" size="sm">
                        {exp.platform}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(exp.id)}
                        className={`p-1 rounded-md transition-colors ${
                          bookmarked
                            ? "text-ember-400 hover:text-ember-300"
                            : "text-slate-500 hover:text-white"
                        }`}
                        title={bookmarked ? "Remove bookmark" : "Bookmark this experiment"}
                        aria-label={bookmarked ? `Remove ${exp.acronym} from bookmarks` : `Bookmark ${exp.acronym}`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-ember-400" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <CardTitle className="text-base text-white leading-snug">
                    <Link href={`/experiments/${exp.id}`} className="hover:text-ember-400 transition-colors">
                      {exp.name}
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-slate-400 font-mono">
                    {exp.yearStart} {exp.yearEnd ? `- ${exp.yearEnd}` : ""} &bull; {exp.gravityLevel}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  {/* Key Findings (2 bullets per prompt requirement) */}
                  <div className="p-3 rounded-lg bg-space-950/60 border border-space-850 space-y-1.5 text-xs text-slate-300">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold block">
                      Key Telemetry Findings
                    </span>
                    <ul className="space-y-1">
                      {exp.keyFindings.slice(0, 2).map((bullet, i) => (
                        <li key={i} className="flex items-start gap-1.5 line-clamp-2">
                          <span className="text-astro-cyan mt-0.5">&bull;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conditions & Risk Badge */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="capitalize font-mono text-slate-400">
                      Fuel: <strong className="text-slate-200">{exp.fuelType}</strong>
                    </span>

                    {/* Risk Badge */}
                    <Badge variant={isCriticalRisk ? "ember" : "warning"} size="sm">
                      {isCriticalRisk ? "CRITICAL RISK" : "HIGH RISK"}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="pt-3 border-t border-space-850">
                  <span className="text-[11px] font-mono text-slate-500">
                    {exp.materials.slice(0, 2).join(", ")}
                  </span>
                  <Link href={`/experiments/${exp.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs py-1 px-3">
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-xl border border-space-800 bg-space-900/80 overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-space-800 bg-space-950/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="p-3.5">Acronym</th>
                <th className="p-3.5">Investigation Title</th>
                <th className="p-3.5">Agency</th>
                <th className="p-3.5">Platform</th>
                <th className="p-3.5">Fuel Type</th>
                <th className="p-3.5">Oxygen</th>
                <th className="p-3.5">Years</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-space-850 text-slate-300">
              {filteredExperiments.map((exp) => (
                <tr key={exp.id} className="hover:bg-space-850/50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-ember-400 whitespace-nowrap">
                    {exp.acronym}
                  </td>
                  <td className="p-3.5 font-medium text-white max-w-xs">
                    <Link href={`/experiments/${exp.id}`} className="hover:text-ember-400 transition-colors line-clamp-1">
                      {exp.name}
                    </Link>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <Badge variant="cyan" size="sm">{exp.agency}</Badge>
                  </td>
                  <td className="p-3.5 whitespace-nowrap text-slate-400">
                    {exp.platform}
                  </td>
                  <td className="p-3.5 capitalize whitespace-nowrap">
                    {exp.fuelType}
                  </td>
                  <td className="p-3.5 font-mono whitespace-nowrap">
                    {exp.oxygenPercent ? `${exp.oxygenPercent}% O₂` : "21%"}
                  </td>
                  <td className="p-3.5 font-mono text-slate-400 whitespace-nowrap">
                    {exp.yearStart} {exp.yearEnd ? `- ${exp.yearEnd}` : ""}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleBookmark(exp.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isBookmarked(exp.id) ? "text-ember-400" : "text-slate-500 hover:text-white"
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(exp.id) ? "fill-ember-400" : ""}`} />
                      </button>
                      <Link href={`/experiments/${exp.id}`}>
                        <Button variant="secondary" size="sm" className="text-xs py-1 px-2.5">
                          Inspect
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ExperimentsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="h-28 bg-space-900/60 animate-pulse rounded-xl" />
          <div className="h-96 bg-space-900/60 animate-pulse rounded-xl" />
        </div>
      }
    >
      <ExperimentsContent />
    </Suspense>
  );
}
