import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './project-info.html',
  styleUrl: './project-info.scss',
})
export class ProjectInfo {
  @Input({ required: true }) project!: Project;
  @Input({ required: true }) projectIndex!: number;

  protected isRepoChoiceOpen = false;

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
   * @param {Event} event - The click event, used to stop propagation to the document listener.
   */
  protected openRepoChoice(event: Event): void {
    event.stopPropagation();
    this.isRepoChoiceOpen = true;
  }

  /**
   * Switches the Frontend/Backend/close buttons back to GitHub/Live Demo.
   * @protected
   * @param {Event} event - The click event, used to stop propagation to the document listener.
   */
  protected closeRepoChoice(event: Event): void {
    event.stopPropagation();
    this.isRepoChoiceOpen = false;
  }

  /**
   * Closes the Frontend/Backend choice when clicking anywhere outside of it.
   */
  @HostListener('document:click')
  protected onDocumentClick(): void {
    this.isRepoChoiceOpen = false;
  }
}
