import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFacturaComponent } from './listadoFactura.component';

describe('ListadoFacturaComponent', () => {
  let component: ListadoFacturaComponent;
  let fixture: ComponentFixture<ListadoFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
