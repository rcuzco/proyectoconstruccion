import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuelosRevestimientosComponent } from './suelos-revestimientos.component';

describe('SuelosRevestimientosComponent', () => {
  let component: SuelosRevestimientosComponent;
  let fixture: ComponentFixture<SuelosRevestimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuelosRevestimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuelosRevestimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
