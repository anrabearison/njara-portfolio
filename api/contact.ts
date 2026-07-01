import { z } from "zod";

// Constants
const CONTACT_SCHEMA = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  subject: z.string().min(1).max(100),
  subjectOther: z.string().max(100).optional(),
  message: z.string().min(1).max(2000),
  honeypot: z.string().max(0).optional().default(""),
});

const EMAIL_RECIPIENT = "rabearisonnjara@gmail.com";
const EMAIL_FROM = "Portfolio Contact <onboarding@resend.dev>";
const PORTFOLIO_URL = "https://njara.vercel.app";

// Error messages
const ERROR_MESSAGES = {
  METHOD_NOT_ALLOWED: "Method not allowed.",
  INVALID_DATA: "Invalid contact form data.",
  SERVER_CONFIG: "Server configuration error. Please try again later.",
  EMAIL_FAILED: "Failed to send email. Please try again later.",
  NETWORK_ERROR: "Network error. Please try again later.",
} as const;

// Utility functions
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatSubject(subject: string, subjectOther: string): string {
  return subjectOther ? `${subject} (${subjectOther})` : subject;
}

function generateEmailHtml(data: z.infer<typeof CONTACT_SCHEMA>, timestamp: string): string {
  const sanitizedName = sanitizeHtml(data.name);
  const sanitizedEmail = sanitizeHtml(data.email);
  const sanitizedSubject = sanitizeHtml(formatSubject(data.subject, data.subjectOther || ""));
  const sanitizedMessage = sanitizeHtml(data.message);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #0D1117; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #00D4FF; margin: 0; font-size: 24px;">Nouveau message depuis votre portfolio</h1>
      </div>
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <p style="color: #666; font-size: 14px; margin-bottom: 30px;">📅 ${timestamp}</p>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nom</p>
          <p style="margin: 0; color: #0D1117; font-size: 16px; font-weight: 500;">${sanitizedName}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
          <p style="margin: 0; color: #0D1117; font-size: 16px;">
            <a href="mailto:${sanitizedEmail}" style="color: #00D4FF; text-decoration: none;">${sanitizedEmail}</a>
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Sujet</p>
          <p style="margin: 0; color: #0D1117; font-size: 16px; font-weight: 500;">${sanitizedSubject}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 3px solid #00D4FF; border-radius: 4px;">
            <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
          <p style="margin: 0; color: #999; font-size: 12px;">
            Envoyé depuis <a href="${PORTFOLIO_URL}" style="color: #00D4FF; text-decoration: none;">${PORTFOLIO_URL}</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateEmailText(data: z.infer<typeof CONTACT_SCHEMA>, timestamp: string): string {
  const subject = formatSubject(data.subject, data.subjectOther || "");
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NOUVEAU MESSAGE DEPUIS VOTRE PORTFOLIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 ${timestamp}

Nom: ${data.name}
Email: ${data.email}
Sujet: ${subject}

Message:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Envoyé depuis ${PORTFOLIO_URL}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
}

// Type definitions
type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: ERROR_MESSAGES.METHOD_NOT_ALLOWED });
  }

  // Parse and validate body using Zod
  let body: unknown;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ success: false, error: ERROR_MESSAGES.INVALID_DATA });
  }

  const validationResult = CONTACT_SCHEMA.safeParse(body);
  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error.flatten());
    return res.status(400).json({ success: false, error: ERROR_MESSAGES.INVALID_DATA });
  }

  const data = validationResult.data;

  // Honeypot check: pretend success so bots do not get a useful signal.
  if (data.honeypot) {
    return res.status(200).json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(500).json({
      success: false,
      error: ERROR_MESSAGES.SERVER_CONFIG,
    });
  }

  try {
    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Indian/Antananarivo",
      dateStyle: "long",
      timeStyle: "short",
    });

    const html = generateEmailHtml(data, timestamp);
    const text = generateEmailText(data, timestamp);
    const emailSubject = `📧 ${formatSubject(data.subject, data.subjectOther || "")} - ${data.name} - Portfolio`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: EMAIL_RECIPIENT,
        subject: emailSubject,
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
        error: ERROR_MESSAGES.EMAIL_FAILED,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend fetch error:", error);
    return res.status(502).json({
      success: false,
      error: ERROR_MESSAGES.NETWORK_ERROR,
    });
  }
}
