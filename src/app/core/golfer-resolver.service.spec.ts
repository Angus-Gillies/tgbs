import { TestBed, inject } from '@angular/core/testing';

import { GolferResolverService } from './golfer-resolver.service';

describe('GolferResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GolferResolverService]
    });
  });

  it('should be created', inject([GolferResolverService], (service: GolferResolverService) => {
    expect(service).toBeTruthy();
  }));
});
