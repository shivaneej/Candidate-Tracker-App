import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { STATISTICS_PERMISSION, INTERVIEW_PERMISSION } from '../services/guards/permissions';
import { StatisticsService } from '../services/statistics.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterviewService } from '../services/interview.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_DURATION } from '../helpers/constants';
import { DURATION_OPTIONS, CARD_STYLES } from './variables';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  initialValues = { overall : 0, user : 0 };
  dataToDisplay = { duration: null, hired : this.initialValues, rejected : this.initialValues, 
    offers : this.initialValues, inProcess : this.initialValues };
  interviews;
  dataLoading : boolean = false;
  objectKeys = Object.keys; 
  user;
  showStatistics;
  statsMode = 'overall';
  showInterviews;
  cardStyles = CARD_STYLES;
  options = DURATION_OPTIONS;
  filterDuration : any = {};
  durationString;

  constructor(
    private authService : AuthService, 
    private statsService : StatisticsService,
    private interviewService : InterviewService, 
    public dialog: MatDialog, private snackbar : MatSnackBar ) { }

  ngOnInit(): void {
    this.filterDuration = { days: DEFAULT_DURATION, start : null, end : null};
    this.dataLoading = true;
    this.updateDuration();
    
    this.user = this.authService.userLoggedIn();
    this.showStatistics = STATISTICS_PERMISSION.read.includes(this.user.role.roleString);
    this.showInterviews = INTERVIEW_PERMISSION.read.includes(this.user.role.roleString);
    if(this.showStatistics)
      this.fetchStatistics(this.filterDuration);
    if(this.showInterviews)
      this.interviewService.getAll().subscribe(interviews => {
        this.interviews = interviews;
        this.dataLoading = false;
      }, err => {
        this.dataLoading = false;
        this.snackbar.open("Could not fetch data", "Dismiss", { duration: 2000 }); 
      });
  }

  openFilterDialog() {
    let dialogRef = this.dialog.open(FilterComponent, { width: '600px' , data : 
    { duration : this.filterDuration, default : DEFAULT_DURATION , options : this.options }  });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.event === 'Filter')
        this.filterDuration = result.data;
        this.updateDuration();
        this.fetchStatistics(this.filterDuration);
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
    combineLatest(
      this.statsService.getOverallStats(duration),
      this.statsService.getMyStats(duration),
    ).pipe(
      map(([overall, user]) => {
        return {
          duration : duration.days !== null ? duration.days : { from : duration.start , to : duration.end},
          hired : { overall : overall.hired, user : user.hired },
          rejected : { overall : overall.rejected, user : user.rejected },
          offers : { overall : overall.hired, user : user.hired },
          inProcess : { overall : overall.ready + overall.hold, user : user.ready + user.hold }
        }
      })
    ).subscribe(data => {
      this.dataToDisplay = data;
    });
  }
}
