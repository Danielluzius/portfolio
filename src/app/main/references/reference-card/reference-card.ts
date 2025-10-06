import { Component, Input } from '@angular/core';

export interface Reference {
  name: string;
  role: string;
  text: string;
  image?: string;
}

@Component({
  selector: 'app-reference-card',
  imports: [],
  templateUrl: './reference-card.html',
  styleUrl: './reference-card.scss',
})
export class ReferenceCard {
  @Input({ required: true }) reference!: Reference;
}
