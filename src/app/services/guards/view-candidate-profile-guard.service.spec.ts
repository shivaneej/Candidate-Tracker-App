import { TestBed } from '@angular/core/testing';

import { ViewCandidateProfileGuard } from './view-candidate-profile-guard.service';

describe('ViewCandidateProfileGuard', () => {
  let service: ViewCandidateProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCandidateProfileGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
