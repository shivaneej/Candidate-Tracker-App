import { TestBed } from '@angular/core/testing';

import { SkillService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
