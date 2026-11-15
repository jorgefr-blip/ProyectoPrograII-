import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosListaComponent } from './anuncios-lista.component';

describe('AnunciosListaComponent', () => {
  let component: AnunciosListaComponent;
  let fixture: ComponentFixture<AnunciosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciosListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnunciosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
