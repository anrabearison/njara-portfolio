import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Download,
  ArrowRight,
  Code2,
  Database,
  Sparkles,
  Server,
  Wrench,
  Layers,
  Briefcase,
  Send,
  ExternalLink,
  Languages,
} from "lucide-react";
import { LanguageProvider, useI18n, EXPERIENCE_I18N, type Lang } from "@/lib/i18n";
import eniLogo from "@/assets/logos/eni.png";
import uaLogo from "@/assets/logos/ua.png";
import fccLogo from "@/assets/logos/freecodecamp.svg";
import linkedinLearningLogo from "@/assets/logos/linkedin-learning.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Njara Rabearison — Senior Full-Stack Developer" },
      {
        name: "description",
        content:
          "Senior Full-Stack Developer based in Antananarivo. 12+ years of experience: NestJS, TypeScript, PHP/Symfony, React.js, Angular, microservices, ETL, clinical eCRF and automation.",
      },
      { property: "og:title", content: "Njara Rabearison — Senior Full-Stack Developer" },
      {
        property: "og:description",
        content: "12+ years crafting robust, scalable platforms across fintech, e-commerce, healthcare and CRM.",
      },
    ],
  }),
  component: PortfolioRoot,
});

/* ---------------- Helpers ---------------- */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Particles() {
  const [particles, setParticles] = useState<
    { left: number; top: number; size: number; delay: number; duration: number; cyan: boolean }[]
  >([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        cyan: Math.random() > 0.4,
      })),
    );
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(0,212,255,0.12), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(124,58,237,0.12), transparent 50%)",
        }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.cyan ? "#00D4FF" : "#7C3AED",
            boxShadow: p.cyan
              ? "0 0 10px rgba(0,212,255,0.8)"
              : "0 0 10px rgba(124,58,237,0.8)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [del, setDel] = useState(false);

  // Reset when words list changes (e.g. language switch)
  useEffect(() => {
    setIdx(0);
    setSub("");
    setDel(false);
  }, [words]);

  useEffect(() => {
    const word = words[idx] ?? "";
    if (!del && sub === word) {
      const t = setTimeout(() => setDel(true), 1600);
      return () => clearTimeout(t);
    }
    if (del && sub === "") {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setSub((s) => (del ? word.slice(0, s.length - 1) : word.slice(0, s.length + 1)));
      },
      del ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [sub, del, idx, words]);

  return (
    <span className="text-gradient">
      {sub}
      <span className="animate-blink text-[#00D4FF]">|</span>
    </span>
  );
}

/* ---------------- Language Toggle ---------------- */

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const next: Lang = lang === "en" ? "fr" : "en";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={`Switch language to ${next.toUpperCase()}`}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-[#00D4FF]/40 hover:text-[#00D4FF] ${className}`}
    >
      <Languages className="h-3.5 w-3.5" />
      <span className={lang === "en" ? "text-[#00D4FF]" : ""}>EN</span>
      <span className="text-white/20">/</span>
      <span className={lang === "fr" ? "text-[#00D4FF]" : ""}>FR</span>
    </button>
  );
}

/* ---------------- Sections ---------------- */

const NAV_KEYS: { href: string; key: string }[] = [
  { href: "#home", key: "nav.home" },
  { href: "#about", key: "nav.about" },
  { href: "#skills", key: "nav.skills" },
  { href: "#projects", key: "nav.projects" },
  { href: "#experience", key: "nav.experience" },
  { href: "#education", key: "nav.education" },
  { href: "#contact", key: "nav.contact" },
];

