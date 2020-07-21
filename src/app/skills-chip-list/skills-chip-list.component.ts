import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { SkillService } from '../services/skills.service';

@Component({
  selector: 'skills-chip-list',
  templateUrl: './skills-chip-list.component.html',
  styleUrls: ['./skills-chip-list.component.scss']
})
export class SkillsChipListComponent implements OnInit {

  @Input('control') control : FormControl;
  @Input('selected') selectedSkills : string[];
  allSkills : Skill[];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSkills: Observable<string[]>;
  skillsOptions: string[] = [];

  constructor(private skillService : SkillService) { }

  ngOnInit(): void {

    this.filteredSkills = this.control.valueChanges
    .pipe(
      startWith(null),
      map((skillName: string | null) => skillName ? this._filter(skillName) : this.skillsOptions.slice())
    );

    this.skillService.getAll().pipe(
      map((skills : any) => {
        return skills.map((skill) => {
          return new Skill(skill.skillId, skill.skillName);
        })
      }
    )).subscribe((skills : Skill[]) => {
        this.allSkills = skills;
        this.skillsOptions = this.allSkills.map(skill => skill.name);
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.selectedSkills.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.control.setValue(null);
  }

  remove(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.control.setValue(null);
  }

  private _filter(value : string): string[] {
    const filterValue = value.toLowerCase();
    return this.skillsOptions.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

}
