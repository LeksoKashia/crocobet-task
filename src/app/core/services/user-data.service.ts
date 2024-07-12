import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { User } from '../models/user.model.';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[] | any> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        return users.map(user => ({
          ...user,
          company: user.company.name
        }));
      })
    );
  }

  getPosts(): Observable<Post[] | any> {
    return forkJoin({
      users: this.http.get<User[]>(this.usersUrl),
      posts: this.http.get<Post[]>(this.postsUrl)
    }).pipe(
      map(({ users, posts }) => {
        const userMap = new Map<number, string>();
        users.forEach(user => {
          userMap.set(user.id, user.name);
        });

        posts.forEach(post => {
          post.username = userMap.get(post.userId) || 'Unknown User';
        });
        return posts;
      })
    );
  }

}