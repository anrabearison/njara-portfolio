import { memo } from "react";
import { useI18n } from "@/lib/i18n/index";

export const Footer = memo(function Footer() {
  const { t } = useI18n();
  return (
    <footer
      className="border-t px-4 py-8 text-center text-xs sm:text-sm text-muted-foreground sm:px-6"
      style={{ borderImage: "linear-gradient(90deg, transparent, #00D4FF66, transparent) 1" }}
    >
      {t("footer.text")}
    </footer>
  );
});
