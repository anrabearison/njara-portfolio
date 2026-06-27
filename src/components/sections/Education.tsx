import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "../animations/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import eniLogo from "@/assets/logos/eni.png";
import uaLogo from "@/assets/logos/ua.png";
import fccLogo from "@/assets/logos/freecodecamp.svg";
import linkedinLearningLogo from "@/assets/logos/linkedin-learning.png";

export function Education() {
  const { t } = useI18n();
  const items = [
    {
      degreeKey: "edu.master.degree",
      schoolKey: "edu.master.school",
      detailKey: "edu.master.detail",
      schoolUrl: "https://www.eni.mg/",
      logo: eniLogo,
      logoAlt: "Logo de l'École Nationale d'Informatique (ENI) Fianarantsoa",
    },
    {
      degreeKey: "edu.bachelor.degree",
      schoolKey: "edu.bachelor.school",
      detailKey: "edu.bachelor.detail",
      schoolUrl: "https://www.univ-antananarivo.mg/",
      logo: uaLogo,
      logoAlt: "Logo de l'Université d'Antananarivo",
    },
  ];

  const certs = [
    {
      title: "Back End Development and APIs",
      org: "freeCodeCamp",
      url: "https://www.freecodecamp.org/certification/fcc9acfeb56-7d67-44b4-99b1-97956567058a/back-end-development-and-apis",
      icon: fccLogo,
      logoAlt: "Logo de freeCodeCamp",
    },
    {
      title: t("edu.cert.react"),
      org: "LinkedIn Learning",
      url: "https://www.linkedin.com/learning/certificates/3439a96a10c84d85848576c4a72e0a16c1e640af6aca7e73a4f8a2b41e674440?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BYKbJQBYSTOubUKT8Jpz1aw%3D%3D",
      icon: linkedinLearningLogo,
      logoAlt: "Logo de LinkedIn Learning",
    },
  ];
  return (
    <section id="education" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow={t("edu.eyebrow")} title={t("edu.title")} />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((e, i) => (
            <Reveal key={e.degreeKey} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:border-[#00D4FF]/40">
                <a
                  href={e.schoolUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={e.logoAlt}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-white/10 transition-transform hover:scale-105 group-hover:ring-[#00D4FF]/40"
                >
                  <img
                    src={e.logo}
                    alt={e.logoAlt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </a>

                <h3 className="mt-5 font-display text-xl font-semibold">{t(e.degreeKey)}</h3>
                <div className="mt-1 text-sm text-[#00D4FF]">{t(e.schoolKey)}</div>
                <div className="mt-2 text-sm text-muted-foreground">{t(e.detailKey)}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex items-baseline gap-3">
            <h3 className="font-display text-2xl font-bold">{t("edu.certifications")}</h3>
            <span className="font-mono text-xs uppercase tracking-widest text-[#7C3AED]">2024</span>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 transition-all hover:border-[#7C3AED]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.18)]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-white/10 transition-transform group-hover:scale-105 group-hover:ring-[#7C3AED]/40">
                  <img
                    src={c.icon}
                    alt={c.logoAlt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="mt-5 font-display text-base font-semibold leading-snug flex items-center justify-between">
                  {c.title}
                  <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#7C3AED]" />
                </h4>
                <div className="mt-2 text-sm text-muted-foreground">{c.org}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
