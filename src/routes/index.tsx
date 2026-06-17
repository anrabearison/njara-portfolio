import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        cyan: Math.random() > 0.4,
      })),
    [],
  );
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
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">NR.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
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
          className="rounded-full bg-[#00D4FF] px-5 py-2 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-32 pb-20">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-1.5 text-xs font-medium text-[#4ade80]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            Available for freelance
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Njara
            <br />
            Rabearison
          </h1>

          <div className="font-display text-2xl font-semibold sm:text-3xl lg:text-4xl min-h-[1.4em]">
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

          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            12+ ans de conception de plateformes robustes et scalables — fintech, e-commerce, santé & CRM.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-[#00D4FF]" />
            Antananarivo, Madagascar
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.55)]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
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
    <section id="about" className="px-6 py-24">
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
      <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
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
    <section id="skills" className="px-6 py-24">
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

const EXPERIENCE = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jan 2026 – Present",
    bullets: [
      "Designing modern backend architectures with NestJS & TypeScript",
      "Building performant full-stack solutions for clients",
      "Accelerating dev cycles with AI tools (Cursor, Copilot, Antigravity)",
      "Monitoring AI innovations and modern architecture trends",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Ezway Technology",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "Projet Trade-Pilot (eexpand) : conception de plugins sur mesure et intégration dans l'écosystème applicatif",
      "Architecture hybride : WordPress + Symfony + JavaScript sur persistance MariaDB",
      "Web scraping automatisé (Python / BeautifulSoup) pour collecter des offres d'emploi en temps réel",
      "Développement de composants React.js pour des parcours utilisateurs fluides et réactifs",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Webhelp Madagascar",
    period: "Dec 2019 – Jul 2025",
    bullets: [
      "Pipelines d'ingestion ETL flexibles pour importer et normaliser des fichiers clients multi-formats vers le modèle interne",
      "Plateformes multicanales haute disponibilité : VoIP, SMS, e-mails, courriers — routage fluide des flux en temps réel",
      "Moteurs d'automatisation et batchs pour campagnes massives de relance client, augmentant l'efficacité opérationnelle",
      "Modernisation de l'architecture PHP/Symfony (Back-end) et React.js (Front-end) en environnement Agile Scrum",
    ],
  },
  {
    role: "Senior Full-Stack Developer",
    company: "Bocasay Madagascar",
    period: "Nov 2017 – Dec 2019",
    bullets: [
      "Projet Winlassie : migration AngularJS → Angular 2+ avec stratégie d'hybridation, lazy loading et OnPush change detection",
      "Projet Illicado : module de gestion et distribution de cartes cadeaux (physiques & digitales) — sécurisation des transactions",
      "APIs robustes haute charge pour e-commerce multi-enseignes (pics de fêtes), Node.js / REST",
      "Composants UI réutilisables, refactoring de l'état global, revues de code et tests unitaires",
    ],
  },
  {
    role: "Data Manager / Web Developer",
    company: "QData Madagascar",
    period: "Mar 2015 – Nov 2017",
    bullets: [
      "Conception et maintenance évolutive de la plateforme eCRF propriétaire QuantaView pour essais cliniques internationaux",
      "Modélisation d'eCRFs sur mesure adaptés aux protocoles spécifiques de chaque étude clinique",
      "Scripts automatisés de validation, contrôle de cohérence et nettoyage de données (PHP, MySQL)",
      "Manipulation et préparation de données statistiques via SAS (Statistical Analysis System)",
    ],
  },
  {
    role: "Web Developer",
    company: "Carrefour Madagascar",
    period: "Sep 2014 – Mar 2015",
    bullets: [
      "Automatisation du reporting financier : remplacement des processus manuels par un moteur d'exportation Java",
      "Génération dynamique de rapports structurés .xlsx / .csv via Apache POI",
      "Livraison sécurisée et automatisée des rapports aux experts-comptables pour validation des audits",
      "Architecture Spring MVC sur base de données IBM DB2",
    ],
  },
  {
    role: "Java/JEE Developer (Internship)",
    company: "Trésor Public Malagasy",
    period: "Oct 2013 – Aug 2014",
    bullets: [
      "Détection des anomalies de flux : module d'analyse repérant les retraits de fonds hors procédure",
      "Algorithmes de vérification d'intégrité comptable pour identifier les écarts de balance élevés",
      "Réconciliation de données à grande échelle entre le serveur central et les postes comptables régionaux",
      "Application robuste Spring MVC + Oracle SQL pour le traitement de volumes massifs de transactions",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
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

const PROJECTS = [
  {
    title: "Clinical eCRF Platform",
    domain: "Healthcare · Clinical Research",
    description:
      "Electronic Case Report Form platform for multi-center clinical trials. Dynamic form engine, role-based workflows, full audit trail and HL7/FHIR data exports for regulatory submissions.",
    stack: ["NestJS", "PostgreSQL", "React", "TypeScript", "Docker"],
    highlights: ["20+ active trials", "GDPR & 21 CFR Part 11 ready", "Sub-second form rendering"],
    accent: "cyan",
  },
  {
    title: "Microservices Payment Gateway",
    domain: "Fintech · High-volume Transactions",
    description:
      "Event-driven payment orchestration handling card, mobile money and bank transfers. Idempotent ledger, retry & circuit-breaker layer, real-time fraud signals streamed to risk engine.",
    stack: ["NestJS", "Kafka", "Redis", "PostgreSQL", "Kubernetes"],
    highlights: ["3M+ tx / month", "99.98% uptime", "< 120ms p95 latency"],
    accent: "violet",
  },
  {
    title: "ETL & Data Sync Engine",
    domain: "Data Engineering · CRM Integration",
    description:
      "Pluggable ETL framework synchronizing Salesforce, HubSpot and internal warehouses. Incremental CDC, schema-drift detection and a visual mapping UI for non-technical ops teams.",
    stack: ["Node.js", "TypeScript", "BullMQ", "PostgreSQL", "Airflow"],
    highlights: ["50+ connectors", "10M rows/day", "Zero-downtime migrations"],
    accent: "cyan",
  },
  {
    title: "Headless E-commerce Backend",
    domain: "E-commerce · B2B SaaS",
    description:
      "Multi-tenant commerce API powering storefronts across West Africa. Cart, catalog, promo engine and shipping orchestration exposed through GraphQL with per-tenant theming.",
    stack: ["Symfony", "PHP 8", "GraphQL", "MySQL", "Redis"],
    highlights: ["40+ tenants", "Multi-currency", "Headless CMS integration"],
    accent: "violet",
  },
];

function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="04 / Projects"
            title="Selected Projects"
            subtitle="A handful of flagship platforms I've architected and shipped end-to-end."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const isCyan = p.accent === "cyan";
            const ring = isCyan ? "#00D4FF" : "#7C3AED";
            return (
              <Reveal key={p.title} delay={i * 80}>
                <article
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 transition-all hover:-translate-y-1"
                  style={{ boxShadow: "0 0 0 1px transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 1px ${ring}55, 0 0 50px ${ring}25`)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 1px transparent")}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                    style={{ background: ring }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-xl border"
                      style={{ borderColor: `${ring}55`, background: `${ring}1a`, color: ring }}
                    >
                      <Layers className="h-5 w-5" />
                    </div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: ring }}
                    >
                      {String(i + 1).padStart(2, "0")} / Case Study
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold leading-tight">{p.title}</h3>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {p.domain}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                  <ul className="mt-5 space-y-1.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-foreground/80">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: ring }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Several projects are under NDA — happy to walk through architecture and trade-offs on a call.
          </p>
        </Reveal>
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
    { title: "Back End Development and APIs", org: "freeCodeCamp" },
    { title: "Become a Java & React Developer", org: "LinkedIn Learning" },
    { title: "Preparing for a Developer Career", org: "Microsoft" },
  ];
  return (
    <section id="education" className="px-6 py-24">
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
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-all hover:border-[#7C3AED]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.18)]">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED]">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="mt-5 font-display text-base font-semibold leading-snug">{c.title}</h4>
                <div className="mt-2 text-sm text-muted-foreground">{c.org}</div>
              </div>
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
    <section id="contact" className="px-6 py-24">
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
                Send Message
              </button>
              {sent && (
                <div className="mt-4 text-sm text-[#4ade80]">
                  Thanks — your message has been queued. I'll reply shortly.
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
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
