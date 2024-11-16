import { TestBed } from '@angular/core/testing';

import { SupabaseTareaService } from './supabase-tarea.service';

describe('SupabaseTareaService', () => {
  let service: SupabaseTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
