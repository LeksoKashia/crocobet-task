import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecificPostsComponent } from './user-specific-posts.component';

describe('UserSpecificPostsComponent', () => {
  let component: UserSpecificPostsComponent;
  let fixture: ComponentFixture<UserSpecificPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecificPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSpecificPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
