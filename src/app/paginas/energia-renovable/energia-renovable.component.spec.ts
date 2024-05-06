import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergiaRenovableComponent } from './energia-renovable.component';

describe('EnergiaRenovableComponent', () => {
  let component: EnergiaRenovableComponent;
  let fixture: ComponentFixture<EnergiaRenovableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergiaRenovableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergiaRenovableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
