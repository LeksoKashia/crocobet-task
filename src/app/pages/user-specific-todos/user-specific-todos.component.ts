import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSpecificItemsComponent } from '../../shared/user-specific-items/user-specific-items.component';
import { UserDataService } from '../../core/services/user-data.service';
import { User } from '../../core/models/user.model.';
import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'user-specific-todos',
  standalone: true,
  imports: [CommonModule, UserSpecificItemsComponent],
  templateUrl: './user-specific-todos.component.html',
  styleUrl: './user-specific-todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSpecificTodosComponent {
  userId: number;
  todos$: Observable<Todo[]>;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.fetchUserAndTodos();
  }

  fetchUserAndTodos(): void {
    this.user$ = this.userDataService.getUser(this.userId);
    this.todos$ = this.userDataService.getUserTodos(this.userId);
  }
}
