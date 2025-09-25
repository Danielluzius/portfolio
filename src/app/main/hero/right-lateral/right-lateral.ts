import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-right-lateral',
  imports: [NgFor],
  templateUrl: './right-lateral.html',
  styleUrl: './right-lateral.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightLateral {
  readonly email = 'DANIELLUZIUS@MAIL.DE';
  readonly mailtoHref = `mailto:${this.email}`;

  readonly socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/Danielluzius',
      icon: 'assets/icon/github_icon.png',
      hoverIcon: 'assets/icon/github_hover.png',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniel-luzius',
      icon: 'assets/icon/linkedin_icon.png',
      hoverIcon: 'assets/icon/linkedin_hover.png',
    },
  ];
}
