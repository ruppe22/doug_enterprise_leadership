import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

function isValidEmail(email: string) {
  // Good-enough validation for a contact form.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  // Accept both JSON fetch() submissions and plain HTML form posts.
  const contentType = req.headers.get("content-type") || "";

  let body: Partial<Payload> | null = null;
  if (contentType.includes("application/json")) {
    body = (await req.json().catch(() => null)) as Partial<Payload> | null;
  } else {
    const fd = await req.formData().catch(() => null);
    if (fd) body = Object.fromEntries(fd.entries()) as Partial<Payload>;
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Message is too short." },
      { status: 400 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 400 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;

  // In dev, allow the form to succeed even without delivery configured.
  if (!resendKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] (dev) message received", {
        name,
        email,
        company,
        message,
      });
      return NextResponse.json({
        ok: true,
        message:
          "Message received (dev). Configure RESEND_API_KEY to enable delivery.",
      });
    }

    return NextResponse.json(
      { ok: false, error: "Contact form is not configured." },
      { status: 501 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "Doug@creativebygray.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Doug Ruppert Portfolio <onboarding@resend.dev>";

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

  const subject = `Portfolio contact: ${name}${company ? ` (${company})` : ""}`;

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.5">
      <h2>New message from your portfolio site</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      ${company ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
      <hr />
      <p>${safeMessage}</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[contact] resend failed", res.status, text);
    return NextResponse.json(
      { ok: false, error: "Send failed. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — message sent. I’ll reply soon.",
  });
}
