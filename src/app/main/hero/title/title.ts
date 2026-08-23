import { Component, AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-title',
  imports: [NgFor, TranslocoPipe],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title implements AfterViewInit, OnDestroy {
  callToActions = [
    { translationKey: 'hero.buttons.checkWork', href: '#projects' },
    { translationKey: 'hero.buttons.contact', href: '#contact' },
  ];

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private zone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    if (!window.matchMedia('(hover: none)').matches) return;

    const actions = this.el.nativeElement.querySelector('.hero-title__actions');
    if (!actions) return;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            actions.classList.add('hero-title__actions--in-view');
          } else {
            actions.classList.remove('hero-title__actions--in-view');
          }
        },
        // Only active when element is in the middle third of the viewport
        { rootMargin: '-30% 0px -30% 0px' },
      );
      this.observer.observe(actions);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
