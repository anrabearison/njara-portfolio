import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "fr";

type Dict = Record<string, string | string[]>;

const EN: Dict = {
  // Nav
  "nav.home": "Home",
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.experience": "Experience",
  "nav.education": "Education",
  "nav.contact": "Contact",
  "nav.hireMe": "Hire Me",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",

  // Hero
  "hero.available": "Freelance & Consulting — Remote / Hybrid",
  "hero.tagline":
    "12+ years designing robust, scalable platforms — fintech, e-commerce, healthcare & CRM. Web, App & AI (RAG, machine learning) development, plus data scraping — available for freelance, consulting or full-time roles.",
  "hero.location": "Antananarivo, Madagascar",
  "hero.cta.work": "View My Work",
  "hero.cta.cv": "Download CV",
  "hero.typewriter": [
    "Senior Full-Stack Developer",
    "TypeScript Expert: NestJS & React/Angular",
    "Microservices Architect",
    "AI Specialist: RAG, ML & Web Scraping",
  ],

  // About
  "about.eyebrow": "01 / About",
  "about.title": "A decade of building things that scale.",
  "about.body":
    "Senior Full-Stack Developer with 12+ years of experience, specialized in microservices architectures and high-performance REST APIs. Expert in the Node.js/TypeScript (NestJS) ecosystem, with solid experience in Java (Spring MVC) and PHP (Symfony). I've designed mission-critical platforms across multiple sectors: occupational risk management (Winlassie), e-commerce gift cards (Illicado), multichannel CRM (Webhelp), clinical data (QuantaView), and data extraction (Trade-Pilot). I apply Clean Architecture and TDD principles, and accelerate delivery with AI tools (Cursor, GitHub Copilot, Antigravity).",
  "about.stat.years": "Years of Experience",
  "about.stat.companies": "Companies & Sectors",
  "about.stat.projects": "Projects Delivered",
  "about.lang.french": "French",
  "about.lang.english": "English",
  "about.lang.malagasy": "Malagasy",
  "about.lang.fluent": "fluent",
  "about.lang.technical": "technical",
  "about.lang.native": "native",

  // Skills
  "skills.eyebrow": "02 / Skills",
  "skills.title": "Tools & stacks I work with.",
  "skills.group.backend": "Backend",
  "skills.group.frontend": "Frontend",
  "skills.group.ai": "AI & Productivity",
  "skills.group.llm": "AI & LLM",
  "skills.group.db": "Databases",
  "skills.group.devops": "DevOps & Tools",
  "skills.group.methods": "Methodologies",

  // Projects
  "projects.eyebrow": "03 / Selected Projects",
  "projects.title": "Systems built for performance.",
  "projects.impact": "✨ Impact & Metric:",
  "projects.showMore": "View more projects",
  "projects.showMoreAria": "View more projects",
  "projects.showLess": "Show less",
  "projects.showLessAria": "Show less projects",
  "projects.winlassie.category": "Fullstack Development & Frontend Migration",
  "projects.winlassie.title": "Winlassie Risk Management Platform",
  "projects.winlassie.description":
    "Fullstack contribution to a large-scale occupational risk management application. Led the strategic migration of the frontend from AngularJS to Angular 2+, with hybrid coexistence in production to ensure service continuity, while also developing backend features and services for the platform.",
  "projects.winlassie.metrics":
    "40% reduction in global bundle size and improved responsiveness through Lazy Loading and OnPush Change Detection.",
  "projects.illicado.category": "Fintech & Fullstack Development",
  "projects.illicado.title": "Illicado Gift Card Engine",
  "projects.illicado.description":
    "Fullstack contribution within a team to a large-scale gift card distribution platform, including robust, modular transactional APIs and the presentation layer (frontend).",
  "projects.illicado.metrics":
    "Architecture designed to handle peaks of 100k+ requests/day during the holiday season without compromising financial integrity.",
  "projects.tradepilot.category": "Widget Development & System Integration",
  "projects.tradepilot.title": "Trade-Pilot Integration — eexpand",
  "projects.tradepilot.description":
    "Development of custom widgets and backend integration for Trade-Pilot, eexpand's AI-powered platform for international trade intelligence. Built the WordPress/Symfony/MariaDB bridge connecting custom widgets to the core platform.",
  "projects.tradepilot.metrics": "",
  "projects.job-market-scraping.category": "Web Scraping & Automation",
  "projects.job-market-scraping.title": "Job Market Scraping Engine — Ezway (Internal Tool)",
  "projects.job-market-scraping.description":
    "Modular automation and web scraping engine built for Ezway's internal use, enabling intelligent, structured real-time collection of job postings across multiple job boards.",
  "projects.job-market-scraping.metrics":
    "Extraction and structuring of 10,000+ entries/day using BeautifulSoup, synchronized with a Flask/MariaDB backend.",
  "projects.lean-contact.category": "Data Engineering & ETL",
  "projects.lean-contact.title": "Lean-Contact — Multichannel CRM Platform",
  "projects.lean-contact.description":
    "Designed and built Lean-Contact, a proprietary multichannel CRM platform for Webhelp, unifying customer interactions across VoIP, SMS, and Email into a single automated workflow.",
  "projects.lean-contact.metrics":
    "Standardized 1M+ customer records/day through dedicated ETL pipelines, with automated callback algorithms improving campaign efficiency by 25%.",
  "projects.ombiko.category": "AI & Fullstack Development",
  "projects.ombiko.title": "Ombiko — Cattle Herd Management & AI Health Assistant",
  "projects.ombiko.description":
    "Full-stack web application designed for Malagasy cattle farmers, combining complete herd management with an AI-powered animal health assistant. The RAG chatbot covers 12 bovine diseases specific to Madagascar and provides structured responses in 4 parts: urgency, observation, possible diagnosis, and consultation advice — without ever prescribing medication. Includes PDF sanitary passport generation, required for cattle movement between communes.",
  "projects.ombiko.metrics":
    "RAG pipeline processing 12 diseases and 71 veterinary knowledge sections, with PDF generation of regulatory and administrative veterinary documents.",
  "projects.quantaview.category": "Clinical Data Systems",
  "projects.quantaview.title": "QuantaView — Clinical Trial eCRF",
  "projects.quantaview.description":
    "Development of a proprietary electronic Case Report Form (eCRF) for capturing and managing international clinical trial data, deployed on intranet for pharmaceutical and clinical research clients.",
  "projects.quantaview.metrics":
    "Automation scripts (PHP/MySQL) saved 15+ hours of manual data cleanup per study; dataset preparation supported by SAS statistical models.",
  "projects.financial-reporting-engine.category": "Backend & Reporting Automation",
  "projects.financial-reporting-engine.title": "Automated Financial Reporting Engine",
  "projects.financial-reporting-engine.description":
    "Built an automatic export engine generating dynamic .xlsx/.csv financial reports for accounting teams, replacing manual data entry and verification workflows.",
  "projects.financial-reporting-engine.metrics":
    "100% replacement of manual data entry and verification with a direct audit flow to accountants, built on efficient IBM DB2 transactional modeling.",

  // Experience
  "exp.eyebrow": "04 / Experience",
  "exp.title": "A timeline of building.",

  // Education
  "edu.eyebrow": "05 / Education",
  "edu.title": "Foundations & continuous learning.",
  "edu.certifications": "Certifications",
  "edu.cert.react": "Become a React Developer",
  "edu.master.degree": "Master's in Computer Science",
  "edu.master.school": "ENI Fianarantsoa",
  "edu.master.detail": "Software Engineering & Databases",
  "edu.bachelor.degree": "Master's in Mathematics",
  "edu.bachelor.school": "University of Antananarivo",
  "edu.bachelor.detail": "Probabilities & Statistics",

  // Contact
  "contact.eyebrow": "06 / Contact",
  "contact.title": "Let's Work Together",
  "contact.subtitle": "Open to new opportunities: freelance missions, consulting, or full-time (CDI) roles — web & app development, AI/RAG integrations, machine learning, data scraping/automation. Remote or hybrid, based on your needs.",
  "contact.email": "Email",
  "contact.phone": "Phone",
  "contact.location": "Location",
  "contact.form.name": "Name",
  "contact.form.email": "Email",
  "contact.form.subject": "Subject",
  "contact.form.subject.placeholder": "Select a subject",
  "contact.form.subject.freelance": "Freelance mission",
  "contact.form.subject.consulting": "Consulting",
  "contact.form.subject.fulltime": "Full-time role (CDI)",
  "contact.form.subject.webapp": "Web / App development project",
  "contact.form.subject.ai": "AI / RAG / Machine Learning project",
  "contact.form.subject.scraping": "Data scraping / automation",
  "contact.form.subject.other": "Other",
  "contact.form.subject.other.placeholder": "Please specify",
  "contact.form.message": "Message",
  "contact.form.placeholder": "Tell me about your project...",
  "contact.form.send": "Send Message",
  "contact.form.sending": "Sending...",
  "contact.form.sent": "Your message has been sent successfully. I will get back to you as soon as possible.",
  "contact.form.error": "Failed to send. Please try again.",
  "contact.subject": "Contact from Portfolio",

  // Footer
  "footer.text": "© 2026 Njara Rabearison · Senior Full-Stack Developer · Antananarivo, Madagascar",
};

