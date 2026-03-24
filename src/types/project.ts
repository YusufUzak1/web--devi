export type Category = "All" | "Web" | "Mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  year: number;
  category: Category | string;
  featured: boolean;
  image: string;
}

export interface FilterState {
  searchQuery: string;
  category: Category;
  sortBy: "year" | "title" | "default";
}
