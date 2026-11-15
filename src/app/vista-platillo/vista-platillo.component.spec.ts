import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPlatilloComponent } from './vista-platillo.component';

describe('VistaPlatilloComponent', () => {
  let component: VistaPlatilloComponent;
  let fixture: ComponentFixture<VistaPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPlatilloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
