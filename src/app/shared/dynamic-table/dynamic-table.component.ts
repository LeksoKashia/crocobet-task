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
import { User } from '../../core/models/user.model.';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, RouterModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('hoverAnimation', [
      state('default', style({
        backgroundColor: '#27b654'
      })),
      state('hovered', style({
        backgroundColor: '#30a053'
      })),
      transition('default <=> hovered', [
        animate('0.1s')
      ])
    ])
  ]
})
export class DynamicTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<Post[] | User[]> = new MatTableDataSource<Post[] | User[]>([]);
  @Input() pageSizeOptions: number[] = [5, 10];
  @Input() title: string;
  showPageSizeOptions = true;
  buttonStates: { [key: number]: string } = {};



  constructor(public dialog: MatDialog, private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    console.log(this.dataSource);
    
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
        this.router.navigate(['users/todos', row.id]);
        break;
      case 'posts':
        this.router.navigate(['users/posts', row.id]);
        console.log(row);
        break;
      case 'details':
        this.openDialog(row);
        break;
      default:
        break;
    }
  }

  setButtonState(id: number, state: string): void {
    this.buttonStates[id] = state;
  }
}
