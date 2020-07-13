import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeValidator } from '../time.validator';
import { DateTimeHelper } from '../datetime-helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

      let dateObject = new Date(this.interview.start_time);
      this.ogDate = dateObject.toDateString();
      this.ogStartTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
      this.ogEndTime = new Date(this.interview.end_time).toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });



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
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
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
    processedFormData.start_time = DateTimeHelper.convertToDateTime(processedFormData.date, processedFormData.startTime);
    processedFormData.end_time = DateTimeHelper.convertToDateTime(processedFormData.date, processedFormData.endTime);
    delete processedFormData.date;
    delete processedFormData.startTime;
    delete processedFormData.endTime;
    return processedFormData;
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
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
