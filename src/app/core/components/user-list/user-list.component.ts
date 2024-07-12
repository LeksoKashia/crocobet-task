import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableComponent } from '../../../shared/dynamic-table/dynamic-table.component';
import { map, Observable, of, switchMap, tap } from 'rxjs';
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
  dataSource = new MatTableDataSource<User[]>([]);
  users$: Observable<MatTableDataSource<User[]>>;
  pageSizeOptions: number[] = [10, 5];
  title : string = 'users';

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.users$ = this.userDataService.getUsers().pipe(
      tap(
        (users) =>{
          this.dataSource.data = users
        }
      ),
      switchMap(() => of(this.dataSource))
    );
  }

}
