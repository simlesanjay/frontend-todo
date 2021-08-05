import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyTodoLoginComponent } from './ey-todo-login.component';

describe('EyTodoLoginComponent', () => {
  let component: EyTodoLoginComponent;
  let fixture: ComponentFixture<EyTodoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EyTodoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EyTodoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
