import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'juan',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'cvitae',
    loadComponent: () =>
      import('./pages/cv/cv.component').then((m) => m.CvComponent),
  },
  {
    path: 'cvitae/print',
    loadComponent: () =>
      import('./pages/cv-print/cv-print.component').then(
        (m) => m.CvPrintComponent
      ),
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/experience/experience.component').then(
        (m) => m.ExperienceComponent
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  {
    path: 'experiments',
    loadComponent: () =>
      import('./pages/experiments/experiments.component').then(
        (m) => m.ExperimentsComponent
      ),
  },
  {
    path: 'experiment/1',
    loadComponent: () =>
      import('./pages/experiments/primes/primes.component').then(
        (m) => m.PrimesComponent
      ),
  },
  {
    path: 'experiment/2',
    loadComponent: () =>
      import('./pages/experiments/chrome/chrome.component').then(
        (m) => m.ChromeComponent
      ),
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./pages/accounts/accounts.component').then(
        (m) => m.AccountsComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'main' },
];
