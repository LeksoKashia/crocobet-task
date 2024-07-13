import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AppUrlEnum } from '../../../const/route.enums';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLinkActive,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<any[]>([
    {
      icon: 'people',
      label: 'users',
      route: AppUrlEnum.USERS,
    },
    {
      icon: 'article',
      label: 'posts',
      route: AppUrlEnum.POSTS,
    },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
