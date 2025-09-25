import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-title',
  imports: [NgFor],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
  subtitle = 'Fullstack Developer';
  headline = 'Daniel Luzius';
  callToActions = [
    { label: 'Check my work', href: '#projects' },
    { label: 'Contact me', href: '#contact' },
  ];
}
