import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaIngredinetesComponent } from './pantalla-ingredinetes.component';

describe('PantallaIngredinetesComponent', () => {
  let component: PantallaIngredinetesComponent;
  let fixture: ComponentFixture<PantallaIngredinetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaIngredinetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantallaIngredinetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
