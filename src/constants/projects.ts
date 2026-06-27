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
    tags: ["Python", "BeautifulSoup", "Symfony", "MariaDB", "Task Automation"],
  },
];
