import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { InterviewService } from '../services/interview.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.scss']
})
export class InterviewFormComponent implements OnInit {

  form;
  minDate;
  maxDate;
  candidate;
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  constructor(
    private builder: FormBuilder,
    private interviewService : InterviewService,
    private usersService : UsersService, 
    private router : Router,
    private route : ActivatedRoute,
    private snackbar : MatSnackBar ) {
    this.form = builder.group({
      interviewer : ['', [Validators.required, Validators.email]],
      date : ['', [Validators.required]]
    });
    let min = new Date(), max = new Date();
    min.setDate(new Date().getDate() + 1);
    max.setMonth(new Date().getMonth() + 1);
    this.minDate = min;
    this.maxDate = max;
    this.usersService.getByRole('interviewer').subscribe(options => {
      this.options = options as any;
    });
    this.candidate = this.route.snapshot.queryParamMap.get('candidate');
  }

  filter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  ngOnInit(): void {
    this.filteredOptions = this.interviewer.valueChanges
      .pipe(
        startWith(''),
        map((value : string) => this._filter(value)),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.options.filter(option => option.email.toLowerCase().includes(filterValue));
  }

  save() {
    let processedFormData = this.processInterviewerData(this.form.value, this.options);
    if(processedFormData === null) {
      this.snackbar.open("Could not schedule interview", "Dismiss", {
        duration: 2000,
      });
      return;
    }    
    this.interviewService.save(processedFormData);
    this.router.navigateByUrl('/dashboard');
  }

  processInterviewerData(formData, options) {
    let interviewer = options.filter(i => {
      return i.email === formData.interviewer;
    });
    if(!interviewer[0]) return null;
    let processedFormData = Object.assign({ candidate : this.candidate }, formData);
    processedFormData.interviewer = interviewer[0].id;
    return processedFormData;
  }

  get interviewer() {
    return this.form.get('interviewer');
  }
  get date() {
    return this.form.get('date');
  }

}
