import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { InterviewService } from '../services/interview.service';
import { UsersService } from '../services/users.service';
import { TimeValidator } from './time.validator';
import { DateTimeHelper } from './datetime-helper';

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
  responsePending : boolean  = false;
  constructor(
    private builder: FormBuilder,
    private interviewService : InterviewService,
    private usersService : UsersService, 
    private router : Router,
    private route : ActivatedRoute,
    private snackbar : MatSnackBar ) {
    this.form = builder.group({
      interviewer : ['', [Validators.required, Validators.email]],
      date : ['', [Validators.required]],
      startTime : ['', [Validators.required]],
      endTime : ['', [Validators.required]],
    }, { validators: TimeValidator.validDuration });
    let min = new Date(), max = new Date();
    min.setDate(new Date().getDate() + 1);
    max.setMonth(new Date().getMonth() + 1);
    this.minDate = min;
    this.maxDate = max;
    this.usersService.getInterviewers().subscribe(options => {
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

  async save() {
    this.responsePending = true;
    let processedFormData = this.processInterviewData(this.form.value, this.options);
    if(processedFormData === null) {
      this.snackbar.open("Could not schedule interview", "Dismiss", { duration: 2000 });
      this.responsePending = false;
      return;
    }    
    let response : any = await this.interviewService.save(processedFormData);
    this.responsePending = false;
    if(response.code === 200){
      this.snackbar.open("Successfully scheduled interview", "Dismiss", { duration: 2000 });
      this.router.navigateByUrl('/dashboard');
    } else {
      this.snackbar.open("Culd not schedule interview", "Dismiss", { duration: 2000 });
    }
  }

  processInterviewData(formData, options) {
    let interviewer = options.filter(i => {
      return i.email === formData.interviewer;
    });
    if(!interviewer[0]) return null;
    let processedFormData = Object.assign({ candidate : { id : parseInt(this.candidate, 10) }}, formData);
    processedFormData.interviewer = { id : interviewer[0].id } ;
    processedFormData.startTime = DateTimeHelper.convertToDateTime(processedFormData.date, processedFormData.startTime);
    processedFormData.endTime = DateTimeHelper.convertToDateTime(processedFormData.date, processedFormData.endTime);
    delete processedFormData.date;
    return processedFormData;
  }

  get interviewer() {
    return this.form.get('interviewer');
  }
  get date() {
    return this.form.get('date');
  }
  get startTime() {
    return this.form.get('startTime');
  }
  get endTime() {
    return this.form.get('endTime');
  }

}
