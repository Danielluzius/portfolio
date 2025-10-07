import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project, ProjectDialog } from './project-dialog/project-dialog';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule, ProjectDialog, TranslocoPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnDestroy {
  @ViewChild('projectsLayout', { static: true })
  private layoutRef!: ElementRef<HTMLElement>;

  @ViewChild('projectsPreview', { static: true })
  private previewRef!: ElementRef<HTMLElement>;

  private readonly bodyScrollClass = 'body--no-scroll';

  protected readonly projects: Project[] = [
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
      githubUrl: 'https://github.com/Danielluzius',
      liveUrl: 'https://danielluzius.de',
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
      githubUrl: 'https://github.com/Danielluzius',
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

  protected selectedProjectIndex: number | null = null;
  protected activeDialogIndex: number | null = null;
  protected previewTop = 0;

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private readonly renderer: Renderer2
  ) {}

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  protected get selectedProject() {
    if (this.selectedProjectIndex === null) {
      return null;
    }

    return this.projects[this.selectedProjectIndex] ?? null;
  }

  protected get activeDialogProject() {
    if (this.activeDialogIndex === null) {
      return null;
    }

    return this.projects[this.activeDialogIndex] ?? null;
  }

  protected formatProjectNumber(index: number) {
    return (index + 1).toString().padStart(2, '0');
  }

  protected showPreview(index: number, element: HTMLElement) {
    if (index < 0 || index >= this.projects.length) {
      return;
    }

    this.selectedProjectIndex = index;

    if (this.activeDialogIndex !== null) {
      return;
    }

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
    if (this.activeDialogIndex !== null) {
      return;
    }

    this.selectedProjectIndex = null;
  }

  protected openProjectDialog(index: number) {
    if (index < 0 || index >= this.projects.length) {
      return;
    }

    const wasDialogOpen = this.activeDialogIndex !== null;

    this.activeDialogIndex = index;
    this.selectedProjectIndex = index;

    if (!wasDialogOpen) {
      this.lockBodyScroll();
    }
  }

  protected closeProjectDialog() {
    const wasDialogOpen = this.activeDialogIndex !== null;

    this.activeDialogIndex = null;
    this.selectedProjectIndex = null;

    if (wasDialogOpen) {
      this.unlockBodyScroll();
    }
  }

  protected openNextProject() {
    if (this.projects.length === 0 || this.activeDialogIndex === null) {
      return;
    }

    const nextIndex = (this.activeDialogIndex + 1) % this.projects.length;
    this.openProjectDialog(nextIndex);
  }

  protected activateProject(event: KeyboardEvent, index: number) {
    const keys = ['Enter', ' '];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    this.openProjectDialog(index);
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || this.activeDialogIndex === null) {
      return;
    }

    event.preventDefault();
    this.closeProjectDialog();
  }

  private lockBodyScroll() {
    const body = this.documentRef.body;
    if (!body || body.classList.contains(this.bodyScrollClass)) {
      return;
    }

    this.renderer.addClass(body, this.bodyScrollClass);
  }

  private unlockBodyScroll() {
    const body = this.documentRef.body;
    if (!body || !body.classList.contains(this.bodyScrollClass)) {
      return;
    }

    this.renderer.removeClass(body, this.bodyScrollClass);
  }
}
