import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MewDataListComponent } from './mew-data-list.component';

describe('TokenListComponent', () => {
  let component: MewDataListComponent;
  let fixture: ComponentFixture<MewDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MewDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MewDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