const FR: Dict = {
  // Nav
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.skills": "Compétences",
  "nav.projects": "Projets",
  "nav.experience": "Expérience",
  "nav.education": "Formation",
  "nav.contact": "Contact",
  "nav.hireMe": "Me recruter",
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",

  // Hero
  "hero.available": "Freelance & Consulting — Remote / Hybrid",
  "hero.tagline":
    "12+ ans de conception de plateformes robustes et scalables — fintech, e-commerce, santé & CRM. Web, App & IA (RAG, machine learning) development, plus data scraping — disponible en freelance, consulting ou CDI.",
  "hero.location": "Antananarivo, Madagascar",
  "hero.cta.work": "Voir mes projets",
  "hero.cta.cv": "Télécharger CV",
  "hero.typewriter": [
    "Développeur Full-Stack Senior",
    "Expert TypeScript : NestJS & React/Angular",
    "Architecte Microservices",
    "Spécialiste IA : RAG, ML & Web Scraping",
  ],

  // About
  "about.eyebrow": "01 / À propos",
  "about.title": "Une décennie à construire des systèmes qui scalent.",
  "about.body":
    "Développeur Full-Stack Senior avec plus de 12 ans d'expérience, spécialisé dans les architectures microservices et les APIs REST haute performance. Expert de l'écosystème Node.js/TypeScript (NestJS), avec une solide expérience Java (Spring MVC) et PHP (Symfony). J'ai conçu des plateformes critiques dans des secteurs variés : gestion de risques professionnels (Winlassie), cartes cadeaux e-commerce (Illicado), CRM multicanal (Webhelp), données cliniques (QuantaView) et extraction de données (Trade-Pilot). J'applique les principes Clean Architecture et TDD, et j'accélère la livraison grâce aux outils IA (Cursor, GitHub Copilot, Antigravity).",
  "about.stat.years": "Années d'expérience",
  "about.stat.companies": "Entreprises & secteurs",
  "about.stat.projects": "Projects réalisés",
  "about.lang.french": "Français",
  "about.lang.english": "Anglais",
  "about.lang.malagasy": "Malgache",
  "about.lang.fluent": "courant",
  "about.lang.technical": "technique",
  "about.lang.native": "natif",

  // Skills
  "skills.eyebrow": "02 / Compétences",
  "skills.title": "Outils & stacks que je maîtrise.",
  "skills.group.backend": "Backend",
  "skills.group.frontend": "Frontend",
  "skills.group.ai": "IA & Productivité",
  "skills.group.llm": "IA & LLM",
  "skills.group.db": "Bases de données",
  "skills.group.devops": "DevOps & Outils",
  "skills.group.methods": "Méthodologies",

  // Projects
  "projects.eyebrow": "03 / Projets sélectionnés",
  "projects.title": "Des systèmes construits pour la performance.",
  "projects.impact": "✨ Impact & Métrique :",
  "projects.showMore": "View more projects",
  "projects.showMoreAria": "View more projects",
  "projects.showLess": "Show less",
  "projects.showLessAria": "Show less projects",
  "projects.winlassie.category": "Développement Fullstack & Migration Frontend",
  "projects.winlassie.title": "Plateforme de gestion des risques Winlassie",
  "projects.winlassie.description":
    "Contribution fullstack à une application d'envergure de gestion des risques professionnels. J'ai dirigé la migration stratégique du frontend de AngularJS vers Angular 2+, avec coexistence hybride en production pour assurer la continuité de service, tout en développant des fonctionnalités et services backend pour la plateforme.",
  "projects.winlassie.metrics":
    "Réduction de 40% de la taille du bundle global et gain de réactivité grâce au Lazy Loading et au OnPush Change Detection.",
  "projects.illicado.category": "Fintech & Fullstack Development",
  "projects.illicado.title": "Moteur de Cartes Cadeaux Illicado",
  "projects.illicado.description":
    "Contribution fullstack au sein d'une équipe à une plateforme de distribution de cartes cadeaux à grande échelle, incluant des APIs transactionnelles robustes et modulaires ainsi que la couche de présentation (frontend).",
  "projects.illicado.metrics":
    "Architecture conçue pour supporter des pics à 100k+ requêtes/jour pendant les fêtes de fin d'année sans perte d'intégrité financière.",
  "projects.tradepilot.category": "Développement de Widgets & Intégration Système",
  "projects.tradepilot.title": "Intégration Trade-Pilot — eexpand",
  "projects.tradepilot.description":
    "Développement de widgets personnalisés et intégration backend pour Trade-Pilot, la plateforme propulsée par l'IA d'eexpand pour l'intelligence commerciale internationale. Construction du pont WordPress/Symfony/MariaDB connectant les widgets personnalisés à la plateforme centrale.",
  "projects.tradepilot.metrics": "",
  "projects.job-market-scraping.category": "Web Scraping & Automatisation",
  "projects.job-market-scraping.title": "Moteur de Scraping du Marché de l'Emploi — Ezway (Outil Interne)",
  "projects.job-market-scraping.description":
    "Moteur d'automatisation et de web scraping modulaire construit pour l'usage interne d'Ezway, permettant la collecte intelligente et structurée en temps réel d'offres d'emploi sur plusieurs job boards.",
  "projects.job-market-scraping.metrics":
    "Extraction et structuration de 10 000+ entrées/jour avec BeautifulSoup, synchronisé avec un backend Flask/MariaDB.",
  "projects.lean-contact.category": "Data Engineering & ETL",
  "projects.lean-contact.title": "Lean-Contact — Plateforme CRM Multicanal",
  "projects.lean-contact.description":
    "Conception et développement de Lean-Contact, une plateforme CRM multicanal propriétaire pour Webhelp, unifiant les interactions clients via VoIP, SMS et Email dans un workflow automatisé unique.",
  "projects.lean-contact.metrics":
    "Standardisation de 1M+ enregistrements clients/jour via des pipelines ETL dédiés, avec des algorithmes de rappel automatisés améliorant l'efficacité des campagnes de 25%.",
  "projects.ombiko.category": "IA & Fullstack Development",
  "projects.ombiko.title": "Ombiko — Gestion de Troupeaux & Assistant Santé IA",
  "projects.ombiko.description":
    "Application web fullstack conçue pour les éleveurs bovins malgaches, combinant une gestion complète de troupeaux avec un assistant santé animal propulsé par l'IA. Le chatbot RAG couvre 12 maladies bovines spécifiques à Madagascar et fournit des réponses structurées en 4 parties : urgence, observation, diagnostic possible et conseils de consultation — sans jamais prescrire de médicaments. Inclut la génération de passeports sanitaires PDF, obligatoires pour le mouvement des bovins entre communes.",
  "projects.ombiko.metrics":
    "Pipeline RAG traitant 12 maladies et 71 sections de connaissances vétérinaires, avec génération PDF de documents vétérinaires réglementaires et administratifs.",
  "projects.quantaview.category": "Systèmes de Données Cliniques",
  "projects.quantaview.title": "QuantaView — eCRF Essais Cliniques",
  "projects.quantaview.description":
    "Développement d'un eCRF (Case Report Form électronique) propriétaire pour la capture et la gestion de données d'essais cliniques internationaux, déployé sur intranet pour des clients pharmaceutiques et de recherche clinique.",
  "projects.quantaview.metrics":
    "Scripts d'automatisation (PHP/MySQL) économisant 15+ heures de nettoyage manuel par étude ; préparation des jeux de données supportée par des modèles statistiques SAS.",
  "projects.financial-reporting-engine.category": "Backend & Automatisation de Reporting",
  "projects.financial-reporting-engine.title": "Moteur de Reporting Financier Automatisé",
  "projects.financial-reporting-engine.description":
    "Construction d'un moteur d'export automatique générant des rapports financiers dynamiques .xlsx/.csv pour les équipes comptables, remplaçant les workflows de saisie et vérification manuelles.",
  "projects.financial-reporting-engine.metrics":
    "Remplacement de 100% des saisies et vérifications manuelles par un flux d'audit direct aux comptables, basé sur une modélisation transactionnelle performante sur IBM DB2.",

  // Experience
  "exp.eyebrow": "04 / Expérience",
  "exp.title": "Une chronologie de réalisations.",

  // Education
  "edu.eyebrow": "05 / Formation",
  "edu.title": "Fondations & apprentissage continu.",
  "edu.certifications": "Certifications",
  "edu.cert.react": "Devenir développeur React",
  "edu.master.degree": "Master en Informatique",
  "edu.master.school": "ENI Fianarantsoa",
  "edu.master.detail": "Génie Logiciel & Bases de données",
  "edu.bachelor.degree": "Maîtrise en Mathématiques",
  "edu.bachelor.school": "Université d'Antananarivo",
  "edu.bachelor.detail": "Probabilités & Statistiques",

  // Contact
  "contact.eyebrow": "06 / Contact",
  "contact.title": "Travaillons ensemble",
  "contact.subtitle": "Ouvert aux nouvelles opportunités : missions freelance, consulting ou CDI — développement web & app, intégrations IA/RAG, machine learning, data scraping/automatisation. Remote ou hybrid, selon vos besoins.",
  "contact.email": "Email",
  "contact.phone": "Téléphone",
  "contact.location": "Localisation",
  "contact.form.name": "Nom",
  "contact.form.email": "Email",
  "contact.form.subject": "Sujet",
  "contact.form.subject.placeholder": "Sélectionnez un sujet",
  "contact.form.subject.freelance": "Mission freelance",
  "contact.form.subject.consulting": "Consulting",
  "contact.form.subject.fulltime": "CDI (Full-time)",
  "contact.form.subject.webapp": "Projet de développement Web / App",
  "contact.form.subject.ai": "Projet IA / RAG / Machine Learning",
  "contact.form.subject.scraping": "Data scraping / automatisation",
  "contact.form.subject.other": "Autre",
  "contact.form.subject.other.placeholder": "Veuillez préciser",
  "contact.form.message": "Message",
  "contact.form.placeholder": "Parlez-moi de votre projet...",
  "contact.form.send": "Envoyer le message",
  "contact.form.sending": "Envoi en cours...",
  "contact.form.sent": "Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.",
  "contact.form.error": "Échec de l'envoi. Veuillez réessayer.",
  "contact.subject": "Contact depuis Portfolio",

  // Footer
  "footer.text": "© 2026 Njara Rabearison · Développeur Full-Stack Senior · Antananarivo, Madagascar",
};

