import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalCardComponent } from './analytical-card.component';

describe('AnalyticalCardComponent', () => {
  let component: AnalyticalCardComponent;
  let fixture: ComponentFixture<AnalyticalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyticalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
