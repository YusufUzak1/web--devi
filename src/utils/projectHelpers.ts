import { Project, Category } from "../types/project";

export const filterBySearch = (projects: Project[], query: string): Project[] => {
  if (!query) return projects;
  const lowerQuery = query.toLowerCase();
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.tech.some((t) => t.toLowerCase().includes(lowerQuery))
  );
};

export const filterByCategory = (projects: Project[], category: Category): Project[] => {
  if (category === "All") return projects;
  return projects.filter((project) => project.category === category);
};

export const sortProjects = (projects: Project[], sortBy: "year" | "title" | "default"): Project[] => {
  const projectsCopy = [...projects];
  if (sortBy === "year") {
    return projectsCopy.sort((a, b) => b.year - a.year); // Descending year
  }
  if (sortBy === "title") {
    return projectsCopy.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetical title
  }
  return projectsCopy;
};
