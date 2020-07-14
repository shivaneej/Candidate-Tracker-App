import { Component, OnInit, Input } from '@angular/core';
import { InterviewStatus } from './interview-status';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleComponent } from '../interview-form/reschedule/reschedule.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatSnackBar } from '@angular/material/snack-bar';

enum Footer {
  None,
  Feedback,
  Actions
}

@Component({
  selector: 'interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss']
})
export class InterviewCardComponent implements OnInit {

  @Input('interview') interview;
  @Input('currentUser') currentUser;
  status;
  statusColor;
  date;
  startTime;
  endTime;
  showAction : Footer ;
  constructor(public dialog: MatDialog, private snackbar : MatSnackBar) { }

  openDialog(value : number) {
    let dialogRef;
    if(value === 1)
      dialogRef = this.dialog.open(RescheduleComponent, { data : this.interview });
    else if(value === 2)
      dialogRef = this.dialog.open(FeedbackComponent, { data : this.interview });
    

    dialogRef.afterClosed().subscribe(result => {
      if(result?.event == 'Feedback'){
        this.saveFeedback(result.data);
      } else if(result?.event == 'Reschedule'){
        this.reschedule(result.data);
      }
    });
  }

  ngOnInit(): void {
    let dateObject = new Date(this.interview.startTime);
    console.log(dateObject);
    this.date = dateObject.toDateString();
    this.startTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    this.endTime = new Date(this.interview.endTime).toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    let otherUser = (this.currentUser === 'Interviewer') ? 'Recruiter' : 'Interviewer';

    let status = this.interview.approvalStatus as string;
    if(status.startsWith('both')) { // Both have approved - option to update feedback AFTER endtime
      this.status = InterviewStatus.Confirmed.message;
      this.statusColor = InterviewStatus.Confirmed.color;
      let endTimeObj = new Date(this.interview.end_time);
      this.showAction = (this.currentUser === 'Interviewer' && (new Date()).valueOf() > endTimeObj.valueOf()) ? Footer.Feedback : Footer.None ;
    } else if(status.startsWith(otherUser.toLowerCase())) { // Show accept/reschedule button
      this.status = InterviewStatus.New.message;
      this.statusColor = InterviewStatus.New.color;
      this.showAction = Footer.Actions ;
    } else { // Show no action
      this.status = InterviewStatus.Pending.message;
      this.statusColor = InterviewStatus.Pending.color;
      this.showAction = Footer.None ;
    }
  }

  saveFeedback(formData) {
    console.log("Save " + JSON.stringify(formData));
    if(formData !== null) {
      // Method to update feedback
      // this.interviewService.save(processedFormData);
      this.snackbar.open("Feedback saved!", "Dismiss", {
        duration: 2000,
      });
    }
  }

  accept() {
    //Method to accept 
    this.snackbar.open("Interview confirmed", "Dismiss", {
      duration: 2000,
    });
  }
  reschedule(formData) {
    console.log("Save " + JSON.stringify(formData));
    if(formData !== null) {
      // Method to update feedback
      // this.interviewService.save(processedFormData);
      this.snackbar.open("Reschedule requested", "Dismiss", {
        duration: 2000,
      });
    }
  }
}