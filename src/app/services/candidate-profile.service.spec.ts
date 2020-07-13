import { TestBed } from '@angular/core/testing';

import { CandidateProfileService } from './candidate-profile.service';

describe('CandidateProfileService', () => {
  let service: CandidateProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
