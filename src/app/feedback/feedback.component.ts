import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  interview;
  form;
  constructor(
    public dialogRef: MatDialogRef<FeedbackComponent>,
    private builder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.interview = {...data};
      this.form = builder.group({
        feedback : [this.interview.feedback, [Validators.required]]
      });
  }

  save(){
    if(this.feedback.value.trim() !== this.interview.feedback.trim()) {
      this.interview.feedback = this.feedback.value;
      this.dialogRef.close({ event: 'Feedback', data: this.interview });
    } else
    this.dialogRef.close({ event: 'Feedback', data: null });
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  get feedback() {
    return this.form.get('feedback');
  }

}
