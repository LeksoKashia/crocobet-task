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

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        return users.map((user : any) => ({
          ...user,
          company: user.company.name
        }));
      })
    );
  }

  fetchData(): Observable<any[]> {
    return forkJoin({
      users: this.http.get<any[]>(this.usersUrl),
      posts: this.http.get<any[]>(this.postsUrl)
    }).pipe(
      map(({ users, posts }) => {
        const userMap = new Map<number, string>();
        users.forEach((user: any) => {
          userMap.set(user.id, user.name);
        });

        posts.forEach((post: any) => {
          post.username = userMap.get(post.userId) || 'Unknown User';
        });
        return posts;
      })
    );
  }

}