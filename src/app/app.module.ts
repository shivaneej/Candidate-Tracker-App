import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { UsersComponent } from './users/users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { DataTableComponent } from './data-table/data-table.component';

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
    SidenavComponent,
    InterviewsComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'users', component: UsersComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: 'interviews', component: InterviewsComponent },
      { path: 'profile/edit', component: ProfileComponent },
      { path: '**', component: LoginComponent } // change to 404 
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
