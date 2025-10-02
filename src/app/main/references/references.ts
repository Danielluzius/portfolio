import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

interface Reference {
  name: string;
  role: string;
  text: string;
  image?: string;
}

@Component({
  standalone: true,
  selector: 'app-references',
  imports: [CommonModule],
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References implements AfterViewInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  currentIndex = 0;
  private isScrolling = false;
  private scrollTimeout: any;

  references: Reference[] = [
    {
      name: 'Michael Schmidt',
      role: 'Product Manager at TechCorp',
      text: 'Daniel is an exceptional developer who delivers high-quality work on time. His attention to detail and problem-solving skills are outstanding.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Developer at StartupXYZ',
      text: 'Working with Daniel was a pleasure. He brought fresh ideas to our team and his code is always clean and well-documented.',
    },
    {
      name: 'Thomas Müller',
      role: 'CEO at Digital Solutions',
      text: 'Daniel transformed our vision into reality. His technical expertise and professional approach made our project a great success.',
    },
    {
      name: 'Emma Williams',
      role: 'Project Manager at Innovation Labs',
      text: "A reliable and skilled developer who goes above and beyond. Daniel's communication and dedication to quality are remarkable.",
    },
  ];

  get carouselItems(): Reference[] {
    if (this.references.length === 0) return [];
    const last = this.references[this.references.length - 1];
    const first = this.references[0];
    return [last, ...this.references, first];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToActualIndex(0, false);
      this.updateItemOpacity();
    }, 0);

    const carousel = this.carouselContainer.nativeElement;
    carousel.addEventListener('scroll', () => {
      this.updateCurrentIndex();
      this.updateItemOpacity();
      this.handleInfiniteScroll();
    });
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

  private handleInfiniteScroll() {
    const carousel = this.carouselContainer.nativeElement;
    const itemWidth = carousel.querySelector('li')?.clientWidth || 0;

    if (itemWidth === 0 || this.isScrolling) return;

    const carouselIndex = Math.round(carousel.scrollLeft / itemWidth);
    const totalItems = this.carouselItems.length;

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      if (carouselIndex === 0) {
        this.isScrolling = true;
        carousel.scrollTo({
          left: itemWidth * this.references.length,
          behavior: 'auto',
        });
        setTimeout(() => (this.isScrolling = false), 50);
      } else if (carouselIndex === totalItems - 1) {
        this.isScrolling = true;
        carousel.scrollTo({
          left: itemWidth * 1,
          behavior: 'auto',
        });
        setTimeout(() => (this.isScrolling = false), 50);
      }
    }, 150);
  }

  private updateItemOpacity() {
    const carousel = this.carouselContainer.nativeElement;
    const items = carousel.querySelectorAll('.carousel-item');
    const carouselCenter = carousel.offsetWidth / 2;

    items.forEach((item: Element) => {
      const htmlItem = item as HTMLElement;
      const itemRect = htmlItem.getBoundingClientRect();
      const carouselRect = carousel.getBoundingClientRect();
      const itemCenter = itemRect.left - carouselRect.left + itemRect.width / 2;
      const distance = Math.abs(carouselCenter - itemCenter);
      const maxDistance = carousel.offsetWidth / 2;

      const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);
      htmlItem.style.opacity = opacity.toString();

      // Add active class to center item
      if (distance < itemRect.width / 4) {
        htmlItem.classList.add('active');
      } else {
        htmlItem.classList.remove('active');
      }
    });
  }
}
