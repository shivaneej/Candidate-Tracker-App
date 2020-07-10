import { TestBed } from '@angular/core/testing';

import { EditUserGuard } from './edit-user-guard.service';

describe('EditUserGuardService', () => {
  let service: EditUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
