import { Routes } from '@angular/router';
import { AppUrlEnum } from './const/route.enums';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: `${AppUrlEnum.HOME}`},
    {
      path: AppUrlEnum.HOME,
      loadComponent: () =>
        import('./core/components/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: AppUrlEnum.USERS,
      loadComponent: () =>
        import('./core/components/user-list/user-list.component').then((m) => m.UserListComponent),
    },
    {
      path: AppUrlEnum.POSTS,
      loadComponent: () =>
        import('./core/components/post-list/post-list.component').then((m) => m.PostListComponent),
    }
  ];