import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesConstruccionComponent } from './materiales-construccion.component';

describe('MaterialesConstruccionComponent', () => {
  let component: MaterialesConstruccionComponent;
  let fixture: ComponentFixture<MaterialesConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesConstruccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
