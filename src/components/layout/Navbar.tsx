import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useScroll } from "@/hooks/useScroll";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { NAV_KEYS } from "@/constants/navigation";
import { LangToggle } from "./LangToggle";

export function Navbar() {
  const { t } = useI18n();
  const [active, setActive] = useState("home");
  const scrolled = useScroll(20);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEscapeKey(closeMenu, menuOpen);

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
            onClick={toggleMenu}
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
                    onClick={closeMenu}
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
