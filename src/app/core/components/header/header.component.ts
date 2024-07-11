import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  currentDateTime: Date;
  @Output() newItemEvent = new EventEmitter<any>();


  constructor() {
    this.currentDateTime = new Date();
  }
  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.currentDateTime = new Date();
    // }, 1000);
  }
}