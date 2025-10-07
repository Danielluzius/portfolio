import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      title: 'projects.pokedex.title',
      subtitle: 'projects.pokedex.subtitle',
      description: 'projects.pokedex.description',
      technologies: ['CSS', 'HTML', 'JavaScript'],
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
      previewAlt: 'Join project board preview',
      githubUrl: 'https://github.com/Danielluzius/pokedex',
      liveUrl: 'http://danielluzius.de/pokedex',
    },
    {
      title: 'projects.goblinSlayer.title',
      subtitle: 'projects.goblinSlayer.subtitle',
      description: 'projects.goblinSlayer.description',
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
      ],
      preview: 'assets/img/projects/goblin_slayer.png',
      previewAlt: 'Goblin Slayer gameplay preview',
      githubUrl: 'https://github.com/Danielluzius/elpolloloco',
      liveUrl: 'http://danielluzius.de/goblin_slayer',
    },
    {
      title: 'projects.placeholder.title',
      subtitle: 'projects.placeholder.subtitle',
      description: 'projects.placeholder.description',
      technologies: ['Angular', 'TypeScript', 'Firebase', 'CSS'],
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
          label: 'Firebase',
          icon: 'assets/icon/skill-icon/firebase_icon.png',
          alt: 'Firebase icon',
        },
        {
          label: 'CSS',
          icon: 'assets/icon/skill-icon/css_icon.png',
          alt: 'CSS icon',
        },
      ],
      preview: 'assets/img/projects/placeholder.png',
      previewAlt: 'Placeholder application preview',
      githubUrl: 'https://github.com/Danielluzius',
      liveUrl: 'https://danielluzius.de',
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
