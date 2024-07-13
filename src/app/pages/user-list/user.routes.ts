import { Routes } from '@angular/router';
import { AppUrlEnum } from '../../const/route.enums';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list.component').then((m) => m.UserListComponent),
  },
  {
    path: `${AppUrlEnum.POSTS}/:id`,
    loadComponent: () =>
      import('../user-specific-posts/user-specific-posts.component').then(
        (m) => m.UserSpecificPostsComponent
      ),
  },

  {
    path: `${AppUrlEnum.TODOS}/:id`,
    loadComponent: () =>
      import('../user-specific-todos/user-specific-todos.component').then(
        (m) => m.UserSpecificTodosComponent
      ),
  },
];
