import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { DataTableFilterComponent } from './data-table-filter/data-table-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAuthGuard } from './services/user-auth-guard.service';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';


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
    DataTableComponent,
    DataTableFilterComponent,
    UserFormComponent,
    CandidateFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard, UserAuthGuard] },
      { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard, UserAuthGuard] },
      { path: 'users/:id', component: UserFormComponent, canActivate: [AuthGuard] },
      { path: 'candidates', component: CandidatesComponent, canActivate: [AuthGuard] },
      { path: 'candidates/new', component: CandidateFormComponent, canActivate: [AuthGuard] },
      { path: 'interviews', component: InterviewsComponent, canActivate: [AuthGuard] },
      { path: 'profile/edit', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: '**', component: LoginComponent } // change to 404 
    ]),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
