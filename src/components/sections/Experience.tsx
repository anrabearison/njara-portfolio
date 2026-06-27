import { Briefcase } from "lucide-react";
import { useI18n, EXPERIENCE_I18N } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const { t, lang } = useI18n();
  const items = EXPERIENCE_I18N[lang];
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow={t("exp.eyebrow")} title={t("exp.title")} />
        </Reveal>
        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0,212,255,0.5), rgba(124,58,237,0.5), transparent)",
            }}
          />
          <ol className="space-y-10">
            {items.map((e, i) => (
              <li key={i} className="relative md:grid md:grid-cols-2 md:gap-12">
                <Reveal
                  delay={60}
                  className={
                    i % 2 === 0
                      ? "md:col-start-1 md:pr-8 md:text-right"
                      : "md:col-start-2 md:pl-8"
                  }
                >
                  <div className="relative ml-12 md:ml-0">
                    <span
                      aria-hidden
                      className={`absolute top-3 grid h-8 w-8 place-items-center rounded-full border border-[#00D4FF]/40 bg-[#0D1117] text-xs font-bold text-[#00D4FF] ${
                        i % 2 === 0
                          ? "-left-12 md:left-auto md:-right-[3.25rem]"
                          : "-left-12 md:-left-[3.25rem]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-all hover:border-[#7C3AED]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00D4FF]">
                        <Briefcase className="h-3.5 w-3.5" />
                        {e.period}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold">{e.role}</h3>
                      <div className="text-sm text-muted-foreground">{e.company}</div>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {e.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00D4FF]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
