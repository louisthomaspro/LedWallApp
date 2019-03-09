import { TestBed } from '@angular/core/testing';

import { LwImageService } from './lw-image.service';

describe('LwImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LwImageService = TestBed.get(LwImageService);
    expect(service).toBeTruthy();
  });
});
