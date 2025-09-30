import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  @ViewChild('projectsLayout', { static: true })
  private layoutRef!: ElementRef<HTMLElement>;

  @ViewChild('projectsPreview', { static: true })
  private previewRef!: ElementRef<HTMLElement>;

  protected readonly projects = [
    {
      title: 'Pokedex',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      preview: 'assets/img/projects/pokedex.png',
      previewAlt: 'Placeholder preview for Pokedex project',
    },
    {
      title: 'Goblin Slayer',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      preview: 'assets/img/projects/goblin_slayer.png',
      previewAlt: 'Placeholder preview for Goblin Slayer project',
    },
    {
      title: 'Placeholder Project',
      technologies: ['Angular', 'Firebase', 'TypeScript'],
      preview: 'assets/img/projects/placeholder.png',
      previewAlt: 'Placeholder preview for Placeholder Project',
    },
  ];

  protected selectedProjectIndex: number | null = null;
  protected previewTop = 0;

  protected get selectedProject() {
    if (this.selectedProjectIndex === null) {
      return null;
    }

    return this.projects[this.selectedProjectIndex] ?? null;
  }

  protected showPreview(index: number, element: HTMLElement) {
    if (index < 0 || index >= this.projects.length) {
      return;
    }

    this.selectedProjectIndex = index;

    setTimeout(() => {
      const preview = this.previewRef?.nativeElement;
      const layout = this.layoutRef?.nativeElement;
      if (!preview || !layout) {
        return;
      }

      const previewHeight = preview.offsetHeight;
      const layoutHeight = layout.offsetHeight;
      const rowTop = element.offsetTop;
      const rowHeight = element.offsetHeight;
      const rowBottom = rowTop + rowHeight;

      let targetTop = rowTop;

      if (index === this.projects.length - 1) {
        targetTop = rowBottom - previewHeight;
      } else if (index > 0) {
        targetTop = rowTop + rowHeight / 2 - previewHeight / 2;
      }

      const maxTop = Math.max(0, layoutHeight - previewHeight);
      this.previewTop = Math.min(Math.max(targetTop, 0), maxTop);
    });
  }

  protected hidePreview() {
    this.selectedProjectIndex = null;
  }
}
