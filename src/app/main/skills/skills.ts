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
  private iconsObserver?: IntersectionObserver;
  public readonly skillIcons = this.skillsService.getSkills();

  private btnObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    const card = this.el.nativeElement.querySelector('.skills__info-card');
    if (!card) return;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          card.classList.toggle('bracket-active', entry.intersectionRatio >= 0.75);
        },
        { threshold: 0.75 },
      );
      this.observer.observe(card);
    });

    const icons = this.el.nativeElement.querySelector('.skills__icons-grid');
    if (icons) {
      this.zone.runOutsideAngular(() => {
        this.iconsObserver = new IntersectionObserver(
          ([entry]) => {
            icons.classList.toggle('icons-visible', entry.intersectionRatio >= 0.25);
          },
          { threshold: 0.25 },
        );
        this.iconsObserver.observe(icons);
      });
    }

    if (!window.matchMedia('(hover: none)').matches) return;

    const btn = this.el.nativeElement.querySelector('.skills__cta-button');
    if (!btn) return;

    this.zone.runOutsideAngular(() => {
      this.btnObserver = new IntersectionObserver(
        ([entry]) => {
          btn.classList.toggle('skills__cta-button--in-view', entry.isIntersecting);
        },
        { rootMargin: '-15% 0px -15% 0px' },
      );
      this.btnObserver.observe(btn);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.iconsObserver?.disconnect();
    this.btnObserver?.disconnect();
  }
}
