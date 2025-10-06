import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

@Component({
  standalone: true,
  selector: 'app-project-dialog',
  imports: [CommonModule],
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

  protected formatProjectNumber(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

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
