import { Server, Code2, Sparkles, Database, Wrench, Layers } from "lucide-react";

export const SKILL_GROUPS = [
  {
    titleKey: "skills.group.backend",
    icon: Server,
    items: ["NestJS", "Node.js", "TypeScript", "Java (Spring Boot)", "PHP (Symfony)", "Spring MVC", "REST API", "Microservices"],
  },
  {
    titleKey: "skills.group.frontend",
    icon: Code2,
    items: ["React.js", "Angular", "AngularJS", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    titleKey: "skills.group.ai",
    icon: Sparkles,
    items: ["Cursor", "GitHub Copilot", "Antigravity", "AI-assisted development", "RAG", "Machine Learning"],
  },
  {
    titleKey: "skills.group.db",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL", "MariaDB", "Oracle SQL", "IBM DB2"],
  },
  {
    titleKey: "skills.group.devops",
    icon: Wrench,
    items: ["Docker", "Git", "Jenkins", "GitLab CI/CD", "Apache POI", "Postman", "Python (BeautifulSoup)"],
  },
  {
    titleKey: "skills.group.methods",
    icon: Layers,
    items: ["Agile Scrum", "TDD", "Clean Architecture", "DDD", "ETL / Data Mapping", "UML"],
  },
] as const;
