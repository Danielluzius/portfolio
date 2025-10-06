import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Logo } from '../header/logo/logo';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [Logo, RouterLink, TranslocoPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
