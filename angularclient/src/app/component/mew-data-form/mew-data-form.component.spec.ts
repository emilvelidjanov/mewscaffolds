import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MewDataFormComponent } from './mew-data-form.component';

describe('TokenFormComponent', () => {
  let component: MewDataFormComponent;
  let fixture: ComponentFixture<MewDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MewDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MewDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
