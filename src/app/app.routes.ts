import { Routes } from '@angular/router';
import { AppUrlEnum } from './const/route.enums';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `${AppUrlEnum.HOME}` },
  {
    path: AppUrlEnum.HOME,
    loadComponent: () =>
      import('./core/components/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: AppUrlEnum.USERS,
    loadComponent: () =>
      import('./core/components/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: AppUrlEnum.POSTS,
    loadComponent: () =>
      import('./core/components/post-list/post-list.component').then(
        (m) => m.PostListComponent
      ),
  },

  {
    path: `${AppUrlEnum.USERS}/${AppUrlEnum.POSTS}/:id`,
    loadComponent: () =>
      import(
        './core/components/user-specific-posts/user-specific-posts.component'
      ).then((m) => m.UserSpecificPostsComponent),
  },

  {
    path: `${AppUrlEnum.USERS}/${AppUrlEnum.TODOS}/:id`,
    loadComponent: () =>
      import(
        './core/components/user-specific-todos/user-specific-todos.component'
      ).then((m) => m.UserSpecificTodosComponent),
  },
  { path: '**', redirectTo: `${AppUrlEnum.HOME}`, pathMatch: 'full' }
];
