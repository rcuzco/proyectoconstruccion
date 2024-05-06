import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeramicaComponent } from './ceramica.component';

describe('CeramicaComponent', () => {
  let component: CeramicaComponent;
  let fixture: ComponentFixture<CeramicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeramicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeramicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
