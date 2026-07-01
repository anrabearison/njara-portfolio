export interface Project {
  id: string;
  tags: string[];
  link?: string;
  fallbackLink?: string;
  featured: boolean;
  order: number;
}

export const PROJECTS: Project[] = [
  {
    id: "winlassie",
    tags: ["Angular", "AngularJS", "TypeScript", "Symfony", "RabbitMQ"],
    link: "https://www.winlassie.com/",
    featured: true,
    order: 1,
  },
  {
    id: "illicado",
    tags: ["Node.js", "Express", "REST API", "Database Security", "High Load"],
    link: "https://illicado.com",
    fallbackLink: "https://www.linkedin.com/company/illicado/",
    featured: true,
    order: 2,
  },
  {
    id: "tradepilot",
    tags: ["WordPress", "Symfony", "MariaDB", "Custom Widgets", "API Integration"],
    link: "https://www.eexpand.com/discover-trade-pilot/",
    featured: false,
    order: 4,
  },
  {
    id: "job-market-scraping",
    tags: ["Python", "BeautifulSoup", "Flask", "MariaDB", "Task Automation"],
    featured: false,
    order: 6,
  },
  {
    id: "lean-contact",
    tags: ["PHP", "Symfony", "React.js", "ETL", "VoIP/SMS Integration", "High Availability"],
    featured: true,
    order: 3,
  },
  {
    id: "quantaview",
    tags: ["PHP", "MySQL", "SAS", "Clinical Data Management"],
    featured: false,
    order: 5,
  },
  {
    id: "financial-reporting-engine",
    tags: ["Java", "Spring MVC", "Apache POI", "IBM DB2"],
    featured: false,
    order: 7,
  },
];
