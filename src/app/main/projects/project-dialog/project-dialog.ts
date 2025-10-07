import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProjectInfo } from './project-info/project-info';
import { Project } from '../../../shared/models/project.model';

@Component({
  standalone: true,
  selector: 'app-project-dialog',
  imports: [CommonModule, TranslocoPipe, ProjectInfo],
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
})
export class ProjectDialog {
  @Input() project: Project | null = null;
  @Input() projectIndex: number | null = null;
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();
  @Output() nextProject = new EventEmitter<void>();

  protected isNextHovered = false;

  /**
   * Sets the hover state for the next button.
   * @protected
   * @param {boolean} state - The hover state to set (true for hovered, false for not hovered)
   */
  protected setNextHover(state: boolean): void {
    this.isNextHovered = state;
  }

  /**
   * Handles the close action of the dialog.
   * Emits the close event to notify parent components.
   * @protected
   */
  protected onClose(): void {
    this.close.emit();
  }

  /**
   * Handles the next project action.
   * Prevents default event behavior and emits the nextProject event.
   * @protected
   * @param {Event} [event] - Optional event object to prevent default behavior and propagation
   */
  protected onNext(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.nextProject.emit();
  }

  /**
   * Handles clicks on the dialog backdrop.
   * Closes the dialog when the backdrop is clicked.
   * @protected
   */
  protected onBackdropClick(): void {
    this.onClose();
  }

  /**
   * Handles clicks on the dialog content itself.
   * Stops event propagation to prevent the backdrop click handler from triggering.
   * @protected
   * @param {Event} event - The click event to stop propagation for
   */
  protected onDialogClick(event: Event): void {
    event.stopPropagation();
  }
}
