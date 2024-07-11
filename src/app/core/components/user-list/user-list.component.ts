import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableComponent } from '../../../shared/dynamic-table/dynamic-table.component';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user.model.';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, DynamicTableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  displayedColumns: string[] = ['name', 'username', 'email', 'phone', 'company', 'posts', 'todo-list'];

  users$: Observable<any>;


  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.users$ = this.userDataService.getUsers();
  }
}
