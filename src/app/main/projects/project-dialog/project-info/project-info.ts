import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  protected formatProjectNumber(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }
}
