import React from "react";
import type { Metadata } from "next";
import { TeamSection } from "@/components/team/TeamSection";

export const metadata: Metadata = {
  title: "Meet the Project Team | FlameLens",
  description:
    "Meet the multidisciplinary student and engineering team behind FlameLens for NASA Space Apps Challenge.",
};

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TeamSection />
    </div>
  );
}
