import { Component } from '@angular/core';
import { Logo } from '../header/logo/logo';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
