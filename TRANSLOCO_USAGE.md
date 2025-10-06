# Transloco - Verwendung in deinem Portfolio

## ✅ Installation abgeschlossen

Transloco ist jetzt installiert und konfiguriert!

## 📁 Translation Files

Die Übersetzungen befinden sich in:

- `public/assets/i18n/de.json` (Deutsch)
- `public/assets/i18n/en.json` (Englisch)

## 🎯 Wie du Transloco verwendest

### 1. In HTML Templates (Pipes):

```html
<!-- Einfacher Text -->
<h1>{{ 'hero.title' | transloco }}</h1>

<!-- Mit Attributen -->
<button [attr.aria-label]="'contact.submit' | transloco">{{ 'contact.submit' | transloco }}</button>
```

### 2. In HTML Templates (Directive):

```html
<!-- Structural Directive -->
<div transloco="hero.subtitle"></div>
```

### 3. In TypeScript Code:

```typescript
import { TranslocoService } from '@jsverse/transloco';

export class MyComponent {
  constructor(private transloco: TranslocoService) {}

  getTranslation() {
    return this.transloco.translate('hero.title');
  }

  // Mit Parametern
  getWelcome(name: string) {
    return this.transloco.translate('welcome.message', { name });
  }
}
```

### 4. Component imports:

Wenn du Transloco in einer Component verwendest, importiere `TranslocoPipe`:

```typescript
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  imports: [TranslocoPipe],
  // ...
})
```

## 🔄 Sprachwechsel

Der Sprachwechsel funktioniert bereits über deinen Language-Switch Button im Header!

## 📝 Neue Übersetzungen hinzufügen

1. Öffne `public/assets/i18n/de.json` und `en.json`
2. Füge neue Keys hinzu:

```json
{
  "mySection": {
    "title": "Mein Titel",
    "description": "Meine Beschreibung"
  }
}
```

3. Verwende sie im HTML:

```html
<h2>{{ 'mySection.title' | transloco }}</h2>
<p>{{ 'mySection.description' | transloco }}</p>
```

## 🎨 Beispiele aus deinem Projekt

### Menu (bereits übersetzt):

```html
{{ 'nav.aboutMe' | transloco }} → "Über mich" / "About me" {{ 'nav.skills' | transloco }} → "Skills"
{{ 'nav.projects' | transloco }} → "Projekte" / "Projects"
```

### Footer (bereits übersetzt):

```html
{{ 'footer.legalNotice' | transloco }} → "Impressum" / "Legal Notice"
```

## ⚡ Nächste Schritte

Jetzt kannst du alle statischen Texte in deinen Components übersetzen:

1. **Hero Section** - Titel, Untertitel
2. **About Me** - Beschreibungen
3. **Skills** - Überschriften
4. **Projects** - Projekt-Beschreibungen
5. **Contact** - Formular-Labels
6. **Burger Menu** - Mobile Navigation

Viel Erfolg! 🚀
