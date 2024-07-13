import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecificItemsComponent } from './user-specific-items.component';

describe('UserSpecificItemsComponent', () => {
  let component: UserSpecificItemsComponent;
  let fixture: ComponentFixture<UserSpecificItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecificItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSpecificItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
