import { Component } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [Footer],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {}
