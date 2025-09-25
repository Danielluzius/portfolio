import { Component } from '@angular/core';
import { LeftLateral } from './left-lateral/left-lateral';
import { RightLateral } from './right-lateral/right-lateral';
import { Marquee } from './marquee/marquee';
import { Title } from './title/title';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [LeftLateral, RightLateral, Marquee, Title],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
