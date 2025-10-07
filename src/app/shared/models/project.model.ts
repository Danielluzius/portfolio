export interface ProjectStack {
  label: string;
  icon: string;
  alt: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  stack: ProjectStack[];
  preview: string;
  previewAlt: string;
  githubUrl?: string;
  liveUrl?: string;
}
