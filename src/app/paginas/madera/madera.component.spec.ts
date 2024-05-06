import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaderaComponent } from './madera.component';

describe('MaderaComponent', () => {
  let component: MaderaComponent;
  let fixture: ComponentFixture<MaderaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaderaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaderaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
