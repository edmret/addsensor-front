import { TestBed, inject } from '@angular/core/testing';

import { ParamsServiceService } from './params-service.service';

describe('ParamsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamsServiceService]
    });
  });

  it('should be created', inject([ParamsServiceService], (service: ParamsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
