import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  HostListener,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/header/header';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('portfolio');

  @ViewChild('cursorShadow') cursorShadow!: ElementRef<HTMLDivElement>;
  private isTouchDevice = false;

  /**
   * Creates an instance of the App component.
   * @param {Renderer2} renderer - Angular's Renderer2 service for safe DOM manipulation.
   */
  constructor(private renderer: Renderer2) {
    this.detectTouchDevice();
  }

  /**
   * Detects if the user is on a touch device and adds appropriate CSS class.
   * @private
   */
  private detectTouchDevice(): void {
    this.isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;

    if (this.isTouchDevice) {
      this.renderer.addClass(document.body, 'touch-device');
    }
  }

  /**
   * Angular lifecycle hook that runs after the view has been initialized.
   * Initializes the custom cursor position.
   */
  ngAfterViewInit() {
    if (!this.isTouchDevice) {
      this.initializeCursor();
    }
  }

  /**
   * Angular lifecycle hook that runs when the component is destroyed.
   * Used for cleanup operations.
   */
  ngOnDestroy() {}

  /**
   * Handles mouse move events on the document to update cursor position and hover state.
   * @param {MouseEvent} event - The mouse move event.
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isTouchDevice) return;
    this.updateCursorPosition(event.clientX, event.clientY);
    this.checkHoverState(event);
  }

  /**
   * Handles mouse leave events to hide the custom cursor.
   */
  @HostListener('document:mouseleave')
  onMouseLeave() {
    if (this.isTouchDevice) return;
    this.renderer.addClass(document.body, 'cursor-hidden');
  }

  /**
   * Handles mouse enter events to show the custom cursor.
   */
  @HostListener('document:mouseenter')
  onMouseEnter() {
    if (this.isTouchDevice) return;
    this.renderer.removeClass(document.body, 'cursor-hidden');
  }

  /**
   * Initializes the custom cursor at the center of the viewport.
   * @private
   */
  private initializeCursor(): void {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    this.updateCursorPosition(centerX, centerY);
  }

  /**
   * Updates the position of the custom cursor shadow element.
   * @private
   * @param {number} x - The x-coordinate for the cursor position.
   * @param {number} y - The y-coordinate for the cursor position.
   */
  private updateCursorPosition(x: number, y: number): void {
    if (!this.cursorShadow) return;
    this.renderer.setStyle(this.cursorShadow.nativeElement, 'left', `${x}px`);
    this.renderer.setStyle(this.cursorShadow.nativeElement, 'top', `${y}px`);
  }

  /**
   * Checks if the mouse is hovering over an interactive element and updates cursor state.
   * @private
   * @param {MouseEvent} event - The mouse event to check.
   */
  private checkHoverState(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isInteractive = this.isInteractiveElement(target);
    this.toggleCursorHoverClass(isInteractive);
  }

  /**
   * Determines if the target element is interactive (clickable, input, etc.).
   * @private
   * @param {HTMLElement} target - The target element to check.
   * @returns {boolean} True if the element is interactive, false otherwise.
   */
  private isInteractiveElement(target: HTMLElement): boolean {
    return !!target.closest('a, button, [role="button"], input, textarea, select, .clickable');
  }

  /**
   * Toggles the hover class on the cursor shadow element.
   * @private
   * @param {boolean} isHovering - Whether the cursor is hovering over an interactive element.
   */
  private toggleCursorHoverClass(isHovering: boolean): void {
    const method = isHovering ? 'addClass' : 'removeClass';
    this.renderer[method](this.cursorShadow.nativeElement, 'cursor-hover');
  }
}
