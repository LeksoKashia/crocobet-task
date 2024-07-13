import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { User } from '../models/user.model.';
import { Post } from '../models/post.model';
import { environment } from '../../../environments/environment';
import { AppUrlEnum } from '../../const/route.enums';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[] | any> {
    return this.http
      .get<User[]>(`${environment.baseUrl_api}/${AppUrlEnum.USERS}`)
      .pipe(
        map((users) => {
          return users.map((user) => ({
            ...user,
            company: user.company.name,
          }));
        })
      );
  }

  getPosts(): Observable<Post[] | any> {
    return forkJoin({
      users: this.http.get<User[]>(
        `${environment.baseUrl_api}/${AppUrlEnum.USERS}`
      ),
      posts: this.http.get<Post[]>(
        `${environment.baseUrl_api}/${AppUrlEnum.POSTS}`
      ),
    }).pipe(
      map(({ users, posts }) => {
        const userMap = new Map<number, string>();
        users.forEach((user) => {
          userMap.set(user.id, user.name);
        });

        posts.forEach((post) => {
          post.username = userMap.get(post.userId) || 'Unknown User';
        });
        return posts;
      })
    );
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl_api}/users/${userId}`);
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${environment.baseUrl_api}/posts?userId=${userId}`
    );
  }

  getUserTodos(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `${environment.baseUrl_api}/todos?userId=${userId}`
    );
  }
}
