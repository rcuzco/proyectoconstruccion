import { TestBed } from '@angular/core/testing';

import { MaterialesClienteService } from './materiales-cliente.service';

describe('MaterialesClienteService', () => {
  let service: MaterialesClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialesClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
