import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { PROJECTS } from "@/constants/projects";
import { handleLinkWithFallback } from "@/utils/linkHandler";

export function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.title")} />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF]/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#00D4FF] mb-2">
                    {t(`projects.${p.id}.category`)}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-start justify-between gap-3">
                    <span className="min-w-0 break-words">{t(`projects.${p.id}.title`)}</span>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={p.fallbackLink ? (e) => {
                          e.preventDefault();
                          handleLinkWithFallback(p.link!, p.fallbackLink!);
                        } : undefined}
                        className="shrink-0 text-[#00D4FF] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity mt-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {t(`projects.${p.id}.description`)}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="border-t border-white/5 pt-4 mb-4">
                    <div className="text-xs font-mono text-[#4ade80] font-medium">{t("projects.impact")}</div>
                    <div className="text-xs text-muted-foreground mt-1 italic">
                      {t(`projects.${p.id}.metrics`)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
