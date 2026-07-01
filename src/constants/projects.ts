export interface Project {
  id: string;
  tags: string[];
  link?: string;
  fallbackLink?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "winlassie",
    tags: ["Angular", "AngularJS", "TypeScript", "Symfony", "RabbitMQ"],
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
  {
    id: "lean-contact",
    tags: ["PHP", "Symfony", "React.js", "ETL", "VoIP/SMS Integration", "High Availability"],
  },
  {
    id: "quantaview",
    tags: ["PHP", "MySQL", "SAS", "Clinical Data Management"],
  },
  {
    id: "financial-reporting-engine",
    tags: ["Java", "Spring MVC", "Apache POI", "IBM DB2"],
  },
];
