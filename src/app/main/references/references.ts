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

  /**
   * Gets the carousel items with cloned first and last elements for infinite scrolling.
   * Creates a seamless loop by adding the last item at the beginning and first item at the end.
   * @returns {Reference[]} Array of references with duplicated boundary items
   */
  get carouselItems(): Reference[] {
    if (this.references.length === 0) return [];
    const last = this.references[this.references.length - 1];
    const first = this.references[0];
    return [last, ...this.references, first];
  }

  /**
   * Angular lifecycle hook that is called after the view has been initialized.
   * Initializes the carousel and sets up the scroll listener.
   */
  ngAfterViewInit() {
    this.initializeCarousel();
    this.setupScrollListener();
  }

  /**
   * Initializes the carousel by scrolling to the first item and setting initial opacity.
   * Uses setTimeout to ensure DOM elements are fully rendered before manipulation.
   * @private
   */
  private initializeCarousel(): void {
    setTimeout(() => {
      this.scrollToActualIndex(0, false);
      this.updateItemOpacity();
    }, 0);
  }

  /**
   * Sets up the scroll event listener for the carousel container.
   * @private
   */
  private setupScrollListener(): void {
    const carousel = this.carouselContainer.nativeElement;
    carousel.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  /**
   * Handles scroll events on the carousel.
   * Updates the current index, item opacity, and manages infinite scrolling behavior.
   * @private
   */
  private handleScroll(): void {
    this.updateCurrentIndex();
    this.updateItemOpacity();
    this.handleInfiniteScroll();
  }

  /**
   * Scrolls the carousel in the specified direction.
   * Wraps around to the beginning or end for seamless navigation.
   * @param {('left' | 'right')} direction - The direction to scroll the carousel
   */
  scrollCarousel(direction: 'left' | 'right') {
    if (direction === 'left') {
      const newIndex = this.currentIndex === 0 ? this.references.length - 1 : this.currentIndex - 1;
      this.scrollToActualIndex(newIndex, true);
    } else {
      const newIndex = this.currentIndex === this.references.length - 1 ? 0 : this.currentIndex + 1;
      this.scrollToActualIndex(newIndex, true);
    }
  }

  /**
   * Scrolls the carousel to a specific index.
   * @param {number} realIndex - The index to scroll to (0-based)
   * @param {boolean} [smooth=true] - Whether to use smooth scrolling animation
   */
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

  /**
   * Updates the current index based on the carousel's scroll position.
   * Calculates which item is currently centered in the viewport.
   * @private
   */
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

  /**
   * Handles infinite scroll behavior by jumping to the opposite end when reaching boundaries.
   * Creates a seamless loop effect for the carousel.
   * @private
   */
  private handleInfiniteScroll(): void {
    const carousel = this.carouselContainer.nativeElement;
    const itemWidth = carousel.querySelector('li')?.clientWidth || 0;

    if (!this.canHandleScroll(itemWidth)) return;

    const carouselIndex = Math.round(carousel.scrollLeft / itemWidth);
    this.scheduleScrollAdjustment(carousel, itemWidth, carouselIndex);
  }

  /**
   * Checks if the carousel can handle scroll adjustments.
   * Prevents handling if item width is zero or if a scroll is already in progress.
   * @private
   * @param {number} itemWidth - The width of a carousel item
   * @returns {boolean} True if scroll can be handled, false otherwise
   */
  private canHandleScroll(itemWidth: number): boolean {
    return itemWidth !== 0 && !this.isScrolling;
  }

  /**
   * Schedules a scroll position adjustment after a delay.
   * Debounces rapid scroll events to ensure smooth transitions.
   * @private
   * @param {HTMLElement} carousel - The carousel container element
   * @param {number} itemWidth - The width of a carousel item
   * @param {number} carouselIndex - The current carousel index
   */
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

  /**
   * Adjusts the scroll position when reaching carousel boundaries.
   * Jumps to the opposite end to create an infinite loop effect.
   * @private
   * @param {HTMLElement} carousel - The carousel container element
   * @param {number} itemWidth - The width of a carousel item
   * @param {number} carouselIndex - The current carousel index
   */
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

  /**
   * Jumps the carousel to a specific scroll position instantly.
   * Sets a flag to prevent scroll event handling during the jump.
   * @private
   * @param {HTMLElement} carousel - The carousel container element
   * @param {number} left - The left scroll position to jump to
   */
  private jumpToPosition(carousel: HTMLElement, left: number): void {
    this.isScrolling = true;
    carousel.scrollTo({ left, behavior: 'auto' });
    setTimeout(() => (this.isScrolling = false), 50);
  }

  /**
   * Updates the opacity of all carousel items based on their distance from the center.
   * Creates a visual effect where the centered item is fully opaque and others fade out.
   * @private
   */
  private updateItemOpacity(): void {
    const carousel = this.carouselContainer.nativeElement;
    const items = carousel.querySelectorAll('.carousel-item');
    const carouselCenter = carousel.offsetWidth / 2;

    items.forEach((item: Element) => {
      this.updateSingleItemOpacity(item as HTMLElement, carousel, carouselCenter);
    });
  }

  /**
   * Updates the opacity and active state of a single carousel item.
   * @private
   * @param {HTMLElement} item - The carousel item to update
   * @param {HTMLElement} carousel - The carousel container element
   * @param {number} carouselCenter - The center position of the carousel
   */
  private updateSingleItemOpacity(
    item: HTMLElement,
    carousel: HTMLElement,
    carouselCenter: number
  ): void {
    const distance = this.calculateItemDistance(item, carousel, carouselCenter);
    this.applyOpacity(item, carousel, distance);
    this.toggleActiveClass(item, distance);
  }

  /**
   * Calculates the distance of a carousel item from the center of the carousel.
   * @private
   * @param {HTMLElement} item - The carousel item
   * @param {HTMLElement} carousel - The carousel container element
   * @param {number} carouselCenter - The center position of the carousel
   * @returns {number} The absolute distance from the center
   */
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

  /**
   * Applies opacity to a carousel item based on its distance from the center.
   * Items closer to the center have higher opacity (max 1.0), farther items fade to 0.6.
   * @private
   * @param {HTMLElement} item - The carousel item to apply opacity to
   * @param {HTMLElement} carousel - The carousel container element
   * @param {number} distance - The distance of the item from the carousel center
   */
  private applyOpacity(item: HTMLElement, carousel: HTMLElement, distance: number): void {
    const maxDistance = carousel.offsetWidth / 2;
    const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);
    item.style.opacity = opacity.toString();
  }

  /**
   * Toggles the 'active' class on a carousel item based on its distance from the center.
   * Adds the class if the item is within a quarter of its width from the center.
   * @private
   * @param {HTMLElement} item - The carousel item to toggle the class on
   * @param {number} distance - The distance of the item from the carousel center
   */
  private toggleActiveClass(item: HTMLElement, distance: number): void {
    const itemRect = item.getBoundingClientRect();
    if (distance < itemRect.width / 4) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  }
}
