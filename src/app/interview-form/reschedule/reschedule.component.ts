import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeValidator } from '../time.validator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { convertToSQLDateTime, splitDateTime } from 'src/app/helpers/date-helper';

@Component({
  selector: 'reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent {

  form;
  interview;
  minDate;
  maxDate;
  ogDate;
  ogStartTime;
  ogEndTime;

  constructor(
    public dialogRef: MatDialogRef<RescheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder ) { 
      this.interview = {...data};
      [this.ogDate, this.ogStartTime, this.ogEndTime] = splitDateTime(this.interview.startTime, this.interview.endTime);

      this.form = builder.group({
        date : [new Date(this.ogDate), [Validators.required]],
        startTime : [this.ogStartTime, [Validators.required]],
        endTime : [this.ogEndTime, [Validators.required]],
      }, { validators: TimeValidator.validDuration });
      let min = new Date(), max = new Date();
      min.setDate(new Date().getDate() + 1);
      max.setMonth(new Date().getMonth() + 1);
      this.minDate = min;
      this.maxDate = max;
  }

  filter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6; // Prevent Saturday and Sunday from being selected.
  }

  save() {
    let dateString = new Date(this.date.value).toDateString();
    if(!(this.ogDate === dateString && this.ogStartTime === this.startTime.value && this.ogEndTime === this.endTime.value)) {
      let processedFormData = this.processInterviewData(this.form.value);   
      this.dialogRef.close({ event: 'Reschedule', data: processedFormData });
    } else
    this.dialogRef.close({ event: 'Reschedule', data: null });
  }

  processInterviewData(formData) {
    let processedFormData = Object.assign( this.interview , formData);
    processedFormData.startTime = convertToSQLDateTime(processedFormData.date, processedFormData.startTime);
    processedFormData.endTime = convertToSQLDateTime(processedFormData.date, processedFormData.endTime);
    delete processedFormData.date;
    return processedFormData;
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  get date() { return this.form.get('date') }
  get startTime() { return this.form.get('startTime') }
  get endTime() { return this.form.get('endTime') }
}
