import { useTypewriter } from "@/hooks/interaction/useTypewriter";

interface TypewriterProps {
  words: string[];
}

export function Typewriter({ words }: TypewriterProps) {
  const sub = useTypewriter(words);

  return (
    <span className="text-gradient">
      {sub}
      <span className="animate-blink text-[#00D4FF]">|</span>
    </span>
  );
}
