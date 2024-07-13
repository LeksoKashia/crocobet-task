import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableComponent } from '../../shared/dynamic-table/dynamic-table.component';
import {
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { User } from '../../core/models/user.model.';
import { UserDataService } from '../../core/services/user-data.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    CommonModule,
    DynamicTableComponent,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'phone',
    'company',
    'posts',
    'todo-list',
  ];
  dataSource = new MatTableDataSource<User>([]);
  users$: Observable<User[]>;
  filteredUsers$: Observable<MatTableDataSource<User[]> | any>;
  pageSizeOptions: number[] = [10, 5];
  filterForm: FormGroup;
  title: string = 'users';

  constructor(
    private userDataService: UserDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filterBy: ['firstname'],
      query: [''],
    });
    this.users$ = this.userDataService.getUsers();
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
    ]).pipe(
      map(([users, filterValue]) => this.filterUsers(users, filterValue)),
      tap((users) => {
        this.dataSource.data = users;
      }),
      switchMap(() => of(this.dataSource))
    );
  }

  private filterUsers(
    users: User[],
    filterValue: { filterBy: string; query: string }
  ): User[] {
    const { filterBy, query } = filterValue;
    if (!query) {
      return users;
    }
    return users.filter((user) => {
      const nameParts = user.name.split(' ');
      const firstname = nameParts[0].toLowerCase();
      const lastname = nameParts[nameParts.length - 1].toLowerCase();
      const searchTerm = query.toLowerCase();

      if (filterBy === 'firstname') {
        return firstname.includes(searchTerm);
      } else if (filterBy === 'lastname') {
        return lastname.includes(searchTerm);
      } else {
        return user[filterBy].toLowerCase().includes(searchTerm);
      }
    });
  }
}
