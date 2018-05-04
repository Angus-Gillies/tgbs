import { TestBed, inject } from '@angular/core/testing';

import { WeekDatesService } from './week-dates.service';

describe('WeekDatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeekDatesService]
    });
  });

  it('should be created', inject([WeekDatesService], (service: WeekDatesService) => {
    expect(service).toBeTruthy();
  }));
});
