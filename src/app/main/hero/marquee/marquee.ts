import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-marquee',
  imports: [NgFor],
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly items = [
    'Available for remote work',
    'Fullstack Developer',
    'Based in Seligenstadt',
    'Open to work',
  ];

  readonly repeatedItems = [...this.items, ...this.items];
}
