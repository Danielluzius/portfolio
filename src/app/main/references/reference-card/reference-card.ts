import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Reference } from '../../../shared/models/reference.model';

@Component({
  selector: 'app-reference-card',
  imports: [TranslocoPipe],
  templateUrl: './reference-card.html',
  styleUrl: './reference-card.scss',
})
export class ReferenceCard {
  @Input({ required: true }) reference!: Reference;
}
