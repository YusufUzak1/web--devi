import { Project } from "../types/project";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch("/data/projects.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Project[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
