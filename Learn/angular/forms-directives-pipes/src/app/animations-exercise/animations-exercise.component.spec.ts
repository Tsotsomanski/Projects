import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationsExerciseComponent } from './animations-exercise.component';

describe('AnimationsExerciseComponent', () => {
  let component: AnimationsExerciseComponent;
  let fixture: ComponentFixture<AnimationsExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationsExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
