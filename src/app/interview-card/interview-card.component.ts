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
  constructor() { }

  ngOnInit(): void {
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