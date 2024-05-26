import { TestBed } from '@angular/core/testing';

import { ConvertorTrackerService } from './convertor-tracker.service';

describe('ConvertorTrackerService', () => {
  let service: ConvertorTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertorTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
