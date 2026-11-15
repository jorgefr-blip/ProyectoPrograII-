import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaNoticiaComponent } from './pantalla-noticia.component';

describe('PantallaNoticiaComponent', () => {
  let component: PantallaNoticiaComponent;
  let fixture: ComponentFixture<PantallaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantallaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
