import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableComponent } from '../../shared/dynamic-table/dynamic-table.component';
import { forkJoin, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { UserDataService } from '../../core/services/user-data.service';
import { Post } from '../../core/models/post.model';

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
  dataSource = new MatTableDataSource<Post[]>([]);
  posts$: Observable<MatTableDataSource<Post[]>>;
  pageSizeOptions: number[] = [10, 5, 25, 100];
  title: string = 'posts';
  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.posts$ = this.userDataService.getPosts().pipe(
      tap((posts) => {
        this.dataSource.data = posts;
      }),
      switchMap(() => of(this.dataSource))
    );
  }
}
