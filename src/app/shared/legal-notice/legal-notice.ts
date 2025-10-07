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
  /**
   * Creates an instance of LegalNotice.
   * @param {Router} router - Angular router service for navigation
   */
  constructor(private router: Router) {}

  /**
   * Angular lifecycle hook that is called after the component is initialized.
   * Scrolls the page to the top when the legal notice is displayed.
   */
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Navigates back to the home page and scrolls to the top.
   * Uses instant scroll behavior after navigation completes.
   */
  goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
}
