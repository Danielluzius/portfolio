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
      this.observer = new IntersectionObserver(
        ([entry]) => {
          element.classList.toggle('photo-visible', entry.intersectionRatio >= 0.25);
        },
        { threshold: 0.25 },
      );
      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
