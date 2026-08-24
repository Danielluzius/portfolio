import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
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
export class AllProjects implements OnInit, AfterViewInit, OnDestroy {
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);
  private readonly zone = inject(NgZone);
  private cardObserver?: IntersectionObserver;
  private actionsObserver?: IntersectionObserver;

  protected readonly projects: Project[] = this.projectsService.getAllProjects();
  protected openRepoCardIndex: number | null = null;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    const cards: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.project-card');
    if (!cards.length) return;

    this.zone.runOutsideAngular(() => {
      const threshold = window.matchMedia('(max-width: 768px)').matches ? 0.2 : 0.35;
      this.cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            (entry.target as HTMLElement).classList.toggle(
              'bracket-active',
              entry.intersectionRatio >= threshold,
            );
          });
        },
        { threshold },
      );
      cards.forEach((card) => this.cardObserver!.observe(card));
    });

    if (!window.matchMedia('(hover: none)').matches) return;

    const actionsList: NodeListOf<HTMLElement> =
      this.el.nativeElement.querySelectorAll('.project-card__actions');
    this.zone.runOutsideAngular(() => {
      this.actionsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            el.classList.remove('project-card__actions--in-view');
            if (entry.isIntersecting) {
              requestAnimationFrame(() =>
                requestAnimationFrame(() => el.classList.add('project-card__actions--in-view')),
              );
            }
          });
        },
        { threshold: 0.8 },
      );
      actionsList.forEach((el) => this.actionsObserver!.observe(el));
    });
  }

  ngOnDestroy(): void {
    this.cardObserver?.disconnect();
    this.actionsObserver?.disconnect();
  }

  @HostListener('document:click')
  protected onDocumentClick(): void {
    this.openRepoCardIndex = null;
  }

  protected hasTwoRepos(project: Project): boolean {
    return !!project.githubUrl && !!project.backendUrl;
  }

  protected openRepoChoice(index: number, event: Event): void {
    event.stopPropagation();
    this.openRepoCardIndex = index;
  }

  protected closeRepoChoice(): void {
    this.openRepoCardIndex = null;
  }

  goBack(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });
  }
}
