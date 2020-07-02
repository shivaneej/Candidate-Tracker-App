import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InterviewsComponent } from './interviews/interviews.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    CandidatesComponent,
    CandidateProfileComponent,
    InterviewFormComponent,
    UsersComponent,
    SidebarComponent,
    InterviewsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
