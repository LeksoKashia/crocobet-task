import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableComponent } from '../../../shared/dynamic-table/dynamic-table.component';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'post-list',
  standalone: true,
  imports: [CommonModule, DynamicTableComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  displayedColumns: string[] = ['username', 'title', 'details'];
  dataSource = new MatTableDataSource<any>([]);
  posts$: Observable<any[]>;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.posts$ = this.userDataService.fetchData();
    this.posts$.subscribe((posts) => {
      this.dataSource.data = posts;
    });
  }
}
