import { Component } from '@angular/core';
import { LanguageSwitch } from './language-switch/language-switch';
import { Menu } from './menu/menu';
import { Logo } from './logo/logo';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [LanguageSwitch, Menu, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
