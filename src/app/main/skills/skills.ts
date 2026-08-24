import { Component, inject, AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { SkillsService } from '../../shared/services/skills.service';

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [NgFor, TranslocoPipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit, OnDestroy {
  private readonly skillsService = inject(SkillsService);
  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;

  public readonly skillIcons = this.skillsService.getSkills();

  ngAfterViewInit(): void {
    const card = this.el.nativeElement.querySelector('.skills__info-card');
    if (!card) return;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.classList.add('card-corners-in-view');
            this.observer?.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      this.observer.observe(card);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
