import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

type MenuItemId = 'about' | 'skills' | 'projects';

interface MenuItem {
  id: MenuItemId;
  translationKey: string;
  href: string;
}

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [NgFor, TranslocoPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  readonly menuItems: MenuItem[] = [
    { id: 'about', translationKey: 'nav.aboutMe', href: '#about' },
    { id: 'skills', translationKey: 'nav.skills', href: '#skills' },
    { id: 'projects', translationKey: 'nav.projects', href: '#projects' },
  ];

  activeItem: MenuItemId | null = null;

  setActive(id: MenuItemId): void {
    if (this.activeItem === id) {
      return;
    }

    this.activeItem = id;
  }
}