function Navbar() {
  const { t } = useI18n();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_KEYS.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "backdrop-blur-xl bg-[#0D1117]/90 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a href="#home" className="font-display text-lg font-bold tracking-tight shrink-0">
          <span className="text-gradient">NR.</span>
        </a>
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_KEYS.map((n) => {
            const isActive = active === n.href.slice(1);
            return (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-[#00D4FF]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(n.key)}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:inline-flex" />
          <a
            href="#contact"
            className="shrink-0 rounded-full bg-[#00D4FF] px-4 py-2 text-xs font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] sm:px-5 sm:text-sm"
          >
            {t("nav.hireMe")}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="shrink-0 rounded-full border border-white/10 p-2 text-foreground transition-colors hover:bg-white/5 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/5 md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV_KEYS.map((n) => {
              const isActive = active === n.href.slice(1);
              return (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive ? "text-[#00D4FF] bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {t(n.key)}
                  </a>
                </li>
              );
            })}
            <li className="px-3 py-3 sm:hidden">
              <LangToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t, tArr } = useI18n();
  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
        <div className="space-y-6 sm:space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-1.5 text-xs font-medium text-[#4ade80]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            {t("hero.available")}
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            Njara
            <br />
            Rabearison
          </h1>

          <div className="font-display text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl min-h-[1.4em]">
            <Typewriter words={tArr("hero.typewriter")} />
          </div>

          <p className="max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
            {t("hero.tagline")}
          </p>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-[#00D4FF]" />
            {t("hero.location")}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.55)]"
            >
              {t("hero.cta.work")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/cv-njara-rabearison.md"
              download="CV_Njara_Rabearison.md"
              className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/50 px-6 py-3 text-sm font-semibold text-[#00D4FF] transition-all hover:bg-[#00D4FF]/10"
            >
              <Download className="h-4 w-4" />
              {t("hero.cta.cv")}
            </a>
          </div>
        </div>

        {/* Abstract code visual */}
        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-3xl opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.35), transparent 60%)" }} />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]/80 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-muted-foreground">~/njara/architecture.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
              <code className="font-mono">
{`import { Module } from '@nestjs/common';
import { CQRS, EventBus } from '@nestjs/cqrs';

`}<span className="text-[#7C3AED]">{`@Module`}</span>{`({
  imports: [`}<span className="text-[#00D4FF]">{`CQRS`}</span>{`, `}<span className="text-[#00D4FF]">{`EventBus`}</span>{`],
  providers: [`}<span className="text-[#facc15]">{`OrderService`}</span>{`],
})
export class `}<span className="text-[#00D4FF]">{`OrderModule`}</span>{` {
  `}<span className="text-muted-foreground">{`// clean architecture · TDD · DDD`}</span>{`
  scale = `}<span className="text-[#4ade80]">{`'horizontal'`}</span>{`;
  uptime = `}<span className="text-[#4ade80]">{`99.99`}</span>{`;
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  const stats = [
    { value: "12+", labelKey: "about.stat.years" },
    { value: "7", labelKey: "about.stat.companies" },
    { value: "4", labelKey: "about.stat.projects" },
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
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("about.body")}
            </p>
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
                    <div className="font-display text-5xl font-bold text-gradient">
                      {s.value}
                    </div>
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

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00D4FF]">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
}

const SKILL_GROUPS = [
  {
    titleKey: "skills.group.backend",
    icon: Server,
    items: ["NestJS", "Node.js", "TypeScript", "Java (Spring Boot)", "PHP (Symfony)", "Spring MVC", "REST API", "Microservices"],
  },
  {
    titleKey: "skills.group.frontend",
    icon: Code2,
    items: ["React.js", "Angular", "AngularJS", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    titleKey: "skills.group.ai",
    icon: Sparkles,
    items: ["Cursor", "GitHub Copilot", "Antigravity", "AI-assisted development"],
  },
  {
    titleKey: "skills.group.db",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL", "MariaDB", "Oracle SQL", "IBM DB2"],
  },
  {
    titleKey: "skills.group.devops",
    icon: Wrench,
    items: ["Docker", "Git", "Jenkins", "GitLab CI/CD", "Apache POI", "Postman", "Python (BeautifulSoup)"],
  },
  {
    titleKey: "skills.group.methods",
    icon: Layers,
    items: ["Agile Scrum", "TDD", "Clean Architecture", "SAS", "ETL / Data Mapping", "UML"],
  },
];

function Skills() {
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

const PROJECTS = [
  {
    id: "winlassie",
    tags: ["Angular", "AngularJS", "TypeScript", "Webpack", "Performance Optimization"],
    link: "https://www.winlassie.com/",
  },
  {
    id: "illicado",
    tags: ["Node.js", "Express", "REST API", "Database Security", "High Load"],
    link: "https://illicado.com",
    fallbackLink: "https://www.linkedin.com/company/illicado/",
  },
  {
    id: "tradepilot",
    tags: ["Python", "BeautifulSoup", "Symfony", "MariaDB", "Task Automation"],
    link: "https://github.com/anrabearison",
  },
];

function Projects() {
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
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(p as { fallbackLink?: string }).fallbackLink ? (e) => {
                        e.preventDefault();
                        const primary = p.link;
                        const fallback = (p as { fallbackLink?: string }).fallbackLink!;
                        const win = window.open("about:blank", "_blank");
                        const img = new Image();
                        let done = false;
                        const finish = (url: string) => {
                          if (done) return;
                          done = true;
                          if (win) win.location.href = url;
                        };
                        const origin = new URL(primary).origin;
                        img.onload = () => finish(primary);
                        img.onerror = () => finish(fallback);
                        img.src = `${origin}/favicon.ico?_=${Date.now()}`;
                        setTimeout(() => finish(fallback), 2500);
                      } : undefined}
                      className="shrink-0 text-[#00D4FF] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity mt-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
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

function Experience() {
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

function Education() {
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
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-white/15 bg-white/[0.04] p-1.5 transition-transform hover:scale-105"
                >
                  <img src={e.logo} alt={e.logoAlt} className="h-full w-full object-contain" loading="lazy" />
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
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-white/15 bg-white/[0.04] p-1.5 transition-transform group-hover:scale-105">
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

function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const cards = [
    { icon: Mail, labelKey: "contact.email", value: "rabearisonnjara@gmail.com", href: "mailto:rabearisonnjara@gmail.com" },
    { icon: Phone, labelKey: "contact.phone", value: "+261 34 74 370 44", href: "tel:+261347437044" },
    { icon: MapPin, labelKey: "contact.location", value: t("hero.location") },
  ];
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
            {cards.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-[#00D4FF]/40 hover:bg-white/[0.04]">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {t(c.labelKey)}
                    </div>
                    <div className="truncate font-medium">{c.value}</div>
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
                <a
                  href="https://github.com/anrabearison"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-muted-foreground transition-colors hover:border-[#00D4FF]/40 hover:text-[#00D4FF]"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rabearison-njara-12114a90/"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-muted-foreground transition-colors hover:border-[#00D4FF]/40 hover:text-[#00D4FF]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/261347437044"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-muted-foreground transition-colors hover:border-[#00D4FF]/40 hover:text-[#00D4FF]"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={(e) => {
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
              }}
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

function Field({
  label,
  name,
  type,
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm outline-none transition-colors focus:border-[#00D4FF]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)]"
      />
    </div>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer
      className="border-t px-4 py-8 text-center text-xs sm:text-sm text-muted-foreground sm:px-6"
      style={{ borderImage: "linear-gradient(90deg, transparent, #00D4FF66, transparent) 1" }}
    >
      {t("footer.text")}
    </footer>
  );
}

/* ---------------- Page ---------------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function PortfolioRoot() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}
