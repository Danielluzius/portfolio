import { Component } from '@angular/core';
import { LanguageSwitch } from './language-switch/language-switch';
import { Menu } from './menu/menu';
import { Logo } from './logo/logo';
import { BurgerMenu } from './burger-menu/burger-menu';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [LanguageSwitch, Menu, Logo, BurgerMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;

  /**
   * Toggles the mobile menu open/closed state.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Closes the mobile menu.
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
