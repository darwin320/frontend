import { TestBed } from '@angular/core/testing';

import { ServicesApiService } from './service-api.service';

describe('ServiceApiService', () => {
  let service: ServicesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
