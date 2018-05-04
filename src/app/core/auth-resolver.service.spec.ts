import { TestBed, inject } from '@angular/core/testing';

import { AuthResolver.ServiceService } from './auth-resolver.service.service';

describe('AuthResolver.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthResolver.ServiceService]
    });
  });

  it('should be created', inject([AuthResolver.ServiceService], (service: AuthResolver.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
