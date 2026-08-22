import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './project-info.html',
  styleUrl: './project-info.scss',
})
export class ProjectInfo implements OnChanges {
  @Input({ required: true }) project!: Project;
  @Input({ required: true }) projectIndex!: number;

  protected isRepoChoiceOpen = false;

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
    this.isRepoChoiceOpen = true;
  }

  /**
   * Switches the Frontend/Backend/close buttons back to GitHub/Live Demo.
   * @protected
   */
  protected closeRepoChoice(): void {
    this.isRepoChoiceOpen = false;
  }
}
