import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChartContainerComponent } from './stock-chart-container.component';

describe('StockChartContainerComponent', () => {
  let component: StockChartContainerComponent;
  let fixture: ComponentFixture<StockChartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockChartContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
