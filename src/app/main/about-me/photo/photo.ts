import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-photo',
  imports: [],
  templateUrl: './photo.html',
  styleUrl: './photo.scss',
})
export class Photo implements AfterViewInit {
  @ViewChild('photoElement') photoElement!: ElementRef<HTMLElement>;
  hasBeenHovered = false;

  ngAfterViewInit(): void {
    this.setupHoverEffect();
  }

  private setupHoverEffect(): void {
    if (!this.photoElement) return;

    const element = this.photoElement.nativeElement;
    const handleHover = this.createHoverHandler(element);
    element.addEventListener('mouseenter', handleHover);
  }

  private createHoverHandler(element: HTMLElement): () => void {
    return () => {
      if (this.hasBeenHovered) return;
      this.applyHoverState(element);
    };
  }

  private applyHoverState(element: HTMLElement): void {
    this.hasBeenHovered = true;
    element.classList.add('hovered');
    element.removeEventListener('mouseenter', this.createHoverHandler(element));
  }
}
