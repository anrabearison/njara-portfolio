import { memo } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export const SectionHeading = memo(function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00D4FF]">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
});
