import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertasVentanasComponent } from './puertas-ventanas.component';

describe('PuertasVentanasComponent', () => {
  let component: PuertasVentanasComponent;
  let fixture: ComponentFixture<PuertasVentanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuertasVentanasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuertasVentanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
