import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Inject,
  Renderer2,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-burger-menu',
  imports: [],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.scss',
})
export class BurgerMenu implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  currentLanguage: 'en' | 'de' = 'en';
  private readonly bodyScrollClass = 'body--no-scroll';

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.isOpen) {
      return;
    }
    event.preventDefault();
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  onLinkClick(event: Event): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    this.close.emit();
  }

  onBackdropClick(): void {
    this.close.emit();
  }

  switchLanguage(lang: 'en' | 'de'): void {
    this.currentLanguage = lang;
    // Hier kannst du später einen Service für die Sprachumschaltung einbinden
  }

  private lockBodyScroll(): void {
    const body = this.documentRef.body;
    if (!body || body.classList.contains(this.bodyScrollClass)) {
      return;
    }
    this.renderer.addClass(body, this.bodyScrollClass);
  }

  private unlockBodyScroll(): void {
    const body = this.documentRef.body;
    if (!body || !body.classList.contains(this.bodyScrollClass)) {
      return;
    }
    this.renderer.removeClass(body, this.bodyScrollClass);
  }
}
