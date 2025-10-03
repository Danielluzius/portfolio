import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../header/logo/logo';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [Logo, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
