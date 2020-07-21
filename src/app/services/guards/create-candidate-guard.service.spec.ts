import { TestBed } from '@angular/core/testing';

import { CreateCandidateGuard } from './create-candidate-guard.service';

describe('CreateCandidateGuard', () => {
  let service: CreateCandidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCandidateGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
