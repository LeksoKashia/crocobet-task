import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Post } from '../../core/models/post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserSpecificItemsComponent } from '../../shared/user-specific-items/user-specific-items.component';
import { UserDataService } from '../../core/services/user-data.service';
import { User } from '../../core/models/user.model.';

@Component({
  selector: 'user-specific-posts',
  standalone: true,
  imports: [CommonModule, MatCardModule, UserSpecificItemsComponent],
  templateUrl: './user-specific-posts.component.html',
  styleUrl: './user-specific-posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSpecificPostsComponent {
  userId: number;
  posts$: Observable<Post[]>;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.fetchUserAndPosts();
  }

  fetchUserAndPosts(): void {
    this.user$ = this.userDataService.getUser(this.userId);
    this.posts$ = this.userDataService.getUserPosts(this.userId);
  }
}
