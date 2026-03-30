import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      title: 'projects.join.title',
      subtitle: 'projects.join.subtitle',
      description: 'projects.join.description',
      technologies: ['Angular', 'TypeScript', 'Python', 'Django REST'],
      stack: [
        {
          label: 'Angular',
          icon: 'assets/icon/skill-icon/angular_icon.png',
          alt: 'Angular icon',
        },
        {
          label: 'TypeScript',
          icon: 'assets/icon/skill-icon/typescript_icon.png',
          alt: 'TypeScript icon',
        },
        {
          label: 'RxJS',
          icon: 'assets/icon/skill-icon/rxjs_icon.png',
          alt: 'RxJS icon',
        },
        {
          label: 'Python',
          icon: 'assets/icon/skill-icon/python_icon.png',
          alt: 'Python icon',
        },
        {
          label: 'Django REST',
          icon: 'assets/icon/skill-icon/django_icon.png',
          alt: 'Django REST Framework icon',
        },
        {
          label: 'PostgreSQL',
          icon: 'assets/icon/skill-icon/postgresql_icon.png',
          alt: 'PostgreSQL icon',
        },
        {
          label: 'Docker',
          icon: 'assets/icon/skill-icon/docker_icon.png',
          alt: 'Docker icon',
        },
      ],
      preview: 'assets/img/projects/join.png',
      previewAlt: 'Join task management application preview',
      githubUrl: 'https://github.com/Danielluzius/join-fullstack',
      liveUrl: 'https://join.danielluzius.dev',
    },
    {
      title: 'projects.coderr.title',
      subtitle: 'projects.coderr.subtitle',
      description: 'projects.coderr.description',
      technologies: ['Python', 'Django REST', 'Docker', 'Nginx'],
      stack: [
        {
          label: 'Python',
          icon: 'assets/icon/skill-icon/python_icon.png',
          alt: 'Python icon',
        },
        {
          label: 'Django REST',
          icon: 'assets/icon/skill-icon/django_icon.png',
          alt: 'Django REST Framework icon',
        },
        {
          label: 'Docker',
          icon: 'assets/icon/skill-icon/docker_icon.png',
          alt: 'Docker icon',
        },
      ],
      preview: 'assets/img/projects/coderr.png',
      previewAlt: 'Coderr freelance marketplace API preview',
      githubUrl: 'https://github.com/Danielluzius/coderr-backend',
      liveUrl: 'https://coderr.danielluzius.dev',
    },
    {
      title: 'projects.pokedex.title',
      subtitle: 'projects.pokedex.subtitle',
      description: 'projects.pokedex.description',
      technologies: ['CSS', 'HTML', 'JavaScript', 'API'],
      stack: [
        {
          label: 'CSS',
          icon: 'assets/icon/skill-icon/css_icon.png',
          alt: 'CSS icon',
        },
        {
          label: 'HTML',
          icon: 'assets/icon/skill-icon/html_icon.png',
          alt: 'HTML icon',
        },
        {
          label: 'JavaScript',
          icon: 'assets/icon/skill-icon/javascript_icon.png',
          alt: 'JavaScript icon',
        },
        {
          label: 'API',
          icon: 'assets/icon/skill-icon/api_icon.png',
          alt: 'API icon',
        },
      ],
      preview: 'assets/img/projects/pokedex.png',
      previewAlt: 'Pokedex application preview',
      githubUrl: 'https://github.com/Danielluzius/pokedex',
      liveUrl: 'https://pokedex.danielluzius.dev',
    },
  ];

  /**
   * Returns all available projects.
   * @returns {Project[]} Array of all projects.
   */
  getProjects(): Project[] {
    return this.projects;
  }

  /**
   * Returns a project by its index.
   * @param {number} index - The index of the project.
   * @returns {Project | null} The project at the given index or null if not found.
   */
  getProjectByIndex(index: number): Project | null {
    if (index < 0 || index >= this.projects.length) {
      return null;
    }
    return this.projects[index];
  }

  /**
   * Returns the total number of projects.
   * @returns {number} The total count of projects.
   */
  getProjectCount(): number {
    return this.projects.length;
  }
}
