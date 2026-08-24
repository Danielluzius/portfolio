import { CommonModule } from '@angular/common';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProjectInfo } from './project-info/project-info';
import { Project } from '../../../shared/models/project.model';

const FADE_DURATION = '250ms ease-in-out';

@Component({
  standalone: true,
  selector: 'app-project-dialog',
  imports: [CommonModule, TranslocoPipe, ProjectInfo],
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
  animations: [
    trigger('contentState', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate(FADE_DURATION)),
      transition('hidden => visible', animate(FADE_DURATION)),
    ]),
  ],
})
export class ProjectDialog implements OnInit, OnChanges {
  @Input() project: Project | null = null;
  @Input() projectIndex: number | null = null;
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();
  @Output() nextProject = new EventEmitter<void>();

  protected isNextHovered = false;
  protected displayedProject: Project | null = null;
  protected displayedIndex: number | null = null;
  protected contentState: 'visible' | 'hidden' = 'visible';

  private isAnimating = false;
  private pendingProject: Project | null = null;
  private pendingIndex: number | null = null;

  ngOnInit(): void {
    this.displayedProject = this.project;
    this.displayedIndex = this.projectIndex;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] || changes['projectIndex']) {
      if (this.isAnimating) {
        this.pendingProject = this.project;
        this.pendingIndex = this.projectIndex;
      } else {
        this.displayedProject = this.project;
        this.displayedIndex = this.projectIndex;
      }
    }
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
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.nextProject.emit();
    this.contentState = 'hidden';
  }

  // only attached to one element to avoid double-triggering
  protected onContentAnimDone(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this.displayedProject = this.pendingProject ?? this.project;
      this.displayedIndex = this.pendingIndex ?? this.projectIndex;
      this.pendingProject = null;
      this.pendingIndex = null;
      this.contentState = 'visible';
    } else if (event.toState === 'visible') {
      this.isAnimating = false;
    }
  }

  protected onBackdropClick(): void {
    this.onClose();
  }

  protected onDialogClick(event: Event): void {
    event.stopPropagation();
  }
}
