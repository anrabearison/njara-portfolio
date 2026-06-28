type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
};

function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body;

  try {
    return JSON.parse(body);
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseContactPayload(body: unknown): ContactPayload | undefined {
  const parsedBody = parseBody(body);
  if (!isRecord(parsedBody)) return undefined;

  const payload = {
    name: readString(parsedBody.name),
    email: readString(parsedBody.email),
    message: readString(parsedBody.message),
    honeypot: readString(parsedBody.honeypot),
  };

  if (!payload.name || payload.name.length > 100) return undefined;
  if (!payload.email || payload.email.length > 255 || !payload.email.includes("@")) {
    return undefined;
  }
  if (!payload.message || payload.message.length > 2000) return undefined;
  if (payload.honeypot.length > 0) return payload;

  return payload;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  const data = parseContactPayload(req.body);
  if (!data) {
    return res.status(400).json({ success: false, error: "Invalid contact form data." });
  }

  // Honeypot check: pretend success so bots do not get a useful signal.
  if (data.honeypot) {
    return res.status(200).json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(500).json({
      success: false,
      error: "Server configuration error. Please try again later.",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "rabearisonnjara@gmail.com",
        subject: `Contact from Portfolio - ${data.name}`,
        reply_to: data.email,
        text: [`Name: ${data.name}`, `Email: ${data.email}`, "", "Message:", data.message].join(
          "\n",
        ),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Resend API error:", response.status, errorBody);
      return res.status(502).json({
        success: false,
        error: "Failed to send email. Please try again later.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend fetch error:", error);
    return res.status(502).json({
      success: false,
      error: "Network error. Please try again later.",
    });
  }
}
