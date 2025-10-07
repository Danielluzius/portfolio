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
    if (this.photoElement) {
      const element = this.photoElement.nativeElement;

      const handleHover = () => {
        if (!this.hasBeenHovered) {
          this.hasBeenHovered = true;
          element.classList.add('hovered');
          element.removeEventListener('mouseenter', handleHover);
        }
      };

      element.addEventListener('mouseenter', handleHover);
    }
  }
}
