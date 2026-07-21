import { MapPin, ArrowRight, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n/index";
import { Typewriter } from "../animations/Typewriter";

export function Hero() {
  const { t, tArr } = useI18n();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20"
    >
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

          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 md:text-lg">
            {t("hero.tagline")}
          </p>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-[#00D4FF]" />
            {t("hero.location")}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00D4FF] px-5 py-3 text-sm font-semibold text-[#0D1117] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.55)] sm:px-6"
            >
              {t("hero.cta.work")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/cv-njara-rabearison.md"
              download="CV_Njara_Rabearison.md"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#00D4FF]/50 px-5 py-3 text-sm font-semibold text-[#00D4FF] transition-all hover:bg-[#00D4FF]/10 sm:px-6"
            >
              <Download className="h-4 w-4" />
              {t("hero.cta.cv")}
            </a>
          </div>
        </div>

        {/* Abstract code visual */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-60 blur-3xl sm:-inset-4"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.35), transparent 60%)",
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]/80 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-muted-foreground">~/njara/architecture.ts</span>
            </div>
            <pre className="overflow-x-auto p-4 text-[11px] leading-relaxed sm:p-5 sm:text-[13px]">
              <code className="font-mono">
                {`import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

`}
                <span className="text-[#7C3AED]">{`@Module`}</span>
                {`({
  imports: [`}
                <span className="text-[#00D4FF]">{`CqrsModule`}</span>
                {`],
  providers: [`}
                <span className="text-[#facc15]">{`OrderService`}</span>
                {`, `}
                <span className="text-[#facc15]">{`CreateOrderHandler`}</span>
                {`],
})
export class `}
                <span className="text-[#00D4FF]">{`OrderModule`}</span>
                {` {}

`}
                <span className="text-muted-foreground">{`// Clean Architecture · TDD · DDD`}</span>
                {`
`}
                <span className="text-muted-foreground">{`// scale: horizontal · uptime: 99.99%`}</span>
                {`
`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
