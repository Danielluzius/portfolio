import { Component, AfterViewInit, OnDestroy, ElementRef, NgZone, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-who-i-am',
  imports: [TranslocoPipe],
  templateUrl: './who-i-am.html',
  styleUrl: './who-i-am.scss',
})
export class WhoIAm implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const card = this.el.nativeElement.querySelector('.about-me__card');
    if (!card) return;

    this.zone.runOutsideAngular(() => {
      const isMobile = window.matchMedia('(max-width: 1200px)').matches;
      const threshold = isMobile ? 0.3 : 0.75;
      this.observer = new IntersectionObserver(
        ([entry]) => {
          card.classList.toggle('bracket-active', entry.intersectionRatio >= threshold);
        },
        { threshold },
      );
      this.observer.observe(card);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
