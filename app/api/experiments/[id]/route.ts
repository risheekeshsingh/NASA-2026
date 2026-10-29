import { NextResponse } from "next/server";
import { EXPERIMENTS } from "@/lib/data/experiments";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing experiment ID parameter" },
      { status: 400 }
    );
  }

  const experiment = EXPERIMENTS.find(
    (exp) =>
      exp.id.toLowerCase() === id.toLowerCase() ||
      exp.acronym.toLowerCase() === id.toLowerCase()
  );

  if (!experiment) {
    return NextResponse.json(
      {
        success: false,
        error: `Experiment with identifier '${id}' was not found in the flight database.`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: experiment,
    isFallback: false,
    source: "FlameLens Microgravity Combustion Research Database",
  });
}
