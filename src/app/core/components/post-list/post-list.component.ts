import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'post-list',
  standalone: true,
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent {

}
