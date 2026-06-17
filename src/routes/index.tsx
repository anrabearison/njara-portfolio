import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
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
  GitBranch,
  Layers,
  GraduationCap,
  Award,
  Briefcase,
  Send,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Njara Rabearison — Senior Full-Stack Developer" },
      {
        name: "description",
        content:
          "Développeur Full-Stack Senior basé à Antananarivo. 12+ ans d'expérience : NestJS, TypeScript, PHP/Symfony, React.js, Angular, microservices, ETL, eCRF cliniques et automatisation.",
      },
      { property: "og:title", content: "Njara Rabearison — Senior Full-Stack Developer" },
      {
        property: "og:description",
        content: "12+ years crafting robust, scalable platforms across fintech, e-commerce, healthcare and CRM.",
      },
    ],
  }),
  component: Portfolio,
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

  useEffect(() => {
    const word = words[idx];
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

/* ---------------- Sections ---------------- */

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0D1117]/80 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a href="#home" className="font-display text-lg font-bold tracking-tight shrink-0">
          <span className="text-gradient">NR.</span>
        </a>
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV.map((n) => {
            const isActive = active === n.href.slice(1);
            return (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-[#00D4FF]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#contact"
          className="shrink-0 rounded-full bg-[#00D4FF] px-4 py-2 text-xs font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] sm:px-5 sm:text-sm"
        >
          Hire Me
        </a>
      </nav>

    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
        <div className="space-y-6 sm:space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-1.5 text-xs font-medium text-[#4ade80]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            Available for freelance
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            Njara
            <br />
            Rabearison
          </h1>

          <div className="font-display text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl min-h-[1.4em]">
            <Typewriter
              words={[
                "Senior Full-Stack Developer",
                "NestJS & TypeScript Expert",
                "Angular & React Specialist",
                "Microservices Architect",
                "AI-Powered Developer",
              ]}
            />
          </div>

          <p className="max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">

            12+ ans de conception de plateformes robustes et scalables — fintech, e-commerce, santé & CRM.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-[#00D4FF]" />
            Antananarivo, Madagascar
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.55)]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/cv-njara-rabearison.md"
              download="CV_Njara_Rabearison.md"
              className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/50 px-6 py-3 text-sm font-semibold text-[#00D4FF] transition-all hover:bg-[#00D4FF]/10"
            >
              <Download className="h-4 w-4" />
              Download CV
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
  const stats = [
    { value: "12+", label: "Years of Experience" },
    { value: "7", label: "Companies & Sectors" },
    { value: "4", label: "Flagship Projects" },
  ];
  return (
    <section id="about" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="01 / About" title="A decade of building things that scale." />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Développeur Full-Stack Senior avec plus de 12 ans d'expérience, spécialisé dans
              les architectures microservices et les APIs REST haute performance. Expert de
              l'écosystème Node.js/TypeScript (NestJS), avec une solide expérience Java (Spring MVC)
              et PHP (Symfony). J'ai conçu des plateformes critiques dans des secteurs variés :
              gestion de risques professionnels (Winlassie), cartes cadeaux e-commerce (Illicado),
              CRM multicanal (Webhelp), données cliniques (QuantaView) et extraction de données
              (Trade-Pilot). J'applique les principes Clean Architecture et TDD, et j'accélère la
              livraison grâce aux outils IA (Cursor, GitHub Copilot, Antigravity).
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {[
                { flag: "🇫🇷", name: "French", level: "fluent" },
                { flag: "🇬🇧", name: "English", level: "technical" },
                { flag: "🇲🇬", name: "Malagasy", level: "native" },
              ].map((l) => (
                <span
                  key={l.name}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
                >
                  <span className="mr-2">{l.flag}</span>
                  <span className="font-medium">{l.name}</span>
                  <span className="ml-1 text-muted-foreground">— {l.level}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#00D4FF]/40 hover:bg-white/[0.04]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00D4FF]/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="flex items-baseline gap-4">
                    <div className="font-display text-5xl font-bold text-gradient">
                      {s.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
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
    title: "Backend",
    icon: Server,
    items: ["NestJS", "Node.js", "TypeScript", "Java (Spring Boot)", "PHP (Symfony)", "Spring MVC", "REST API", "Microservices"],
  },
  {
    title: "Frontend",
    icon: Code2,
    items: ["React.js", "Angular", "AngularJS", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    title: "AI & Productivity",
    icon: Sparkles,
    items: ["Cursor", "GitHub Copilot", "Antigravity", "AI-assisted development"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL", "MariaDB", "Oracle SQL", "IBM DB2"],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    items: ["Docker", "Git", "Jenkins", "GitLab CI/CD", "Apache POI", "Postman", "Python (BeautifulSoup)"],
  },
  {
    title: "Methodologies",
    icon: Layers,
    items: ["Agile Scrum", "TDD", "Clean Architecture", "SAS", "ETL / Data Mapping", "UML"],
  },
];

function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="02 / Skills" title="Tools & stacks I work with." />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 80}>
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
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
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
    title: "Winlassie Risk Management Migration",
    category: "Migration & Frontend Architecture",
    description: "Migration stratégique d'une application d'envergure de gestion des risques professionnels de AngularJS vers Angular 2+. Mise en place d'une coexistence hybride en production pour assurer la continuité de service.",
    metrics: "Réduction de 40% de la taille du bundle global et gain de réactivité grâce au Lazy Loading et au OnPush Change Detection.",
    tags: ["Angular", "AngularJS", "TypeScript", "Webpack", "Performance Optimization"],
    link: "https://www.winlassie.com/",
  },
  {
    title: "Illicado Gift Card Engine",
    category: "Fintech & API Design",
    description: "Conception et développement d'APIs transactionnelles robustes et modulaires pour le leader de la carte cadeau multi-enseignes (E-commerce et Retail).",
    metrics: "Architecture conçue pour supporter des pics à 100k+ requêtes/jour pendant les fêtes de fin d'année sans perte d'intégrité financière.",
    tags: ["Node.js", "Express", "REST API", "Database Security", "High Load"],
    link: "https://illicado.com",
    fallbackLink: "https://www.linkedin.com/company/illicado/",
  },
  {
    title: "Trade-Pilot Scraping Engine",
    category: "Web Scraping & Automation",
    description: "Moteur d'automatisation et de web scraping modulaire pour la collecte intelligente et structurée d'offres d'emploi en temps réel sur de multiples job boards.",
    metrics: "Extraction et structuration de plus de 10 000 entrées/jour avec BeautifulSoup et synchronisation Symfony/MariaDB.",
    tags: ["Python", "BeautifulSoup", "Symfony", "MariaDB", "Task Automation"],
    link: "https://github.com/anrabearison",
  },
];

function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="03 / Selected Projects" title="Systèmes construits pour la performance." />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF]/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#00D4FF] mb-2">{p.category}</div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-start justify-between gap-3">
                    <span className="min-w-0 break-words">{p.title}</span>
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

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="border-t border-white/5 pt-4 mb-4">
                    <div className="text-xs font-mono text-[#4ade80] font-medium">✨ Impact & Métrique :</div>
                    <div className="text-xs text-muted-foreground mt-1 italic">{p.metrics}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-muted-foreground">{t}</span>
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

const EXPERIENCE = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jan 2026 – Present",
    bullets: [
      "Conception d'architectures backend modernes avec NestJS & TypeScript",
      "Déploiements et intégrations full-stack d'outils d'automatisation pour clients",
      "Optimisation de workflows de développement grâce aux assistants IA",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Ezway Technology",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "Projet Trade-Pilot : Conception de plugins sur mesure et architecture hybride WordPress/Symfony/MariaDB",
      "Web Scraping intelligent : Crawleurs BeautifulSoup extrayant +10k offres/jour en temps réel",
      "React.js & Interfaces d'automatisation : Intégrations réactives avec fluidité de chargement accrue",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Webhelp Madagascar",
    period: "Dec 2019 – Jul 2025",
    bullets: [
      "Pipelines ETL : Standardisation de 1M+ données clients par jour vers un schéma unique",
      "Systèmes à haute disponibilité : Connectivité VoIP/SMS assurant le routage instantané de flux volumineux",
      "Moteurs d'automatisation : Algorithmes de relance ayant amélioré l'efficacité des campagnes de 25%",
      "Evolutions logicielles majeures : Migration d'architectures monolithiques vers PHP (Symfony) / React.js",
    ],
  },
  {
    role: "Senior Full-Stack Developer",
    company: "Bocasay Madagascar",
    period: "Nov 2017 – Dec 2019",
    bullets: [
      "Projet Winlassie : Migration AngularJS vers Angular 2+ (hybridation, gain de performance de 40% sur le chargement)",
      "Projet Illicado : Module de distribution de cartes cadeaux supportant 100k+ transactions par jour à forte charge",
      "API REST robustes en Node.js et persistance sécurisée pour la traçabilité des titres-cadeaux",
      "Mise en place de tests unitaires rigoureux et de pipelines d'intégration continue CI/CD",
    ],
  },
  {
    role: "Data Manager / Web Developer",
    company: "QData Madagascar",
    period: "Mar 2015 – Nov 2017",
    bullets: [
      "QuantaView : Développement et évolution de l'eCRF propriétaire pour la capture de données d'essais cliniques internationaux",
      "Automatisation clinique : Scripts PHP/MySQL permettant d'économiser 15 heures de nettoyage manuel par étude",
      "Analyses de données : Préparation des jeux de données à l'aide de scripts et de modèles statistiques SAS",
    ],
  },
  {
    role: "Web Developer",
    company: "Carrefour Madagascar",
    period: "Sep 2014 – Mar 2015",
    bullets: [
      "Reporting Financier : Moteur d'export automatique (Java/Spring MVC/Apache POI) générant dynamiquement des rapports .xlsx/.csv",
      "Gain opérationnel : Remplacement de 100% des saisies et vérifications manuelles par un flux d'audit direct aux comptables",
      "Intégration base de données : Modélisation performante des requêtes transactionnelles sur IBM DB2",
    ],
  },
  {
    role: "Java/JEE Developer (Internship)",
    company: "Trésor Public Malagasy",
    period: "Oct 2013 – Aug 2014",
    bullets: [
      "Sécurité financière : Détection automatique des retraits de fonds non mandatés hors procédure étatique",
      "Intégrité : Algorithmes de vérification repérant les écarts de balance élevés sur volumes transactionnels massifs",
      "Réconciliation : Système de cohérence globale de base de données entre le serveur central et les postes régionaux",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="03 / Experience" title="A timeline of building." />
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
            {EXPERIENCE.map((e, i) => (
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
  const items = [
    {
      degree: "Master's in Computer Science",
      school: "ENI Fianarantsoa",
      detail: "Software Engineering & Databases",
    },
    {
      degree: "Bachelor's in Mathematics",
      school: "University of Antananarivo",
      detail: "Probabilities & Statistics",
    },
  ];
  const certs = [
    { title: "Back End Development and APIs", org: "freeCodeCamp", url: "https://www.freecodecamp.org/certification/fccdd5d45d8-c92c-4731-bf36-24beea4b4707/back-end-development-and-apis" },
    { title: "Become a Java & React Developer", org: "LinkedIn Learning", url: "https://www.linkedin.com/in/rabearison-njara-12114a90/details/certifications/" },
    { title: "Preparing for a Developer Career", org: "Microsoft", url: "https://www.linkedin.com/in/rabearison-njara-12114a90/details/certifications/" },
  ];
  return (
    <section id="education" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="05 / Education" title="Foundations & continuous learning." />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((e, i) => (
            <Reveal key={e.degree} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:border-[#00D4FF]/40">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{e.degree}</h3>
                <div className="mt-1 text-sm text-[#00D4FF]">{e.school}</div>
                <div className="mt-2 text-sm text-muted-foreground">{e.detail}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex items-baseline gap-3">
            <h3 className="font-display text-2xl font-bold">Certifications</h3>
            <span className="font-mono text-xs uppercase tracking-widest text-[#7C3AED]">2024</span>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a href={c.url} target="_blank" rel="noreferrer" className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-all hover:border-[#7C3AED]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.18)]">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED]">
                  <Award className="h-6 w-6" />
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
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="06 / Contact"
            title="Let's Work Together"
            subtitle="Open to freelance missions and exciting projects."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "rabearisonnjara@gmail.com", href: "mailto:rabearisonnjara@gmail.com" },
              { icon: Phone, label: "Phone", value: "+261 34 74 370 44", href: "tel:+261347437044" },
              { icon: MapPin, label: "Location", value: "Antananarivo, Madagascar" },
            ].map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-[#00D4FF]/40 hover:bg-white/[0.04]">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="truncate font-medium">{c.value}</div>
                  </div>
                </div>
              );
              return (
                <Reveal key={c.label} delay={i * 80}>
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
                const mailtoUrl = `mailto:rabearisonnjara@gmail.com?subject=Contact%20depuis%20Portfolio%20-%20${encodeURIComponent(String(name))}&body=Email:%20${encodeURIComponent(String(email))}%0A%0A${encodeURIComponent(String(msg))}`;
                window.location.href = mailtoUrl;
                setSent(true);
                setTimeout(() => setSent(false), 3500);
                (e.target as HTMLFormElement).reset();
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" type="text" required maxLength={100} />
                <Field label="Email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  maxLength={2000}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm outline-none transition-colors focus:border-[#00D4FF]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)]"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.55)]"
              >
                <Send className="h-4 w-4" />
                Send Message via Email
              </button>
              {sent && (
                <div className="mt-4 text-sm text-[#4ade80]">
                  Redirection vers votre messagerie en cours... Merci de votre message !
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
  return (
    <footer
      className="border-t px-6 py-8 text-center text-sm text-muted-foreground"
      style={{ borderImage: "linear-gradient(90deg, transparent, #00D4FF66, transparent) 1" }}
    >
      © 2026 Njara Rabearison · Senior Full-Stack Developer · Antananarivo, Madagascar
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
