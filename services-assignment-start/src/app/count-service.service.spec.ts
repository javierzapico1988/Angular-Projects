import { TestBed } from '@angular/core/testing';

import { CountServiceService } from './count-service.service';

describe('CountServiceService', () => {
  let service: CountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
