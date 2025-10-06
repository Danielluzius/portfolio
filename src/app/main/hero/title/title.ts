import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-title',
  imports: [NgFor, TranslocoPipe],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
  callToActions = [
    { translationKey: 'hero.buttons.checkWork', href: '#projects' },
    { translationKey: 'hero.buttons.contact', href: '#contact' },
  ];
}
