import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCodeModalComponent } from './generate-code-modal.component';

describe('GenerateCodeModalComponent', () => {
  let component: GenerateCodeModalComponent;
  let fixture: ComponentFixture<GenerateCodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
