import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-specific-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-specific-todos.component.html',
  styleUrl: './user-specific-todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSpecificTodosComponent {
  userId: any;
  todos$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todos$ = this.http.get<any[]>(`https://jsonplaceholder.typicode.com/todos?userId=${this.userId}`);
  }
}

