import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsChipListComponent } from './skills-chip-list.component';

describe('SkillsChipListComponent', () => {
  let component: SkillsChipListComponent;
  let fixture: ComponentFixture<SkillsChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsChipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
