import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentDateTime$: Observable<Date>;
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor() {
    this.currentDateTime$ = interval(1000).pipe(
      map(() => new Date())
    );
  }

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }
}