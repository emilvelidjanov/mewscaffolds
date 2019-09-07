import { TestBed } from '@angular/core/testing';

import { MewDataService } from './mew-data.service';

describe('PrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MewDataService = TestBed.get(MewDataService);
    expect(service).toBeTruthy();
  });
});
