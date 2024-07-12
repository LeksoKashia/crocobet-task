import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'user-specific-posts',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-specific-posts.component.html',
  styleUrl: './user-specific-posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSpecificPostsComponent {
  userId: any;
  posts$: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.posts$ = this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`);
  }
}
