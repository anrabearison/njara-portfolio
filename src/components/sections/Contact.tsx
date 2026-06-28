import { useState, useCallback } from "react";
import { Github, Linkedin, MessageCircle, Send, Mail, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/index";
import { Reveal } from "../animations/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { Field } from "../common/Field";
import { CONTACT_CARDS, SOCIAL_LINKS } from "@/constants/contact";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("sending");
      setErrorMsg(null);

      const fd = new FormData(e.currentTarget);
      const form = e.currentTarget;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            message: String(fd.get("message") ?? ""),
            honeypot: String(fd.get("honeypot") ?? ""),
          }),
        });
        const result = await response.json();

        if (response.ok && result.success) {
          setStatus("sent");
          form.reset();
          setTimeout(() => setStatus("idle"), 3500);
        } else {
          setStatus("error");
          setErrorMsg(result.error ?? t("contact.form.error"));
        }
      } catch {
        setStatus("error");
        setErrorMsg(t("contact.form.error"));
      }
    },
    [t],
  );

  const isSending = status === "sending";

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {CONTACT_CARDS.map((c, i) => {
              const Icon = c.icon;
              const value = c.labelKey === "contact.location" ? t("hero.location") : c.value;
              const inner = (
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-[#00D4FF]/40 hover:bg-white/[0.04]">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {t(c.labelKey)}
                    </div>
                    <div className="truncate font-medium">{value}</div>
                  </div>
                </div>
              );
              return (
                <Reveal key={c.labelKey} delay={i * 80}>
                  {c.href ? <a href={c.href}>{inner}</a> : inner}
                </Reveal>
              );
            })}

            <Reveal delay={240}>
              <div className="flex gap-3 pt-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon =
                    social.name === "GitHub"
                      ? Github
                      : social.name === "LinkedIn"
                        ? Linkedin
                        : social.name === "Gmail"
                          ? Mail
                          : MessageCircle;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-muted-foreground transition-colors hover:border-[#00D4FF]/40 hover:text-[#00D4FF]"
                      aria-label={social.ariaLabel}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label={t("contact.form.name")}
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                />
                <Field
                  label={t("contact.form.email")}
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                  {t("contact.form.message")}
                </label>
                <textarea
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm outline-none transition-colors focus:border-[#00D4FF]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)]"
                  placeholder={t("contact.form.placeholder")}
                />
              </div>

              {/* Honeypot anti-spam field — visually hidden but accessible to bots */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="honeypot">Do not fill this field</label>
                <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.55)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isSending ? t("contact.form.sending") : t("contact.form.send")}
              </button>

              {status === "sent" && (
                <div className="mt-4 text-sm text-[#4ade80]">{t("contact.form.sent")}</div>
              )}
              {status === "error" && <div className="mt-4 text-sm text-red-400">{errorMsg}</div>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
