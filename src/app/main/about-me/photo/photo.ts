import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  inject,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-photo',
  imports: [],
  templateUrl: './photo.html',
  styleUrl: './photo.scss',
})
export class Photo implements AfterViewInit, OnDestroy {
  @ViewChild('photoElement') photoElement!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!this.photoElement) return;
    const element = this.photoElement.nativeElement;

    this.zone.runOutsideAngular(() => {
      const isMobile = window.matchMedia('(max-width: 1200px)').matches;
      const threshold = isMobile ? 0.15 : 0.25;
      this.observer = new IntersectionObserver(
        ([entry]) => {
          element.classList.toggle('photo-visible', entry.intersectionRatio >= threshold);
        },
        { threshold },
      );
      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
