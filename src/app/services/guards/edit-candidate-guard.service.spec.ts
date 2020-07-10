import { TestBed } from '@angular/core/testing';

import { EditCandidateGuard } from './edit-candidate-guard.service';

describe('EditCandidateGuardService', () => {
  let service: EditCandidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCandidateGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
