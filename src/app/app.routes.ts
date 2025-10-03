import { Routes } from '@angular/router';
import { MainPage } from './main/main-page/main-page';
import { LegalNotice } from './shared/legal-notice/legal-notice';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'legal-notice',
    component: LegalNotice,
  },
];
