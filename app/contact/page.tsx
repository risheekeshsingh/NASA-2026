"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  MessageSquare,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [topic, setTopic] = useState("Research Collaboration");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ messageId: string; timestamp: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Client Validations
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage("Message must be at least 10 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim(),
          topic,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message. Please try again.");
      }

      setSuccessData({
        messageId: data.messageId,
        timestamp: data.timestamp,
      });

      // Clear Form
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="cyan">
            <Mail className="w-3.5 h-3.5" />
            Connect With FlameLens
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Open Inquiry Channel
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Contact the Team &amp; Inquire
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Questions regarding microgravity datasets, Artemis habitat modeling, or collaborating on future CFD and Bayesian UQ modules? Send us a note.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-space-900/90 border border-space-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {successData ? (
          /* SUCCESS STATE */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold font-display text-white">
                Message Dispatched Successfully!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for reaching out. The FlameLens research team has logged your inquiry.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-space-800 text-xs font-mono text-slate-400 max-w-sm mx-auto space-y-1">
              <div>Reference ID: <strong className="text-astro-cyan">{successData.messageId}</strong></div>
              <div>Logged At: <span>{new Date(successData.timestamp).toLocaleTimeString()} UTC</span></div>
            </div>

            <Button
              variant="outline"
              size="md"
              onClick={() => setSuccessData(null)}
              className="mt-2"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          /* CONTACT FORM */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Your Name <span className="text-ember-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Commander Sarah Connor"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-space-950 border border-space-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address <span className="text-ember-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.connor@space-agency.gov"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-space-950 border border-space-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Organization / Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Organization / University
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Lunar Gateway Lab / MIT"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-space-950 border border-space-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>

              {/* Inquiry Topic */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  Inquiry Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-space-950 border border-space-800 text-sm text-white focus:outline-none focus:border-ember-500 transition-colors"
                >
                  <option value="Research Collaboration">Research &amp; Dataset Collaboration</option>
                  <option value="Artemis Modeling">Artemis Habitat Atmosphere Modeling</option>
                  <option value="Open Source Code">Open-Source Code &amp; Algorithms</option>
                  <option value="Hackathon Feedback">Space Apps Feedback &amp; Judging</option>
                  <option value="General Inquiry">General Space Safety Inquiry</option>
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                Your Message <span className="text-ember-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={3000}
                placeholder="Describe your inquiry, proposed dataset contribution, or operational feedback..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-space-950 border border-space-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ember-500 transition-colors"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Minimum 10 characters</span>
                <span>{message.length} / 3000</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="ember"
                size="md"
                isLoading={isLoading}
                className="font-semibold px-8 shadow-ember-glow"
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Transmit Message</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
