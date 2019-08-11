import { TestBed } from '@angular/core/testing';

import { FiberService } from './fiber.service';

describe('FiberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiberService = TestBed.get(FiberService);
    expect(service).toBeTruthy();
  });
});
