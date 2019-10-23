import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldPositioningComponent } from './scaffold-positioning.component';

describe('ScaffoldPositioningComponent', () => {
  let component: ScaffoldPositioningComponent;
  let fixture: ComponentFixture<ScaffoldPositioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldPositioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldPositioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
