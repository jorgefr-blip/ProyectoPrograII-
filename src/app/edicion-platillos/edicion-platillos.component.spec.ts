import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionPlatillosComponent } from './edicion-platillos.component';

describe('EdicionPlatillosComponent', () => {
  let component: EdicionPlatillosComponent;
  let fixture: ComponentFixture<EdicionPlatillosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionPlatillosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicionPlatillosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
