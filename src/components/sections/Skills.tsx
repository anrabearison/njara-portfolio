import { useI18n } from "@/lib/i18n/index";
import { Reveal } from "../animations/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { SKILL_GROUPS } from "@/constants/skills";

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow={t("skills.eyebrow")} title={t("skills.title")} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.titleKey} delay={i * 80}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF]/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.18)]">
                  <div
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(0,212,255,0.12), transparent 60%)",
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{t(g.titleKey)}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
