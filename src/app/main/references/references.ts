import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ReferenceCard } from './reference-card/reference-card';
import { ReferenceNavigation } from './reference-navigation/reference-navigation';
import { Reference } from '../../shared/models/reference.model';
import { ReferencesService } from '../../shared/services/references.service';

@Component({
  standalone: true,
  selector: 'app-references',
  imports: [CommonModule, ReferenceCard, ReferenceNavigation, TranslocoPipe],
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References implements AfterViewInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  private readonly referencesService = inject(ReferencesService);

  currentIndex = 0;
  private isScrolling = false;
  private scrollTimeout: any;

  references: Reference[] = this.referencesService.getReferences();

  get carouselItems(): Reference[] {
    if (this.references.length === 0) return [];
    const last = this.references[this.references.length - 1];
    const first = this.references[0];
    return [last, ...this.references, first];
  }

  ngAfterViewInit() {
    this.initializeCarousel();
    this.setupScrollListener();
  }

  private initializeCarousel(): void {
    setTimeout(() => {
      this.scrollToActualIndex(0, false);
      this.updateItemOpacity();
    }, 0);
  }

  private setupScrollListener(): void {
    const carousel = this.carouselContainer.nativeElement;
    carousel.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  private handleScroll(): void {
    this.updateCurrentIndex();
    this.updateItemOpacity();
    this.handleInfiniteScroll();
  }

  scrollCarousel(direction: 'left' | 'right') {
    if (direction === 'left') {
      const newIndex = this.currentIndex === 0 ? this.references.length - 1 : this.currentIndex - 1;
      this.scrollToActualIndex(newIndex, true);
    } else {
      const newIndex = this.currentIndex === this.references.length - 1 ? 0 : this.currentIndex + 1;
      this.scrollToActualIndex(newIndex, true);
    }
  }

  scrollToActualIndex(realIndex: number, smooth: boolean = true) {
    const carousel = this.carouselContainer.nativeElement;
    const itemWidth = carousel.querySelector('li')?.clientWidth || 0;
    const carouselIndex = realIndex + 1;

    carousel.scrollTo({
      left: itemWidth * carouselIndex,
      behavior: smooth ? 'smooth' : 'auto',
    });

    this.currentIndex = realIndex;
  }

  private updateCurrentIndex() {
    const carousel = this.carouselContainer.nativeElement;
    const itemWidth = carousel.querySelector('li')?.clientWidth || 0;
    if (itemWidth > 0) {
      const carouselIndex = Math.round(carousel.scrollLeft / itemWidth);
      const realIndex = carouselIndex - 1;

      if (realIndex >= 0 && realIndex < this.references.length) {
        this.currentIndex = realIndex;
      }
    }
  }

  private handleInfiniteScroll(): void {
    const carousel = this.carouselContainer.nativeElement;
    const itemWidth = carousel.querySelector('li')?.clientWidth || 0;

    if (!this.canHandleScroll(itemWidth)) return;

    const carouselIndex = Math.round(carousel.scrollLeft / itemWidth);
    this.scheduleScrollAdjustment(carousel, itemWidth, carouselIndex);
  }

  private canHandleScroll(itemWidth: number): boolean {
    return itemWidth !== 0 && !this.isScrolling;
  }

  private scheduleScrollAdjustment(
    carousel: HTMLElement,
    itemWidth: number,
    carouselIndex: number
  ): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.adjustScrollPosition(carousel, itemWidth, carouselIndex);
    }, 150);
  }

  private adjustScrollPosition(
    carousel: HTMLElement,
    itemWidth: number,
    carouselIndex: number
  ): void {
    const totalItems = this.carouselItems.length;

    if (carouselIndex === 0) {
      this.jumpToPosition(carousel, itemWidth * this.references.length);
    } else if (carouselIndex === totalItems - 1) {
      this.jumpToPosition(carousel, itemWidth * 1);
    }
  }

  private jumpToPosition(carousel: HTMLElement, left: number): void {
    this.isScrolling = true;
    carousel.scrollTo({ left, behavior: 'auto' });
    setTimeout(() => (this.isScrolling = false), 50);
  }

  private updateItemOpacity(): void {
    const carousel = this.carouselContainer.nativeElement;
    const items = carousel.querySelectorAll('.carousel-item');
    const carouselCenter = carousel.offsetWidth / 2;

    items.forEach((item: Element) => {
      this.updateSingleItemOpacity(item as HTMLElement, carousel, carouselCenter);
    });
  }

  private updateSingleItemOpacity(
    item: HTMLElement,
    carousel: HTMLElement,
    carouselCenter: number
  ): void {
    const distance = this.calculateItemDistance(item, carousel, carouselCenter);
    this.applyOpacity(item, carousel, distance);
    this.toggleActiveClass(item, distance);
  }

  private calculateItemDistance(
    item: HTMLElement,
    carousel: HTMLElement,
    carouselCenter: number
  ): number {
    const itemRect = item.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();
    const itemCenter = itemRect.left - carouselRect.left + itemRect.width / 2;
    return Math.abs(carouselCenter - itemCenter);
  }

  private applyOpacity(item: HTMLElement, carousel: HTMLElement, distance: number): void {
    const maxDistance = carousel.offsetWidth / 2;
    const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);
    item.style.opacity = opacity.toString();
  }

  private toggleActiveClass(item: HTMLElement, distance: number): void {
    const itemRect = item.getBoundingClientRect();
    if (distance < itemRect.width / 4) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  }
}
