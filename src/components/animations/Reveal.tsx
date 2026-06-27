import { type ReactNode, memo } from "react";
import { useIntersectionObserver } from "@/hooks/scroll/useIntersectionObserver";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal = memo(function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, visible } = useIntersectionObserver({ threshold: 0.12 });

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
});
