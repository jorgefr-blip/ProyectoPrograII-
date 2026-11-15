import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposListaComponent } from './tipos-lista.component';

describe('TiposListaComponent', () => {
  let component: TiposListaComponent;
  let fixture: ComponentFixture<TiposListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
