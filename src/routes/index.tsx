import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import Particles from "@/components/animations/Particles";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";


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
