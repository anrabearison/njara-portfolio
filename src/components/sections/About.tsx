import { useI18n } from "@/lib/i18n/index";
import { Reveal } from "../animations/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { PROJECTS } from "@/constants/projects";

export function About() {
  const { t } = useI18n();
  const stats = [
    { value: "12+", labelKey: "about.stat.years" },
    { value: "7", labelKey: "about.stat.companies" },
    { value: String(PROJECTS.length), labelKey: "about.stat.projects" },
  ];
  const langs = [
    { code: "fr", nameKey: "about.lang.french", levelKey: "about.lang.fluent" },
    { code: "gb", nameKey: "about.lang.english", levelKey: "about.lang.technical" },
    { code: "mg", nameKey: "about.lang.malagasy", levelKey: "about.lang.native" },
  ];
  return (
    <section id="about" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="flex flex-col items-center sm:items-start gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00D4FF]/20 to-[#00D4FF]/5 blur-xl transition-opacity group-hover:opacity-100 opacity-60" />
                <img
                  src="/images/profile.jpg"
                  srcSet="/images/profile.jpg 1x, /images/profile@2x.jpg 2x"
                  alt="Photo de profil de Njara Rabearison"
                  className="relative h-48 w-48 rounded-full border-2 border-[#00D4FF]/30 object-cover shadow-2xl transition-all duration-300 group-hover:border-[#00D4FF]/50 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("about.body")}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {langs.map((l) => (
                <span
                  key={l.nameKey}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4"
                >
                  <img
                    src={`https://flagcdn.com/w40/${l.code}.png`}
                    srcSet={`https://flagcdn.com/w80/${l.code}.png 2x`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-white/15"
                  />
                  <span className="font-medium">{t(l.nameKey)}</span>
                  <span className="text-muted-foreground">— {t(l.levelKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.labelKey} delay={i * 120}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#00D4FF]/40 hover:bg-white/[0.04]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00D4FF]/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="flex items-baseline gap-4">
                    <div className="font-display text-5xl font-bold text-gradient">{s.value}</div>
                    <div className="text-sm text-muted-foreground">{t(s.labelKey)}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
