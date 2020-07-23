import { TestBed } from '@angular/core/testing';

import { CreateUserGuard } from './create-user-guard.service';

describe('CreateUserGuardService', () => {
  let service: CreateUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
