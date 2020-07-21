import { TestBed } from '@angular/core/testing';

import { CreateInterviewGuard } from './create-interview-guard.service';

describe('CreateInterviewGuardService', () => {
  let service: CreateInterviewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateInterviewGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
