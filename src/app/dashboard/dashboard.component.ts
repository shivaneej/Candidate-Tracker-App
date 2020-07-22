import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { STATISTICS_PERMISSION, INTERVIEW_PERMISSION } from '../services/guards/permissions';
import { StatisticsService } from '../services/statistics.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterviewService } from '../services/interview.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  DEFAULT_DURATION = 7;
  dataListCache = [];
  dataToDisplay;
  interviews;
  objectKeys = Object.keys; 
  user;
  showStatistics;
  statsMode = 'overall';
  showInterviews;
  cardStyles = [
    { title: 'Candidates Hired', color: 'lightblue', icon : 'how_to_reg' },
    { title: 'Candidates Rejected', color: 'lightgreen', icon : 'person_remove' },
    { title: 'Offers Roled Out', color: 'lightpink', icon : 'send' },
    { title: 'Candidates In Process', color: '#DDBDF1', icon : 'event_note' }
  ];

  options = [ 
    {label : 'Today', value : 1}, 
    {label : 'Yesterday', value : 2}, 
    {label : 'Last 7 days', value : 7}, 
    {label : 'Last 30 days', value : 30}, 
  ];

  filterDuration : any = {};

  durationString;
  constructor(
    private authService : AuthService, 
    private statsService : StatisticsService,
    private interviewService : InterviewService, 
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.filterDuration = { days: this.DEFAULT_DURATION, start : null, end : null};
    this.updateDuration();
    this.user = this.authService.userLoggedIn();
    this.showStatistics = STATISTICS_PERMISSION.read.includes(this.user.role.roleString);
    this.showInterviews = INTERVIEW_PERMISSION.read.includes(this.user.role.roleString);
    if(this.showStatistics)
      this.fetchStatistics({ days : 7})
      .subscribe(data => {
        this.dataListCache.push(data);
        this.dataToDisplay = this.dataListCache[0];
      });
    if(this.showInterviews)
      this.interviewService.getAll().subscribe(interviews => {
        this.interviews = interviews;
      });
  }

  openFilterDialog() {
    let dialogRef = this.dialog.open(FilterComponent, { width: '600px' , data : 
    { duration : this.filterDuration, default : this.DEFAULT_DURATION , options : this.options }  });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.event === 'Filter')
        this.filterDuration = result.data;
        this.updateDuration();
    });
  }

  updateDuration() {
    if(this.filterDuration.days) {
      this.durationString = this.options.filter(option => option.value === this.filterDuration.days)
      .map(option => option.label)[0];
    } else if(this.filterDuration.start) {
      this.durationString = "From : " +this.filterDuration.start + " to : " + this.filterDuration.end;
    }
  }

  fetchStatistics(duration) {
    return combineLatest(
      this.statsService.getCandidatesHired(duration),
      this.statsService.getCandidatesRejected(duration),
      this.statsService.getOffersRoledOut(duration),
      this.statsService.getCandidatesInProcess(duration),
    ).pipe(
      map(([numHired, numRejected, numOffers, numInProcess]) => {
        return {
          duration : duration.days !== null ? duration.days : { from : duration.start , to : duration.end},
          hired : numHired,
          rejected : numRejected,
          offers : numOffers,
          inProcess : numInProcess
        }
      })
    );
  }
}