// Experience entries are translated separately (arrays of bullets)
type ExpEntry = { role: string; company: string; period: string; bullets: string[] };

export const EXPERIENCE_I18N: Record<Lang, ExpEntry[]> = {
  en: [
    {
      role: "Freelance Full-Stack Developer",
      company: "Independent",
      period: "Jan 2026 – Present",
      bullets: [
        "Designed and built Ombiko (Ankijaniko) — a full-stack cattle herd management app with an embedded AI health assistant using RAG architecture — NestJS, React, PostgreSQL, Supabase pgvector, Gemini API, Voyage AI",
        "Built a RAG pipeline integrating a veterinary knowledge base (12 bovine diseases, 71 sections) for structured animal health diagnostics specific to Madagascar",
        "Generated PDF sanitary passports — a mandatory administrative document for cattle movement between communes in Madagascar",
        "Optimized development workflows with AI tools: Cursor, Copilot, Windsurf",
        "Active technology watch on AI innovations and modern architectures",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Ezway Technology",
      period: "Jul 2025 – Dec 2025",
      bullets: [
        "Trade-Pilot project: custom widget design and hybrid WordPress/Symfony/MariaDB architecture",
        "Smart web scraping: BeautifulSoup crawlers extracting 10k+ job postings/day in real time",
        "React.js & automation UIs: reactive integrations with improved loading fluidity",
      ],
    },
    {
      role: "Full-Stack Software Engineer",
      company: "Webhelp Madagascar — Solvencia",
      period: "Dec 2019 – Jul 2025",
      bullets: [
        "ETL pipelines: standardization of 1M+ customer records per day into a unified schema",
        "High-availability systems: VoIP/SMS connectivity ensuring instant routing of large flows",
        "Automation engines: callback algorithms improving campaign efficiency by 25%",
        "Major software evolutions: migration from monolithic architectures to PHP (Symfony) / React.js",
      ],
    },
    {
      role: "Senior Full-Stack Developer",
      company: "Bocasay Madagascar",
      period: "Nov 2017 – Dec 2019",
      bullets: [
        "Winlassie project: AngularJS to Angular 2+ migration (hybridization, 40% loading performance gain)",
        "Illicado project: gift card distribution module handling 100k+ high-load transactions per day",
        "Robust Node.js REST APIs and secure persistence for gift card traceability",
        "Strict unit testing and CI/CD continuous integration pipelines",
      ],
    },
    {
      role: "Data Manager / Web Developer",
      company: "QData Madagascar",
      period: "Mar 2015 – Nov 2017",
      bullets: [
        "QuantaView: development of a proprietary eCRF for capturing international clinical trial data",
        "Clinical automation: PHP/MySQL scripts saving 15 hours of manual cleanup per study",
        "Data analysis: dataset preparation using SAS scripts and statistical models",
      ],
    },
    {
      role: "Web Developer",
      company: "Carrefour Madagascar",
      period: "Sep 2014 – Mar 2015",
      bullets: [
        "Financial reporting: automatic export engine (Java/Spring MVC/Apache POI) dynamically generating .xlsx/.csv reports",
        "Operational gain: 100% replacement of manual data entry and verification with a direct audit flow to accountants",
        "Database integration: efficient modeling of transactional queries on IBM DB2",
      ],
    },
    {
      role: "Java/JEE Developer (Internship)",
      company: "Trésor Public Malagasy",
      period: "Oct 2013 – Aug 2014",
      bullets: [
        "Financial security: automatic detection of unauthorized fund withdrawals outside state procedures",
        "Integrity: verification algorithms identifying significant balance gaps on massive transaction volumes",
        "Reconciliation: global database consistency system between central server and regional posts",
      ],
    },
  ],
  fr: [
    {
      role: "Développeur Full-Stack Freelance",
      company: "Indépendant",
      period: "Jan 2026 – Présent",
      bullets: [
        "Conception et développement d'Ombiko (Ankijaniko) — application fullstack de gestion de troupeaux bovins avec assistant santé IA intégré utilisant l'architecture RAG — NestJS, React, PostgreSQL, Supabase pgvector, Gemini API, Voyage AI",
        "Construction d'un pipeline RAG intégrant une base de connaissances vétérinaires (12 maladies bovines, 71 sections) pour des diagnostics de santé animale structurés spécifiques à Madagascar",
        "Génération de passeports sanitaires PDF — document administratif obligatoire pour le mouvement des bovins entre communes à Madagascar",
        "Optimisation des workflows de développement avec les outils IA : Cursor, Copilot, Windsurf",
        "Veille technologique active sur les innovations IA et les architectures modernes",
      ],
    },
    {
      role: "Développeur Full-Stack",
      company: "Ezway Technology",
      period: "Juil 2025 – Déc 2025",
      bullets: [
        "Projet Trade-Pilot : Conception de widgets sur mesure et architecture hybride WordPress/Symfony/MariaDB",
        "Web Scraping intelligent : Crawleurs BeautifulSoup extrayant +10k offres/jour en temps réel",
        "React.js & Interfaces d'automatisation : Intégrations réactives avec fluidité de chargement accrue",
      ],
    },
    {
      role: "Ingénieur Full-Stack",
      company: "Webhelp Madagascar — Solvencia",
      period: "Déc 2019 – Juil 2025",
      bullets: [
        "Pipelines ETL : Standardisation de 1M+ données clients par jour vers un schéma unique",
        "Systèmes à haute disponibilité : Connectivité VoIP/SMS assurant le routage instantané de flux volumineux",
        "Moteurs d'automatisation : Algorithmes de relance ayant amélioré l'efficacité des campagnes de 25%",
        "Évolutions logicielles majeures : Migration d'architectures monolithiques vers PHP (Symfony) / React.js",
      ],
    },
    {
      role: "Développeur Full-Stack Senior",
      company: "Bocasay Madagascar",
      period: "Nov 2017 – Déc 2019",
      bullets: [
        "Projet Winlassie : Migration AngularJS vers Angular 2+ (hybridation, gain de performance de 40% sur le chargement)",
        "Projet Illicado : Module de distribution de cartes cadeaux supportant 100k+ transactions par jour à forte charge",
        "API REST robustes en Node.js et persistance sécurisée pour la traçabilité des titres-cadeaux",
        "Mise en place de tests unitaires rigoureux et de pipelines d'intégration continue CI/CD",
      ],
    },
    {
      role: "Data Manager / Développeur Web",
      company: "QData Madagascar",
      period: "Mars 2015 – Nov 2017",
      bullets: [
        "QuantaView : Développement et évolution de l'eCRF propriétaire pour la capture de données d'essais cliniques internationaux",
        "Automatisation clinique : Scripts PHP/MySQL permettant d'économiser 15 heures de nettoyage manuel par étude",
        "Analyses de données : Préparation des jeux de données à l'aide de scripts et de modèles statistiques SAS",
      ],
    },
    {
      role: "Développeur Web",
      company: "Carrefour Madagascar",
      period: "Sept 2014 – Mars 2015",
      bullets: [
        "Reporting Financier : Moteur d'export automatique (Java/Spring MVC/Apache POI) générant dynamiquement des rapports .xlsx/.csv",
        "Gain opérationnel : Remplacement de 100% des saisies et vérifications manuelles par un flux d'audit direct aux comptables",
        "Intégration base de données : Modélisation performante des requêtes transactionnelles sur IBM DB2",
      ],
    },
    {
      role: "Développeur Java/JEE (Stage)",
      company: "Trésor Public Malagasy",
      period: "Oct 2013 – Août 2014",
      bullets: [
        "Sécurité financière : Détection automatique des retraits de fonds non mandatés hors procédure étatique",
        "Intégrité : Algorithmes de vérification repérant les écarts de balance élevés sur volumes transactionnels massifs",
        "Réconciliation : Système de cohérence globale de base de données entre le serveur central et les postes régionaux",
      ],
    },
  ],
};

const DICTS: Record<Lang, Dict> = { en: EN, fr: FR };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tArr: (key: string) => string[];
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "en" || saved === "fr") {
        setLangState(saved);
      } else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("fr")) {
        setLangState("fr");
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      // ignore
    }
  };

  const t = (key: string) => {
    const v = DICTS[lang][key];
    if (typeof v === "string") return v;
    const fallback = DICTS.en[key];
    return typeof fallback === "string" ? fallback : key;
  };
  const tArr = (key: string) => {
    const v = DICTS[lang][key];
    if (Array.isArray(v)) return v;
    const fallback = DICTS.en[key];
    return Array.isArray(fallback) ? fallback : [];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
