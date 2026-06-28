import { createServerFn } from "@tanstack/react-start";

import { getServerConfig } from "../config.server";
import { contactSchema } from "./contact.schema";

/**
 * Server function that sends a contact email via the Resend REST API.
 * Called from the Contact form component — runs server-only.
 */
export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    // Honeypot check — silently reject bots without revealing why
    if (data.honeypot && data.honeypot.length > 0) {
      return { success: true as const }; // fake success for bots
    }

    const config = getServerConfig();
    const apiKey = config.resendApiKey;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false as const,
        error: "Server configuration error. Please try again later.",
      };
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
          text: [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            "",
            "Message:",
            data.message,
          ].join("\n"),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Resend API error:", response.status, errorBody);
        return {
          success: false as const,
          error: "Failed to send email. Please try again later.",
        };
      }

      return { success: true as const };
    } catch (err) {
      console.error("Resend fetch error:", err);
      return {
        success: false as const,
        error: "Network error. Please try again later.",
      };
    }
  });
