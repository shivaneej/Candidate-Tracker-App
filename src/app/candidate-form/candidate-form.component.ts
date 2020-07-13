import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatesService } from '../services/candidates.service';
import { SkillService } from '../services/skills.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  form;
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  selectedFile: File;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSkills: Observable<string[]>;
  selectedSkills: string[] = [];
  skillsOptions: string[] = [];

  allSkills : Skill[] = [];


  constructor(private builder: FormBuilder, 
    private candidatesService : CandidatesService,
    private router : Router,
    private skillService : SkillService ) { 
    let pattern = "^(\\+\\d{1,3}[- ]?)?0?[7-9]{1}\\d{9}$";
    this.form = builder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [ Validators.required, Validators.email]],
      contact : ['', [Validators.required, Validators.pattern(pattern)]],
      address : ['', Validators.required],
      preferredLoc : ['', Validators.required],
      ectc : ['', [Validators.required, Validators.min(0)]],
      ctct : ['', [Validators.required, Validators.min(0)]],
      source : ['', Validators.required],
      fileInput : ['', Validators.required],
      skills : ['']
    });
  }


  ngOnInit(): void {
    this.filteredSkills = this.skills.valueChanges
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
        console.log(this.allSkills, this.skillsOptions);
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
    this.skills.setValue(null);
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
    this.skills.setValue(null);
  }

  private _filter(value : string): string[] {
    const filterValue = value.toLowerCase();
    return this.skillsOptions.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    let selectedSkills = (this.allSkills.filter(skill => this.selectedSkills.includes(skill.name)))
    .map(skill => skill.mapFields());
    let processedFormData = Object.assign({}, this.form.value);
    processedFormData.skills = selectedSkills;
    this.candidatesService.save(processedFormData, this.selectedFile);
    this.router.navigateByUrl('/candidates');
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get contact() {
    return this.form.get('contact');
  }
  get address() {
    return this.form.get('address');
  }
  get preferredLoc() {
    return this.form.get('preferredLoc');
  }
  get ectc() {
    return this.form.get('ectc');
  }
  get ctct() {
    return this.form.get('ctct');
  }
  get source() {
    return this.form.get('source');
  }
  get fileInput() {
    return this.form.get('fileInput');
  }
  get skills() {
    return this.form.get('skills');
  }

}
