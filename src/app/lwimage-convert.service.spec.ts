import { TestBed } from '@angular/core/testing';

import { LWImageConvertService } from './lwimage-convert.service';

describe('LWImageConvertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LWImageConvertService = TestBed.get(LWImageConvertService);
    expect(service).toBeTruthy();
  });
});
