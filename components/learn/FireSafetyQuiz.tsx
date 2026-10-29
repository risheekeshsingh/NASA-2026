"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/lib/data/quizQuestions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Printer,
  RotateCcw,
  ExternalLink,
  Flame,
  ShieldCheck,
  ChevronRight,
  User,
  Calendar,
} from "lucide-react";

export function FireSafetyQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>("Mission Specialist Candidate");
  const [certificateId] = useState<string>(() => `FL-CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Handle Option Select
  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return; // already answered

    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optionIdx,
    }));
    setShowFeedback((prev) => ({
      ...prev,
      [qIdx]: true,
    }));
  };

  // Next Question or Finish
  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Reset Quiz
  const handleReset = () => {
    setSelectedAnswers({});
    setShowFeedback({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  // Compute Score
  const score = QUIZ_QUESTIONS.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  // Determine Rank Title
  const getRank = () => {
    if (percentage === 100) return { title: "Master Flight Fire Safety Officer", color: "text-emerald-400", badge: "success" };
    if (percentage >= 75) return { title: "Spacecraft Systems Safety Engineer", color: "text-astro-cyan", badge: "cyan" };
    if (percentage >= 50) return { title: "Mission Specialist Candidate", color: "text-amber-400", badge: "warning" };
    return { title: "Flight Safety Trainee (Review Recommended)", color: "text-red-400", badge: "danger" };
  };

  const rank = getRank();

  // Print Handler
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8">
      {!isCompleted ? (
        /* QUIZ IN PROGRESS PANEL */
        <div className="bg-space-900/90 border border-space-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" className="font-mono text-xs">
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                </Badge>
                <Badge variant="outline" className="font-mono text-xs text-slate-400">
                  {currentQ.category}
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Microgravity Fire Safety Assessment
              </h2>
            </div>

            {/* Score Progress Pill */}
            <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
              <span>Answered: <strong className="text-white">{answeredCount}/{QUIZ_QUESTIONS.length}</strong></span>
              <span>Score: <strong className="text-ember-400">{score}</strong></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-space-950 h-2 rounded-full overflow-hidden border border-space-800">
            <div
              className="bg-gradient-to-r from-ember-500 to-astro-cyan h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Scenario Context */}
          <div className="bg-space-950/70 border-l-2 border-astro-cyan p-3.5 rounded-r-lg text-xs text-slate-300">
            <span className="text-astro-cyan font-mono font-bold uppercase block text-[10px] tracking-wider mb-0.5">
              Flight Scenario Context
            </span>
            {currentQ.scenario}
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-white font-display leading-snug">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const hasAnswered = selectedAnswers[currentIdx] !== undefined;
              const isCorrect = optIdx === currentQ.correctIndex;

              let btnStyles = "bg-space-950 border-space-800 text-slate-200 hover:bg-space-850 hover:border-space-700";
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyles = "bg-emerald-950/70 border-emerald-500/80 text-emerald-200 shadow-md";
                } else if (isSelected && !isCorrect) {
                  btnStyles = "bg-red-950/70 border-red-500/80 text-red-200";
                } else {
                  btnStyles = "bg-space-950/40 border-space-900 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(currentIdx, optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 ${btnStyles}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border ${
                      hasAnswered
                        ? isCorrect
                          ? "bg-emerald-500 text-space-950 border-emerald-400"
                          : isSelected
                          ? "bg-red-500 text-white border-red-400"
                          : "bg-space-900 text-slate-500 border-space-800"
                        : "bg-space-900 text-slate-300 border-space-800"
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Box */}
          {showFeedback[currentIdx] && (
            <div className="space-y-4 pt-2">
              <div
                className={`p-4 rounded-xl border space-y-2.5 ${
                  selectedAnswers[currentIdx] === currentQ.correctIndex
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : "bg-amber-950/40 border-amber-500/40 text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedAnswers[currentIdx] === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">CORRECT &bull; +1 POINT</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 font-mono">INCORRECT</span>
                      </>
                    )}
                  </div>

                  {/* Flight Experiment Citation Chip */}
                  <Link
                    href={`/experiments/${currentQ.experimentId}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-astro-cyan hover:underline bg-space-950/80 px-2.5 py-1 rounded border border-space-800"
                  >
                    <span>[{currentQ.experimentName.split(" ")[0]}]</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>

              {/* Next Question Button */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="ember"
                  size="md"
                  onClick={handleNext}
                  className="px-6 font-semibold shadow-ember-glow"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Complete & View Certificate"}</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* SCORE CARD & PRINTABLE CERTIFICATE */
        <div className="space-y-8">
          {/* Action Header (Hidden in Print) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-space-900/90 border border-space-800 rounded-xl p-5 print:hidden">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-ember-400" />
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  Assessment Completed: {score} of {QUIZ_QUESTIONS.length} ({percentage}%)
                </h3>
                <span className={`text-xs font-mono font-bold ${rank.color}`}>
                  Awarded Rank: {rank.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button variant="ember" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-1.5" />
                Print Certificate / PDF
              </Button>
              <Button variant="secondary" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Retake Quiz
              </Button>
            </div>
          </div>

          {/* Name Customization Box (Hidden in Print) */}
          <div className="bg-space-950/70 border border-space-850 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-astro-cyan" />
              <span>Customize Certificate Name:</span>
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Your Full Name"
              className="bg-space-900 border border-space-700 px-3.5 py-1.5 rounded-lg text-sm text-white focus:outline-none focus:border-ember-500 font-medium sm:w-80"
            />
          </div>

          {/* FORMAL PRINTABLE CERTIFICATE (Print-Optimized) */}
          <div
            id="flamelens-certificate"
            className="relative bg-space-950 text-white border-4 border-double border-amber-500/60 rounded-2xl p-8 sm:p-12 shadow-2xl print:border-black print:text-black print:bg-white print:p-6 print:shadow-none space-y-6 overflow-hidden"
          >
            {/* Background Security Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none print:opacity-10">
              <Flame className="w-96 h-96 text-ember-500" />
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-amber-500/40 print:border-black pb-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-ember-500" />
                <span className="text-xs font-mono tracking-widest uppercase text-ember-400 print:text-black font-bold">
                  NASA Space Apps Challenge &bull; FlameLens Physical Science
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-ember-500" />
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white print:text-black uppercase tracking-wider">
                Certificate of Completion
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-400 print:text-gray-600">
                Microgravity Combustion & Human Spaceflight Fire Safety Curriculum
              </p>
            </div>

            {/* Candidate Presentation */}
            <div className="text-center space-y-3 py-4">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 print:text-gray-600">
                This certifies that
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-amber-300 print:text-black underline underline-offset-8 decoration-amber-500/50">
                {candidateName || "Mission Specialist Candidate"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 print:text-gray-700 max-w-2xl mx-auto leading-relaxed pt-2">
                has successfully demonstrated quantitative understanding of microgravity combustion physics, low-speed flammability boundaries, cool flames, and spacecraft fire suppression protocols derived from orbital flight experiments.
              </p>
            </div>

            {/* Score & Rank Seal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-space-850 print:border-gray-300 py-6 text-center">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 print:text-gray-600 uppercase tracking-wider block">
                  Examination Score
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white print:text-black">
                  {score} / {QUIZ_QUESTIONS.length} ({percentage}%)
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 print:text-gray-600 uppercase tracking-wider block">
                  Conferred Designation
                </span>
                <span className="text-base sm:text-lg font-bold font-display text-ember-400 print:text-black block">
                  {rank.title}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 print:text-gray-600 uppercase tracking-wider block">
                  Verification Code
                </span>
                <span className="text-xs sm:text-sm font-mono text-astro-cyan print:text-black font-bold block">
                  {certificateId}
                </span>
              </div>
            </div>

            {/* Signatures & Certification Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-xs font-mono text-slate-400 print:text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="border-t border-slate-600 print:border-black w-48 mx-auto sm:ml-auto pt-1 font-semibold text-slate-200 print:text-black">
                  FlameLens Physical Sciences Board
                </div>
                <div className="text-[10px] text-slate-500">
                  Decision-Support Heuristic Verification
                </div>
              </div>
            </div>
          </div>

          {/* Question Review Section (Hidden in Print) */}
          <div className="space-y-4 print:hidden">
            <h3 className="text-lg font-bold font-display text-white">
              Assessment Answers Review
            </h3>

            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCorrect = selectedAnswers[idx] === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs sm:text-sm flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isCorrect
                        ? "bg-space-950/80 border-emerald-900/50 text-slate-200"
                        : "bg-space-950/80 border-red-900/50 text-slate-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                        <span className="font-bold text-white">
                          Question {idx + 1}: {q.question}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        Correct: <strong className="text-emerald-400">{q.options[q.correctIndex]}</strong>
                      </p>
                    </div>

                    <Link
                      href={`/experiments/${q.experimentId}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-astro-cyan hover:underline pl-6 md:pl-0 shrink-0"
                    >
                      <span>Evidence: [{q.experimentName.split(" ")[0]}]</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
