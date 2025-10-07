import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BodyScrollService {
  private readonly scrollClass = 'body--no-scroll';
  private lockCount = 0;
  private renderer: Renderer2;

  /**
   * Creates an instance of BodyScrollService.
   * @param {Document} document - Reference to the document object.
   * @param {RendererFactory2} rendererFactory - Factory to create Renderer2 instance.
   */
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Locks the body scroll by adding a CSS class.
   * Supports nested locks with a counter to handle multiple overlays/dialogs.
   */
  lock(): void {
    this.lockCount++;

    if (this.lockCount === 1) {
      this.applyScrollLock();
    }
  }

  /**
   * Unlocks the body scroll by removing the CSS class.
   * Only removes the lock when all nested locks have been released.
   */
  unlock(): void {
    this.lockCount = Math.max(0, this.lockCount - 1);

    if (this.lockCount === 0) {
      this.removeScrollLock();
    }
  }

  /**
   * Forces unlock of body scroll regardless of lock count.
   * Useful for cleanup or error recovery.
   */
  forceUnlock(): void {
    this.lockCount = 0;
    this.removeScrollLock();
  }

  /**
   * Checks if body scroll is currently locked.
   * @returns {boolean} True if body scroll is locked.
   */
  isLocked(): boolean {
    return this.lockCount > 0;
  }

  /**
   * Gets the current lock count.
   * @returns {number} The number of active locks.
   */
  getLockCount(): number {
    return this.lockCount;
  }

  /**
   * Applies the scroll lock to the body element.
   * @private
   */
  private applyScrollLock(): void {
    const body = this.document.body;
    if (!body || body.classList.contains(this.scrollClass)) {
      return;
    }
    this.renderer.addClass(body, this.scrollClass);
  }

  /**
   * Removes the scroll lock from the body element.
   * @private
   */
  private removeScrollLock(): void {
    const body = this.document.body;
    if (!body || !body.classList.contains(this.scrollClass)) {
      return;
    }
    this.renderer.removeClass(body, this.scrollClass);
  }
}
