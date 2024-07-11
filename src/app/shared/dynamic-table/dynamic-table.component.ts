import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { DetailsPopUpComponent } from '../../core/components/details-pop-up/details-pop-up.component';
import { Post } from '../../core/models/post.model';
import { Todo } from '../../core/models/todo.model';

@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<Post[]> = new MatTableDataSource<Post[]>([]);

  constructor(public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(row: Post) {
    console.log(row);
    
    this.dialog.open(DetailsPopUpComponent, {
      data: {
        post: row
      },
      width: '400px'
    });
  }
  
  onButtonClick(column: string, row: Post): void {
    switch (column) {
      case 'todo-list':
        console.log(row);
        break;
      case 'posts':
        console.log(row);
        break;
      case 'details':
        this.openDialog(row);
        break;
      default:
        break;
    }
  }
}
