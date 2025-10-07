import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProjectDialog } from './project-dialog/project-dialog';
import { Project } from '../../shared/models/project.model';
import { ProjectsService } from '../../shared/services/projects.service';

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
  private readonly projectsService = inject(ProjectsService);

  protected readonly projects: Project[] = this.projectsService.getProjects();

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
    if (!this.isValidIndex(index) || this.activeDialogIndex !== null) {
      return;
    }

    this.selectedProjectIndex = index;
    this.schedulePreviewPositioning(index, element);
  }

  private isValidIndex(index: number): boolean {
    return index >= 0 && index < this.projects.length;
  }

  private schedulePreviewPositioning(index: number, element: HTMLElement): void {
    setTimeout(() => {
      this.positionPreview(index, element);
    });
  }

  private positionPreview(index: number, element: HTMLElement): void {
    const preview = this.previewRef?.nativeElement;
    const layout = this.layoutRef?.nativeElement;

    if (!preview || !layout) return;

    const targetTop = this.calculateTargetTop(index, element, preview);
    const maxTop = Math.max(0, layout.offsetHeight - preview.offsetHeight);
    this.previewTop = Math.min(Math.max(targetTop, 0), maxTop);
  }

  private calculateTargetTop(index: number, element: HTMLElement, preview: HTMLElement): number {
    const previewHeight = preview.offsetHeight;
    const rowTop = element.offsetTop;
    const rowHeight = element.offsetHeight;

    if (index === this.projects.length - 1) {
      return rowTop + rowHeight - previewHeight;
    } else if (index > 0) {
      return rowTop + rowHeight / 2 - previewHeight / 2;
    }

    return rowTop;
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
