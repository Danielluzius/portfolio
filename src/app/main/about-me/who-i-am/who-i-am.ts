import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'app-who-i-am',
  imports: [TranslocoPipe],
  templateUrl: './who-i-am.html',
  styleUrl: './who-i-am.scss',
})
export class WhoIAm {}
