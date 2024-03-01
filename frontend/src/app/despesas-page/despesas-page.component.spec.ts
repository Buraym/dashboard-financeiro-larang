import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasPageComponent } from './despesas-page.component';

describe('DespesasPageComponent', () => {
  let component: DespesasPageComponent;
  let fixture: ComponentFixture<DespesasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespesasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DespesasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
