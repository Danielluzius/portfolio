import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './project-info.html',
  styleUrl: './project-info.scss',
})
export class ProjectInfo implements OnChanges, AfterViewInit {
  @Input({ required: true }) project!: Project;
  @Input({ required: true }) projectIndex!: number;

  protected isRepoChoiceOpen = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (!window.matchMedia('(hover: none)').matches) return;
    setTimeout(() => this.triggerEntranceAnimation(), 250);
  }

  private triggerEntranceAnimation(): void {
    const actions = this.el.nativeElement.querySelector('.info__actions');
    if (!actions) return;
    actions.classList.remove('info__actions--in-view');
    // Double RAF ensures the browser paints one frame without the class so transitions replay
    requestAnimationFrame(() => requestAnimationFrame(() => actions.classList.add('info__actions--in-view')));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.isRepoChoiceOpen = false;
    }
  }

  protected formatProjectNumber(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  protected get denseStack(): boolean {
    return this.project.stack.length > 4;
  }

  protected get hasTwoRepos(): boolean {
    return !!this.project.githubUrl && !!this.project.backendUrl;
  }

  /**
   * Switches the GitHub/Live Demo buttons to the Frontend/Backend choice.
   * @protected
   * @param {Event} event - The click event, used to stop propagation to the surrounding actions container.
   */
  protected openRepoChoice(event: Event): void {
    event.stopPropagation();
    // Remove class before state change so new buttons render without it
    this.removeInViewClass();
    this.isRepoChoiceOpen = true;
    setTimeout(() => this.triggerEntranceAnimation(), 300);
  }

  protected closeRepoChoice(): void {
    this.removeInViewClass();
    this.isRepoChoiceOpen = false;
    setTimeout(() => this.triggerEntranceAnimation(), 300);
  }

  private removeInViewClass(): void {
    const actions = this.el.nativeElement.querySelector('.info__actions');
    if (actions) actions.classList.remove('info__actions--in-view');
  }
}
