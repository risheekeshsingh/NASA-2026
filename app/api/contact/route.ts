import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting map: IP -> { count: number, resetTime: number }
const contactRateLimits = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const now = Date.now();
    const limitWindow = 10 * 60 * 1000; // 10 minutes
    const maxRequests = 5;

    // Clean expired entries
    contactRateLimits.forEach((record, storedIp) => {
      if (now > record.resetTime) {
        contactRateLimits.delete(storedIp);
      }
    });

    const userRecord = contactRateLimits.get(ip);
    if (userRecord && now < userRecord.resetTime) {
      if (userRecord.count >= maxRequests) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many messages sent. Please wait before submitting again.",
          },
          { status: 429 }
        );
      }
      userRecord.count++;
    } else {
      contactRateLimits.set(ip, { count: 1, resetTime: now + limitWindow });
    }

    // 2. Parse & validate body
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (maximum 3000 characters)." },
        { status: 400 }
      );
    }

    const messageId = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Log internally (safe for production without throwing)
    console.log(`[FlameLens Contact] Received message ${messageId} from ${name.trim()} (${email.trim()}) on topic: ${topic || "General"}`);

    return NextResponse.json({
      success: true,
      messageId,
      timestamp: new Date().toISOString(),
      note: "Thank you for contacting the FlameLens team. We will review your message shortly.",
    });
  } catch (err: unknown) {
    console.error("[FlameLens Contact Error]", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing contact submission.",
      },
      { status: 500 }
    );
  }
}
