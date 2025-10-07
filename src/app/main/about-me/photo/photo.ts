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

  /**
   * Angular lifecycle hook that is called after the view has been initialized.
   * Sets up the hover effect for the photo element.
   */
  ngAfterViewInit(): void {
    this.setupHoverEffect();
  }

  /**
   * Initializes the hover effect for the photo element.
   * Attaches a mouseenter event listener that triggers on first hover.
   * @private
   */
  private setupHoverEffect(): void {
    if (!this.photoElement) return;

    const element = this.photoElement.nativeElement;
    const handleHover = this.createHoverHandler(element);
    element.addEventListener('mouseenter', handleHover);
  }

  /**
   * Creates a hover event handler for the specified element.
   * The handler applies hover state only once and prevents subsequent triggers.
   * @private
   * @param {HTMLElement} element - The HTML element to create the hover handler for
   * @returns {() => void} A function that handles the hover event
   */
  private createHoverHandler(element: HTMLElement): () => void {
    return () => {
      if (this.hasBeenHovered) return;
      this.applyHoverState(element);
    };
  }

  /**
   * Applies the hover state to the element.
   * Adds the 'hovered' CSS class and removes the mouseenter event listener.
   * @private
   * @param {HTMLElement} element - The HTML element to apply the hover state to
   */
  private applyHoverState(element: HTMLElement): void {
    this.hasBeenHovered = true;
    element.classList.add('hovered');
    element.removeEventListener('mouseenter', this.createHoverHandler(element));
  }
}
