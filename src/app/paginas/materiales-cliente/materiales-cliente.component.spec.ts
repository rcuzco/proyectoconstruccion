import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesClienteComponent } from './materiales-cliente.component';

describe('MaterialesClienteComponent', () => {
  let component: MaterialesClienteComponent;
  let fixture: ComponentFixture<MaterialesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
