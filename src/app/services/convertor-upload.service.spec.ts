import { TestBed } from '@angular/core/testing';

import { ConvertorUploadService } from './convertor-upload.service';

describe('ConvertorService', () => {
  let service: ConvertorUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertorUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
