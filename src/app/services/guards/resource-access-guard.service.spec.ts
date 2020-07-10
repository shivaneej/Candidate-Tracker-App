import { TestBed } from '@angular/core/testing';

import { ResourceAccess } from './resource-access-guard.service';

describe('RoleGuardService', () => {
  let service: ResourceAccess;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceAccess);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
