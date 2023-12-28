import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarStockMaterialComponent } from './gestionar-stock-material.component';

describe('GestionarStockMaterialComponent', () => {
  let component: GestionarStockMaterialComponent;
  let fixture: ComponentFixture<GestionarStockMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarStockMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarStockMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
