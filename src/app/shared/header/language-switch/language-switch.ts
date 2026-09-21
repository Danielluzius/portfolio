import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-language-switch',
  imports: [],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  private translocoService = inject(TranslocoService);

  activeLanguage: 'en' | 'de' = 'de';

  /**
   * Angular lifecycle hook that initializes the component.
   * Loads the saved language preference or uses the default.
   */
  ngOnInit() {
    const savedLanguage = this.getSavedLanguage();
    this.initializeLanguage(savedLanguage);
  }

  /**
   * Retrieves the saved language preference from localStorage.
   * @private
   * @returns {'en' | 'de' | null} The saved language or null if not set.
   */
  private getSavedLanguage(): 'en' | 'de' | null {
    try {
      const saved = localStorage.getItem('preferredLanguage');
      return saved === 'de' || saved === 'en' ? saved : null;
    } catch {
      return null;
    }
  }

  /**
   * Initializes the active language based on saved preference or default.
   * @private
   * @param {'en' | 'de' | null} savedLanguage - The saved language preference.
   */
  private initializeLanguage(savedLanguage: 'en' | 'de' | null): void {
    if (savedLanguage) {
      this.activeLanguage = savedLanguage;
      this.translocoService.setActiveLang(savedLanguage);
    } else {
      this.activeLanguage = this.translocoService.getActiveLang() as 'en' | 'de';
    }
  }

  /**
   * Sets the active language and persists it to localStorage.
   * @param {'en' | 'de'} language - The language to activate.
   */
  setLanguage(language: 'en' | 'de'): void {
    if (this.activeLanguage === language) {
      return;
    }

    this.activeLanguage = language;
    this.translocoService.setActiveLang(language);
    try {
      localStorage.setItem('preferredLanguage', language);
    } catch {
      // Safari private mode can throw when writing localStorage.
    }
  }
}
