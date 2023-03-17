import { TestBed } from '@angular/core/testing';

import { ToastGeneratorService } from './toast-generator.service';

describe('ToastGeneratorService', () => {
  let service: ToastGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
