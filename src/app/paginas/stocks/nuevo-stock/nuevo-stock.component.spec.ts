import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoStockComponent } from './nuevo-stock.component';

describe('NuevoStockComponent', () => {
  let component: NuevoStockComponent;
  let fixture: ComponentFixture<NuevoStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
