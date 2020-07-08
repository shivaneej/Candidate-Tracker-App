import { TestBed } from '@angular/core/testing';

import { RoleAuthGuard } from './role-auth-guard.service';

describe('RoleAuthGuardService', () => {
  let service: RoleAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
