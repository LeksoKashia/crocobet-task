import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDataService } from '../../core/services/user-data.service';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model.';

@Component({
  selector: 'user-specific-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-specific-items.component.html',
  styleUrl: './user-specific-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSpecificItemsComponent {
  @Input() items: any[];
  @Input() userId: number;
  @Input() type: 'posts' | 'todos';
  user$: Observable<User>;

  constructor(private userDataService: UserDataService) {}


  ngOnInit(): void {
    this.user$ = this.userDataService.getUser(this.userId);
  }
}
