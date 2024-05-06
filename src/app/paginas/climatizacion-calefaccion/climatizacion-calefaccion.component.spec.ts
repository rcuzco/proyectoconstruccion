import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatizacionCalefaccionComponent } from './climatizacion-calefaccion.component';

describe('ClimatizacionCalefaccionComponent', () => {
  let component: ClimatizacionCalefaccionComponent;
  let fixture: ComponentFixture<ClimatizacionCalefaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimatizacionCalefaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimatizacionCalefaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
