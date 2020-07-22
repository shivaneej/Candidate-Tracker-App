import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeHelper } from 'src/app/interview-form/datetime-helper';
import { DateValidator } from './date.validator';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  selectedDuration;
  options = [];
  maxDate;
  form;

  filterDuration = {};

  constructor(
    private builder : FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, 
    @Optional() public dialogRef: MatDialogRef<FilterComponent>) { 
      this.form = builder.group({
        start : [''],
        end : [''],
      }, { validators: DateValidator.validDuration });
      this.options = data.options;
      this.selectedDuration = data.duration.days || null;
      this.form.setValue({
        start : data.duration.start || '',
        end : data.duration.end || '',
      })
  }

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  save() {
    this.filterDuration = {
      days : this.selectedDuration,
      start : (!this.selectedDuration) ? DateTimeHelper.convertDatetoISO(this.start.value) : null,
      end : (!this.selectedDuration) ? DateTimeHelper.convertDatetoISO(this.end.value) : null
    };
    this.dialogRef.close({ event: 'Filter', data: this.filterDuration });
  }

  radioSelected() {
    this.start.reset();
    this.end.reset(); 
  }

  dateSelected() {
    this.selectedDuration = null;
  }

  clear() {
    this.selectedDuration = this.data.default;
    this.start.reset();
    this.end.reset();
  }

  get start() {
    return this.form.get('start');
  }
  get end() {
    return this.form.get('end');
  }

}
