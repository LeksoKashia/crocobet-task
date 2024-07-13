import { Routes } from '@angular/router';
import { AppUrlEnum } from './const/route.enums';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `${AppUrlEnum.USERS}` },
  {
    path: AppUrlEnum.USERS,
    loadChildren: () =>
      import('./pages/user-list/user.routes').then((r) => r.routes),
  },
  {
    path: AppUrlEnum.POSTS,
    loadComponent: () =>
      import('./pages/post-list/post-list.component').then(
        (m) => m.PostListComponent
      ),
  },

  { path: '**', redirectTo: `${AppUrlEnum.USERS}`, pathMatch: 'full' },
];
