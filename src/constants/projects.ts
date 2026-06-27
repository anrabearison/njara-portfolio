export interface Project {
  id: string;
  tags: string[];
  link?: string;
  fallbackLink?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "winlassie",
    tags: ["Angular", "AngularJS", "TypeScript", "Webpack", "Performance Optimization"],
    link: "https://www.winlassie.com/",
  },
  {
    id: "illicado",
    tags: ["Node.js", "Express", "REST API", "Database Security", "High Load"],
    link: "https://illicado.com",
    fallbackLink: "https://www.linkedin.com/company/illicado/",
  },
  {
    id: "tradepilot",
    tags: ["WordPress", "Symfony", "MariaDB", "Custom Plugins", "API Integration"],
    link: "https://www.eexpand.com/discover-trade-pilot/",
  },
  {
    id: "job-market-scraping",
    tags: ["Python", "BeautifulSoup", "Flask", "MariaDB", "Task Automation"],
  },
];
