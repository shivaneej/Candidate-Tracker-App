import { Component, OnInit, Input } from '@angular/core';
import { InterviewStatus } from './interview-status';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleComponent } from '../interview-form/reschedule/reschedule.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterviewService } from '../services/interview.service';
import { CandidateProfileComponent } from '../candidate-profile/candidate-profile.component';

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
  candidate;
  candidateId;
  interviewer;
  editButtonPrefix;
  responsePending : boolean = false;
  constructor(public dialog: MatDialog, private snackbar : MatSnackBar, private interviewService : InterviewService) { }

  openDialog(value : number) {
    let dialogRef;
    if(value === 1)
      dialogRef = this.dialog.open(RescheduleComponent, { data : this.interview });
    else if(value === 2)
      dialogRef = this.dialog.open(FeedbackComponent, { data : this.interview });
    else if(value === 3)
      dialogRef = this.dialog.open(CandidateProfileComponent, { width : '1000px', height:'500px', data : this.candidateId });
    

    dialogRef.afterClosed().subscribe(result => {
      if(result?.event == 'Feedback'){
        this.saveFeedback(result.data);
      } else if(result?.event == 'Reschedule'){
        this.reschedule(result.data);
      }
    });
  }

  ngOnInit(): void {
    this.editButtonPrefix = (this.interview.feedback) ? 'Edit' : 'Give';
    this.candidate = this.interview.candidate.firstName + " " + this.interview.candidate.lastName;
    this.candidateId = this.interview.candidate.id;
    this.interviewer = this.interview.interviewer.firstName + " " + this.interview.interviewer.lastName;
    this.updateDate();
    let otherUser = (this.currentUser === 'Interviewer') ? 'Recruiter' : 'Interviewer';

    let status = this.interview.approvalStatus as string;
    if(status.startsWith('both')) { 
      this.setStatusAsConfirmed();
    } else if(status.startsWith(otherUser.toLowerCase())) { 
      this.setStatusAsNew();
    } else { 
      this.setStatusAsPending();
    }
  }

  setStatusAsConfirmed() { // Both have approved - option to update feedback AFTER endtime
    this.status = InterviewStatus.Confirmed.message;
    this.statusColor = InterviewStatus.Confirmed.color;
    let endTimeObj = new Date(this.interview.endTime);
    this.showAction = (this.currentUser === 'Interviewer' && (new Date()).valueOf() > endTimeObj.valueOf()) ? Footer.Feedback : Footer.None ;
  }

  setStatusAsNew() { // Show accept/reschedule button
    this.status = InterviewStatus.New.message;
    this.statusColor = InterviewStatus.New.color;
    this.showAction = Footer.Actions ;
  }

  setStatusAsPending() { // Show no action
    this.status = InterviewStatus.Pending.message;
    this.statusColor = InterviewStatus.Pending.color;
    this.showAction = Footer.None ;
  }

  updateDate() { // Update start and end time in required format
    let dateObject = new Date(this.interview.startTime);
    this.date = dateObject.toDateString();
    this.startTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    this.endTime = new Date(this.interview.endTime).toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
  }

  async saveFeedback(formData) {
    if(formData !== null) {
      this.responsePending = true;
      let response : any = await this.interviewService.updateInterview(formData, 2);
      this.responsePending = false;
      if(response.code !== 200) {
        this.snackbar.open("Could not update feedback", "Dismiss", { duration: 2000 });
      } else {
        this.snackbar.open("Successfully updated feedback", "Dismiss", { duration: 2000 });
        this.interview = formData;
      }
    }
  }

  async reschedule(formData) {
    if(formData !== null) {
      this.responsePending = true;
      let response : any = await this.interviewService.updateInterview(formData, 1);
      this.responsePending = false;
      if(response.code !== 200) {
        this.snackbar.open("Could not reschedule the interview", "Dismiss", { duration: 2000 });
      } else {
        this.snackbar.open("Successfully rescheduled the interview", "Dismiss", { duration: 2000 });
        this.interview = response.body;
        this.setStatusAsPending();
        this.updateDate();
      }
    }
  }

  async accept() {
    this.responsePending = true;
    let response : any = await this.interviewService.accept(this.interview.interviewId);
    this.responsePending = false;
    if(response.code !== 200) {
      this.snackbar.open("Could not accept interview", "Dismiss", { duration: 2000 });
    } else {
      this.snackbar.open("Successfully accepted the interview", "Dismiss", { duration: 2000 });
      this.interview = response.body;
      this.setStatusAsConfirmed();
    }
  }
}