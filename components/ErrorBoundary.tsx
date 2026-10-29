"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, telemetry would log here without crashing the client
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-6 my-6 rounded-2xl border border-red-500/30 bg-space-950/90 text-slate-100 shadow-2xl">
          <div className="max-w-md text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-display text-white mb-2">
              System Telemetry Interrupted
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              A component-level error occurred while processing microgravity data. The rest of the dashboard remains operational.
            </p>
            {this.state.error?.message && (
              <pre className="text-xs bg-space-900 border border-space-800 text-red-300 p-3 rounded-lg w-full mb-6 text-left overflow-x-auto">
                {this.state.error.message}
              </pre>
            )}
            <Button
              onClick={this.handleReset}
              variant="outline"
              size="sm"
              className="gap-2 border-red-500/50 text-red-300 hover:bg-red-500/10"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Component
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
