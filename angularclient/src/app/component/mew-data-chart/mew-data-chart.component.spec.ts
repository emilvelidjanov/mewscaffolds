import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MewDataChartComponent } from './mew-data-chart.component';

describe('MewDataChartComponent', () => {
  let component: MewDataChartComponent;
  let fixture: ComponentFixture<MewDataChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MewDataChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MewDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
