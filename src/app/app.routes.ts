import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contact-list/contact-list.component').then(m => m.ContactListComponent)
  },
  {
    path: 'contacts/new',
    loadComponent: () => import('./pages/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'contacts/:id',
    loadComponent: () => import('./pages/contact-detail/contact-detail.component').then(m => m.ContactDetailComponent)
  },
  {
    path: 'contacts/:id/edit',
    loadComponent: () => import('./pages/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];