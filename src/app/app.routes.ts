import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: "home"},
    {
      path: 'home',
      loadComponent: () =>
        import('./core/components/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: 'users',
      loadComponent: () =>
        import('./core/components/user-list/user-list.component').then((m) => m.UserListComponent),
    },
    {
      path: 'posts',
      loadComponent: () =>
        import('./core/components/post-list/post-list.component').then((m) => m.PostListComponent),
    }
  ];