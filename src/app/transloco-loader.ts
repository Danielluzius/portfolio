import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import de from '../../public/assets/i18n/de.json';
import en from '../../public/assets/i18n/en.json';

const translations: Record<string, Translation> = {
  de: de as Translation,
  en: en as Translation,
};

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    return of(translations[lang] ?? translations['en']);
  }
}
