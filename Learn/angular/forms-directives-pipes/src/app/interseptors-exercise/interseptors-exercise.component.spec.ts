import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterseptorsExerciseComponent } from './interseptors-exercise.component';

describe('InterseptorsExerciseComponent', () => {
  let component: InterseptorsExerciseComponent;
  let fixture: ComponentFixture<InterseptorsExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterseptorsExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterseptorsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
