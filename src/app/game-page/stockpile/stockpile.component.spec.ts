import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockpileComponent } from './stockpile.component';

describe('StockpileComponent', () => {
  let component: StockpileComponent;
  let fixture: ComponentFixture<StockpileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockpileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockpileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
