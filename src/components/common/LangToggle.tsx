import { memo } from "react";
import { Languages } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n/index";

interface LangToggleProps {
  className?: string;
}

export const LangToggle = memo(function LangToggle({ className = "" }: LangToggleProps) {
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
});
