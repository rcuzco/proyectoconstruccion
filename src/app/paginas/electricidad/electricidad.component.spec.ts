import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricidadComponent } from './electricidad.component';

describe('ElectricidadComponent', () => {
  let component: ElectricidadComponent;
  let fixture: ComponentFixture<ElectricidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
