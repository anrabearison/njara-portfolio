import { Mail, Phone, MapPin, LucideIcon } from "lucide-react";

export interface ContactCard {
  icon: LucideIcon;
  labelKey: string;
  value: string;
  href?: string;
}

export const CONTACT_CARDS: ContactCard[] = [
  {
    icon: Mail,
    labelKey: "contact.email",
    value: "rabearisonnjara@gmail.com",
    href: "mailto:rabearisonnjara@gmail.com",
  },
  { icon: Phone, labelKey: "contact.phone", value: "+261 34 74 370 44", href: "tel:+261347437044" },
  { icon: MapPin, labelKey: "contact.location", value: "" }, // value will be set dynamically
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/anrabearison",
    ariaLabel: "GitHub",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rabearison-njara-12114a90/",
    ariaLabel: "LinkedIn",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/261347437044",
    ariaLabel: "WhatsApp",
  },
  {
    name: "Gmail",
    href: "mailto:rabearisonnjara@gmail.com",
    ariaLabel: "Gmail",
  },
] as const;
