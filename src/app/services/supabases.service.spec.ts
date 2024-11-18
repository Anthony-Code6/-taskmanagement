import { TestBed } from '@angular/core/testing';

import { SupabasesService } from './supabases.service';

describe('SupabasesService', () => {
  let service: SupabasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
