import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontaneriaComponent } from './fontaneria.component';

describe('FontaneriaComponent', () => {
  let component: FontaneriaComponent;
  let fixture: ComponentFixture<FontaneriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontaneriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FontaneriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
