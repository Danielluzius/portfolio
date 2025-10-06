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
  isHovering = false;

  ngOnInit() {
    // Lade die gespeicherte Sprache aus LocalStorage oder verwende die aktive Sprache von Transloco
    const savedLanguage = localStorage.getItem('preferredLanguage') as 'en' | 'de' | null;
    if (savedLanguage) {
      this.activeLanguage = savedLanguage;
      this.translocoService.setActiveLang(savedLanguage);
    } else {
      this.activeLanguage = this.translocoService.getActiveLang() as 'en' | 'de';
    }
  }

  setLanguage(language: 'en' | 'de'): void {
    if (this.activeLanguage === language) {
      return;
    }

    this.activeLanguage = language;
    this.translocoService.setActiveLang(language);
    // Speichere die Sprachwahl im LocalStorage
    localStorage.setItem('preferredLanguage', language);
  }
}
