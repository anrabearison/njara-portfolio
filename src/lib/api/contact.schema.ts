import { z } from "zod";

/**
 * Shared validation schema for the contact form.
 * Used both client-side (early feedback) and server-side (security).
 */
export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  message: z.string().min(1).max(2000),
  /** Honeypot field — must stay empty. Bots that fill it are silently rejected. */
  honeypot: z.string().max(0).optional().default(""),
});

export type ContactFormData = z.infer<typeof contactSchema>;
