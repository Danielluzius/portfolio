import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  HostListener,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { BodyScrollService } from '../../services/body-scroll.service';

@Component({
  standalone: true,
  selector: 'app-burger-menu',
  imports: [TranslocoPipe],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.scss',
})
export class BurgerMenu implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  private translocoService = inject(TranslocoService);
  private bodyScrollService = inject(BodyScrollService);
  private router = inject(Router);

  currentLanguage: 'en' | 'de' = 'de';

  /**
   * Creates an instance of BurgerMenu and subscribes to language changes.
   */
  constructor() {
    // Synchronisiere mit der aktuellen Transloco-Sprache
    this.currentLanguage = this.translocoService.getActiveLang() as 'en' | 'de';

    // Abonniere Sprachänderungen
    this.translocoService.langChanges$.subscribe((lang) => {
      this.currentLanguage = lang as 'en' | 'de';
    });
  }

  /**
   * Handles keyboard events to close the menu when Escape is pressed.
   * @protected
   * @param {KeyboardEvent} event - The keyboard event.
   */
  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.isOpen) {
      return;
    }
    event.preventDefault();
    this.close.emit();
  }

  /**
   * Angular lifecycle hook that responds to input property changes.
   * Handles menu state changes when isOpen property changes.
   * @param {SimpleChanges} changes - Object containing changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      this.handleMenuStateChange();
    }
  }

  /**
   * Angular lifecycle hook that runs when the component is destroyed.
   * Ensures body scroll is unlocked on cleanup.
   */
  ngOnDestroy(): void {
    this.bodyScrollService.unlock();
  }

  /**
   * Handles clicks on menu links and navigates to the target section.
   * @param {Event} event - The click event.
   */
  onLinkClick(event: Event): void {
    event.preventDefault();
    const href = this.extractHref(event);
    if (href) {
      this.handleNavigation(href);
    }
    this.close.emit();
  }

  /**
   * Handles menu state changes by locking or unlocking body scroll.
   * @private
   */
  private handleMenuStateChange(): void {
    if (this.isOpen) {
      this.bodyScrollService.lock();
    } else {
      this.bodyScrollService.unlock();
    }
  }

  /**
   * Extracts the href attribute from the event target.
   * @private
   * @param {Event} event - The event containing the target element.
   * @returns {string | null} The href value or null if not found.
   */
  private extractHref(event: Event): string | null {
    const target = event.currentTarget as HTMLAnchorElement;
    return target.getAttribute('href');
  }

  /**
   * Handles navigation based on current route.
   * @private
   * @param {string} href - The target href to navigate to.
   */
  private handleNavigation(href: string): void {
    if (this.router.url !== '/') {
      this.navigateToHomeAndScroll(href);
    } else {
      this.scrollToElement(href);
    }
  }

  /**
   * Navigates to home page and then scrolls to the target element.
   * @private
   * @param {string} href - The target href to scroll to.
   */
  private navigateToHomeAndScroll(href: string): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => this.scrollToElement(href), 100);
    });
  }

  /**
   * Scrolls to the element specified by the href selector.
   * @private
   * @param {string} href - The CSS selector of the target element.
   */
  private scrollToElement(href: string): void {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Handles backdrop clicks to close the menu.
   */
  onBackdropClick(): void {
    this.close.emit();
  }

  /**
   * Switches the application language.
   * @param {'en' | 'de'} lang - The language to switch to.
   */
  switchLanguage(lang: 'en' | 'de'): void {
    if (this.currentLanguage === lang) {
      return;
    }
    this.currentLanguage = lang;
    this.translocoService.setActiveLang(lang);
  }
}
