import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

import { routes } from './app.routes';

/**
 * Retrieves the initial language preference for the application.
 *
 * Checks localStorage for a saved language preference. Falls back to 'en' (English)
 * if no preference is found or if running in a non-browser environment (SSR).
 *
 * @returns {string} The language code ('de' or 'en')
 */
const getInitialLanguage = (): 'de' | 'en' => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage');
      if (saved === 'de' || saved === 'en') {
        return saved;
      }
    }
  } catch {
    // Safari private mode can throw when reading localStorage.
  }
  return 'en';
};

/**
 * Main application configuration for the Angular application.
 *
 * Configures all necessary providers including:
 * - Global error listeners for comprehensive error handling
 * - Zone.js with event coalescing for optimized change detection
 * - Router with application routes
 * - HTTP client for API communication
 * - Transloco for internationalization (i18n) with German and English support
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['de', 'en'],
        defaultLang: getInitialLanguage(),
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
