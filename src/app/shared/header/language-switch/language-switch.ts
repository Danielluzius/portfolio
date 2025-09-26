import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-language-switch',
  imports: [],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  activeLanguage: 'EN' | 'DE' = 'EN';
  isHovering = false;

  @Output() languageChange = new EventEmitter<'EN' | 'DE'>();

  setLanguage(language: 'EN' | 'DE'): void {
    if (this.activeLanguage === language) {
      return;
    }

    this.activeLanguage = language;
    this.languageChange.emit(language);
  }
}
