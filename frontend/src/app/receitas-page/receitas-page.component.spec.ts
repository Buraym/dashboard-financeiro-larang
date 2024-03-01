import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasPageComponent } from './receitas-page.component';

describe('ReceitasPageComponent', () => {
  let component: ReceitasPageComponent;
  let fixture: ComponentFixture<ReceitasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceitasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
