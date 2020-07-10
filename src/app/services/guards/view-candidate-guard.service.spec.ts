import { TestBed } from '@angular/core/testing';

import { ViewCandidateGuard } from './view-candidate-guard.service';

describe('ViewCandidateGuardService', () => {
  let service: ViewCandidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCandidateGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
