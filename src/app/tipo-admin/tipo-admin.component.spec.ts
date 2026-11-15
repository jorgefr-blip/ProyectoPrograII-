import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAdminComponent } from './tipo-admin.component';

describe('TipoAdminComponent', () => {
  let component: TipoAdminComponent;
  let fixture: ComponentFixture<TipoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
