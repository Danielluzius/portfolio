import { Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [Footer],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
