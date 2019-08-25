import { TestBed } from '@angular/core/testing';

import { MewDataService } from './mewdata.service';

describe('PrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MewDataService = TestBed.get(MewDataService);
    expect(service).toBeTruthy();
  });
});
