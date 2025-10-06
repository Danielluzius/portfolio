import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../project-dialog';

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [CommonModule],
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
