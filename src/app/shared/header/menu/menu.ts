import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

type MenuItemId = 'about' | 'skills' | 'projects';

interface MenuItem {
  id: MenuItemId;
  label: string;
  href: string;
}

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [NgFor],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  readonly menuItems: MenuItem[] = [
    { id: 'about', label: 'About me', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
  ];

  activeItem: MenuItemId = this.menuItems[0].id;

  setActive(id: MenuItemId): void {
    if (this.activeItem === id) {
      return;
    }

    this.activeItem = id;
  }
}
