import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Hero } from './main/hero/hero';
import { AboutMe } from './main/about-me/about-me';
import { Skills } from './main/skills/skills';
import { Projects } from './main/projects/projects';
import { References } from './main/references/references';
import { Contact } from './main/contact/contact';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Hero, AboutMe, Skills, Projects, References, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio');
}
