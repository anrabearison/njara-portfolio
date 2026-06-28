import { useState, useCallback } from "react";
import { Github, Linkedin, MessageCircle, Send, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n/index";
import { Reveal } from "../animations/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { Field } from "../common/Field";
import { CONTACT_CARDS, SOCIAL_LINKS } from "@/constants/contact";

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const email = fd.get("email");
    const msg = fd.get("message");
    const subject = `${t("contact.subject")} - ${String(name)}`;
    const mailtoUrl = `mailto:rabearisonnjara@gmail.com?subject=${encodeURIComponent(subject)}&body=Email:%20${encodeURIComponent(String(email))}%0A%0A${encodeURIComponent(String(msg))}`;
    window.location.href = mailtoUrl;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    (e.target as HTMLFormElement).reset();
  }, [t]);

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
                  const Icon = social.name === "GitHub" ? Github : social.name === "LinkedIn" ? Linkedin : social.name === "Gmail" ? Mail : MessageCircle;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
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
                <Field label={t("contact.form.name")} name="name" type="text" required maxLength={100} />
                <Field label={t("contact.form.email")} name="email" type="email" required maxLength={255} />
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
              <button
                type="submit"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.55)]"
              >
                <Send className="h-4 w-4" />
                {t("contact.form.send")}
              </button>
              {sent && (
                <div className="mt-4 text-sm text-[#4ade80]">
                  {t("contact.form.sent")}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
