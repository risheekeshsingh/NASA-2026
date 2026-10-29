import React from "react";
import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-space-800 bg-space-900/80 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-full bg-ember-500/10 border border-ember-500/30 flex items-center justify-center text-ember-400 mx-auto mb-4">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-ember-400 font-semibold">
          Error 404 &bull; Orbit Deviation
        </span>
        <h1 className="text-3xl font-bold font-display text-white mt-2 mb-3">
          Coordinates Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          The requested microgravity combustion dataset or research module is not in orbit or has been relocated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Return to Mission Control
            </Button>
          </Link>
          <Link href="/experiments" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Experiments
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
