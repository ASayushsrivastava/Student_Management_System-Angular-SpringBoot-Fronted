import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },

  {
    path: 'students',
    loadComponent: () =>
      import('./components/student-list/student-list').then((m) => m.StudentList),
  },

  {
    path: 'students/new',
    loadComponent: () =>
      import('./components/student-form/student-form').then((m) => m.StudentForm),
  },

  {
    path: 'students/edit/:id',
    loadComponent: () =>
      import('./components/student-form/student-form').then((m) => m.StudentForm),
  },
];
