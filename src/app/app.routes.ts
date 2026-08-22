import { Routes } from '@angular/router';
import { MainPage } from './main/main-page/main-page';
import { LegalNotice } from './shared/legal-notice/legal-notice';
import { PrivacyPolicy } from './shared/privacy-policy/privacy-policy';
import { AllProjects } from './main/projects/all-projects/all-projects';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'all-projects',
    component: AllProjects,
  },
  {
    path: 'legal-notice',
    component: LegalNotice,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
