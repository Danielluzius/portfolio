import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProjectDialog } from './project-dialog/project-dialog';
import { Project } from '../../shared/models/project.model';
import { ProjectsService } from '../../shared/services/projects.service';
import { BodyScrollService } from '../../shared/services/body-scroll.service';

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

  private readonly projectsService = inject(ProjectsService);
  private readonly bodyScrollService = inject(BodyScrollService);

  protected readonly projects: Project[] = this.projectsService.getProjects();

  protected selectedProjectIndex: number | null = null;
  protected activeDialogIndex: number | null = null;
  protected previewTop = 0;

  /**
   * Angular lifecycle hook that runs when the component is destroyed.
   * Ensures body scroll is unlocked on cleanup.
   */
  ngOnDestroy(): void {
    this.bodyScrollService.unlock();
  }

  /**
   * Gets the currently selected project based on the selected index.
   * @protected
   * @returns {Project | null} The selected project or null if none is selected.
   */
  protected get selectedProject() {
    if (this.selectedProjectIndex === null) {
      return null;
    }

    return this.projects[this.selectedProjectIndex] ?? null;
  }

  /**
   * Gets the project for the currently active dialog based on the active dialog index.
   * @protected
   * @returns {Project | null} The active dialog project or null if no dialog is active.
   */
  protected get activeDialogProject() {
    if (this.activeDialogIndex === null) {
      return null;
    }

    return this.projects[this.activeDialogIndex] ?? null;
  }

  /**
   * Formats a project index as a two-digit string with leading zero.
   * @protected
   * @param {number} index - The project index to format.
   * @returns {string} The formatted project number (e.g., "01", "02").
   */
  protected formatProjectNumber(index: number) {
    return (index + 1).toString().padStart(2, '0');
  }

  /**
   * Shows the project preview for the specified index if valid and no dialog is active.
   * @protected
   * @param {number} index - The index of the project to preview.
   * @param {HTMLElement} element - The HTML element triggering the preview.
   */
  protected showPreview(index: number, element: HTMLElement) {
    if (!this.isValidIndex(index) || this.activeDialogIndex !== null) {
      return;
    }

    this.selectedProjectIndex = index;
    this.schedulePreviewPositioning(index, element);
  }

  /**
   * Validates if the given index is within the valid range of projects.
   * @private
   * @param {number} index - The index to validate.
   * @returns {boolean} True if the index is valid, false otherwise.
   */
  private isValidIndex(index: number): boolean {
    return index >= 0 && index < this.projects.length;
  }

  /**
   * Schedules the preview positioning for the next event loop cycle.
   * @private
   * @param {number} index - The index of the project.
   * @param {HTMLElement} element - The HTML element reference for positioning.
   */
  private schedulePreviewPositioning(index: number, element: HTMLElement): void {
    setTimeout(() => {
      this.positionPreview(index, element);
    });
  }

  /**
   * Positions the preview element based on the project index and element position.
   * @private
   * @param {number} index - The index of the project.
   * @param {HTMLElement} element - The HTML element reference for positioning.
   */
  private positionPreview(index: number, element: HTMLElement): void {
    const preview = this.previewRef?.nativeElement;
    const layout = this.layoutRef?.nativeElement;

    if (!preview || !layout) return;

    const targetTop = this.calculateTargetTop(index, element, preview);
    const maxTop = Math.max(0, layout.offsetHeight - preview.offsetHeight);
    this.previewTop = Math.min(Math.max(targetTop, 0), maxTop);
  }

  /**
   * Calculates the target top position for the preview element.
   * @private
   * @param {number} index - The index of the project.
   * @param {HTMLElement} element - The HTML element reference.
   * @param {HTMLElement} preview - The preview element.
   * @returns {number} The calculated top position in pixels.
   */
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

  /**
   * Hides the project preview if no dialog is currently active.
   * @protected
   */
  protected hidePreview() {
    if (this.activeDialogIndex !== null) {
      return;
    }

    this.selectedProjectIndex = null;
  }

  /**
   * Opens the project dialog for the specified index and locks body scroll.
   * @protected
   * @param {number} index - The index of the project to open in the dialog.
   */
  protected openProjectDialog(index: number) {
    if (index < 0 || index >= this.projects.length) {
      return;
    }

    const wasDialogOpen = this.activeDialogIndex !== null;

    this.activeDialogIndex = index;
    this.selectedProjectIndex = index;

    if (!wasDialogOpen) {
      this.bodyScrollService.lock();
    }
  }

  /**
   * Closes the project dialog and unlocks body scroll.
   * @protected
   */
  protected closeProjectDialog() {
    const wasDialogOpen = this.activeDialogIndex !== null;

    this.activeDialogIndex = null;
    this.selectedProjectIndex = null;

    if (wasDialogOpen) {
      this.bodyScrollService.unlock();
    }
  }

  /**
   * Opens the next project in the list, wrapping to the first project after the last.
   * @protected
   */
  protected openNextProject() {
    if (this.projects.length === 0 || this.activeDialogIndex === null) {
      return;
    }

    const nextIndex = (this.activeDialogIndex + 1) % this.projects.length;
    this.openProjectDialog(nextIndex);
  }

  /**
   * Activates a project when Enter or Space key is pressed (for accessibility).
   * @protected
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {number} index - The index of the project to activate.
   */
  protected activateProject(event: KeyboardEvent, index: number) {
    const keys = ['Enter', ' '];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    this.openProjectDialog(index);
  }

  /**
   * Handles keyboard events to close the dialog when Escape is pressed.
   * @protected
   * @param {KeyboardEvent} event - The keyboard event.
   */
  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || this.activeDialogIndex === null) {
      return;
    }

    event.preventDefault();
    this.closeProjectDialog();
  }
}
