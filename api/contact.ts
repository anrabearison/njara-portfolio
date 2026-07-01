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
  subject: string;
  subjectOther: string;
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
    subject: readString(parsedBody.subject),
    subjectOther: readString(parsedBody.subjectOther),
    message: readString(parsedBody.message),
    honeypot: readString(parsedBody.honeypot),
  };

  if (!payload.name || payload.name.length > 100) return undefined;
  if (!payload.email || payload.email.length > 255 || !payload.email.includes("@")) {
    return undefined;
  }
  if (!payload.subject || payload.subject.length > 100) return undefined;
  if (payload.subject === "other" && (!payload.subjectOther || payload.subjectOther.length > 100)) return undefined;
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
    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Indian/Antananarivo",
      dateStyle: "long",
      timeStyle: "short",
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #0D1117; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #00D4FF; margin: 0; font-size: 24px;">Nouveau message depuis votre portfolio</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <p style="color: #666; font-size: 14px; margin-bottom: 30px;">📅 ${timestamp}</p>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nom</p>
            <p style="margin: 0; color: #0D1117; font-size: 16px; font-weight: 500;">${data.name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
            <p style="margin: 0; color: #0D1117; font-size: 16px;">
              <a href="mailto:${data.email}" style="color: #00D4FF; text-decoration: none;">${data.email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Sujet</p>
            <p style="margin: 0; color: #0D1117; font-size: 16px; font-weight: 500;">${data.subject}${data.subjectOther ? ` (${data.subjectOther})` : ""}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 3px solid #00D4FF; border-radius: 4px;">
              <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="margin: 0; color: #999; font-size: 12px;">
              Envoyé depuis <a href="https://njara-rabearison.vercel.app" style="color: #00D4FF; text-decoration: none;">njara-rabearison.vercel.app</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NOUVEAU MESSAGE DEPUIS VOTRE PORTFOLIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 ${timestamp}

Nom: ${data.name}
Email: ${data.email}
Sujet: ${data.subject}${data.subjectOther ? ` (${data.subjectOther})` : ""}

Message:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Envoyé depuis njara-rabearison.vercel.app
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "rabearisonnjara@gmail.com",
        subject: `📧 ${data.subject}${data.subjectOther ? ` (${data.subjectOther})` : ""} - ${data.name} - Portfolio`,
        reply_to: data.email,
        html,
        text,
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
