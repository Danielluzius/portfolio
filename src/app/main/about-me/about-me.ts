import { Component } from '@angular/core';
import { Photo } from './photo/photo';
import { WhoIAm } from './who-i-am/who-i-am';

@Component({
  standalone: true,
  selector: 'app-about-me',
  imports: [Photo, WhoIAm],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {}
