import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Footer } from '../../../shared/footer/footer';
import { Project } from '../../../shared/models/project.model';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CommonModule, Footer, TranslocoPipe],
  templateUrl: './all-projects.html',
  styleUrl: './all-projects.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AllProjects implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);

  protected readonly projects: Project[] = this.projectsService.getAllProjects();

  /**
   * Angular lifecycle hook that runs after the component is initialized.
   * Scrolls the page to the top when the page is displayed.
   */
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Navigates back to the home page and scrolls to the top.
   */
  goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
}
