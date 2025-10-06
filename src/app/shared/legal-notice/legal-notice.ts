import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [Footer, TranslocoPipe],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LegalNotice implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
}
