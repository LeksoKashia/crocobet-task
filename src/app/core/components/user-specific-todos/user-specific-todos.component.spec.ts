import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecificTodosComponent } from './user-specific-todos.component';

describe('UserSpecificTodosComponent', () => {
  let component: UserSpecificTodosComponent;
  let fixture: ComponentFixture<UserSpecificTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecificTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSpecificTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
