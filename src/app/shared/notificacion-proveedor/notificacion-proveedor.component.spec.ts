import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionProveedorComponent } from './notificacion-proveedor.component';

describe('NotificacionProveedorComponent', () => {
  let component: NotificacionProveedorComponent;
  let fixture: ComponentFixture<NotificacionProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
