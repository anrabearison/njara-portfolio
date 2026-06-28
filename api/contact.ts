import { contactSchema } from "../src/lib/api/contact.schema";

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
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: "Invalid contact form data." });
  }

  const data = parsed.data;

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
