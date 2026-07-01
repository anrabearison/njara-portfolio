import { useMemo, useState, type MouseEvent } from "react";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n/index";
import { Reveal } from "../animations/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { Button } from "../ui/button";
import { PROJECTS } from "@/constants/projects";
import { handleLinkWithFallback } from "@/lib/utils/linkHandler";

export function Projects() {
  const { t } = useI18n();
  const [visibleCount, setVisibleCount] = useState(3);

  const orderedProjects = useMemo(
    () => [...PROJECTS].sort((a, b) => a.order - b.order),
    [],
  );

  const visibleProjects = orderedProjects.slice(0, visibleCount);
  const isExpanded = visibleCount >= orderedProjects.length;
  const shouldShowButton = orderedProjects.length > 3;

  const handleToggleMore = (_event: MouseEvent<HTMLButtonElement>) => {
    if (isExpanded) {
      setVisibleCount(3);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setVisibleCount((value) => Math.min(value + 3, orderedProjects.length));
  };

  return (
    <section id="projects" className="border-t border-white/5 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.title")} />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 animate-fade-up hover:-translate-y-1 hover:border-[#00D4FF]/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                <div>
                  <div className="mb-2 text-xs font-mono uppercase tracking-wider text-[#00D4FF]">
                    {t(`projects.${p.id}.category`)}
                  </div>
                  <h3 className="mb-3 flex items-start justify-between gap-3 font-display text-lg font-semibold sm:text-xl">
                    <span className="min-w-0 break-words">{t(`projects.${p.id}.title`)}</span>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={
                          p.fallbackLink
                            ? (e) => {
                                e.preventDefault();
                                handleLinkWithFallback(p.link!, p.fallbackLink!);
                              }
                            : undefined
                        }
                        className="mt-1 shrink-0 text-[#00D4FF] opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {t(`projects.${p.id}.description`)}
                  </p>
                </div>
                <div className="mt-auto">
                  {t(`projects.${p.id}.metrics`) && (
                    <div className="mb-4 border-t border-white/5 pt-4">
                      <div className="text-xs font-mono font-medium text-[#4ade80]">
                        {t("projects.impact")}
                      </div>
                      <div className="mt-1 text-xs italic text-muted-foreground">
                        {t(`projects.${p.id}.metrics`)}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {shouldShowButton && (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="default"
              aria-label={isExpanded ? t("projects.showLessAria") : t("projects.showMoreAria")}
              aria-expanded={isExpanded}
              onClick={handleToggleMore}
              className="border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06]"
            >
              {isExpanded ? t("projects.showLess") : t("projects.showMore")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
