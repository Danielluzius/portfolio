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

  protected setNextHover(state: boolean): void {
    this.isNextHovered = state;
  }

  protected onClose(): void {
    this.close.emit();
  }

  protected onNext(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.nextProject.emit();
  }

  protected onBackdropClick(): void {
    this.onClose();
  }

  protected onDialogClick(event: Event): void {
    event.stopPropagation();
  }
}
