import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Reference {
  id: number;
  quote: string;
  author: string;
  role: string;
}

type ReferenceSlide = Reference & {
  id: number;
  isActive: boolean;
  position: number;
};

@Component({
  standalone: true,
  selector: 'app-references',
  imports: [CommonModule],
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References {
  readonly references: Reference[] = [
    {
      id: 1,
      quote: 'Our project benefited enormously from Daniel’s efficient way of working.',
      author: 'T. Schulz',
      role: 'Frontend Developer',
    },
    {
      id: 2,
      quote:
        'Daniel has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.',
      author: 'H. Janisch',
      role: 'Team Partner',
    },
    {
      id: 3,
      quote:
        'I had the good fortune of working with Daniel in a demanding group project. He stayed calm, focused, and ensured our team was set up for success. I’d gladly collaborate with him again.',
      author: 'A. Fischer',
      role: 'Team Partner',
    },
  ];

  private readonly visibleOffsets = [-1, 0, 1];
  currentIndex = 0;

  get slides(): ReferenceSlide[] {
    return this.visibleOffsets.map((offset, slotIndex) => {
      const index = this.getWrappedIndex(this.currentIndex + offset);
      const reference = this.references[index];

      return {
        ...reference,
        id: reference.id,
        isActive: slotIndex === 1,
        position: offset,
      } as ReferenceSlide;
    });
  }

  showPrevious(): void {
    this.currentIndex = this.getWrappedIndex(this.currentIndex - 1);
  }

  showNext(): void {
    this.currentIndex = this.getWrappedIndex(this.currentIndex + 1);
  }

  goToSlide(index: number): void {
    this.currentIndex = this.getWrappedIndex(index);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.showNext();
    }
  }

  trackBySlide = (_index: number, slide: ReferenceSlide): string => `${slide.id}-${slide.position}`;

  private getWrappedIndex(index: number): number {
    const { length } = this.references;
    return (index + length) % length;
  }
}
