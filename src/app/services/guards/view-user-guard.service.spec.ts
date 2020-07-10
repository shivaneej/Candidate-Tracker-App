import { TestBed } from '@angular/core/testing';

import { ViewUserGuard } from './view-user-guard.service';

describe('RoleAuthGuardService', () => {
  let service: ViewUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewUserGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
