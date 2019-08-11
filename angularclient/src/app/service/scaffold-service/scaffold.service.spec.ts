import { TestBed } from '@angular/core/testing';

import { ScaffoldService } from './scaffold.service';

describe('ScaffoldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScaffoldService = TestBed.get(ScaffoldService);
    expect(service).toBeTruthy();
  });
});
