import { Component, OnInit, Input } from '@angular/core';
import { InterviewStatus } from './interview-status';

@Component({
  selector: 'interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss']
})
export class InterviewCardComponent implements OnInit {

  @Input('interview') interview;
  status;
  statusColor;
  date;
  startTime;
  endTime;
  constructor() { }

  ngOnInit(): void {
    let dateObject = new Date(this.interview.start_time);
    this.date = dateObject.toDateString();
    this.startTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    this.endTime = new Date(this.interview.end_time).toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    if(this.interview.recruiter_approved) {
      let intStatus = (this.interview.interviewer_approved) ? InterviewStatus.Confirmed : InterviewStatus.Pending;
      this.status = intStatus.message;
      this.statusColor = intStatus.color;
    } else {
      this.status = InterviewStatus.Reschedule.message; // Need clarification
      this.statusColor = InterviewStatus.Reschedule.color;
    }

    
  }
}