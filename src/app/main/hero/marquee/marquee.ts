import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-marquee',
  imports: [TranslocoPipe],
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly textKeys = [
    'hero.marquee.available',
    'hero.marquee.role',
    'hero.marquee.location',
    'hero.marquee.openToWork',
    'hero.marquee.frontend',
    'hero.marquee.backend',
  ];
}
