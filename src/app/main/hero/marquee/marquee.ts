import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-marquee',
  imports: [NgFor, TranslocoPipe],
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly items = [
    'hero.marquee.available',
    'hero.marquee.role',
    'hero.marquee.location',
    'hero.marquee.openToWork',
  ];

  readonly repeatedItems = [...this.items, ...this.items];
}
