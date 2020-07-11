import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { UsersComponent } from './users/users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { DataTableComponent } from './data-table/data-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthGuard } from './services/guards/auth-guard.service';
import { ViewUserGuard } from './services/guards/view-user-guard.service';
import { EditUserGuard } from './services/guards/edit-user-guard.service';
import { ViewCandidateGuard } from './services/guards/view-candidate-guard.service';
import { EditCandidateGuard } from './services/guards/edit-candidate-guard.service';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CandidatesComponent,
    CandidateProfileComponent,
    InterviewFormComponent,
    UsersComponent,
    SidenavComponent,
    InterviewsComponent,
    DataTableComponent,
    UserFormComponent,
    CandidateFormComponent,
    ChangePasswordComponent,
    EditUserComponent
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
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard, ViewUserGuard] },
      { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard, EditUserGuard] },
      { path: 'users/:id', component: EditUserComponent, canActivate: [AuthGuard] },
      { path: 'candidates', component: CandidatesComponent, canActivate: [AuthGuard, ViewCandidateGuard] },
      { path: 'candidates/new', component: CandidateFormComponent, canActivate: [AuthGuard, EditCandidateGuard] },
      { path: 'candidates/:id', component: CandidateProfileComponent, canActivate: [AuthGuard, EditCandidateGuard] },
      { path: 'interviews', component: InterviewsComponent, canActivate: [AuthGuard] },
      { path: 'interviews/new', component: InterviewFormComponent, canActivate: [AuthGuard] },
      { path: 'profile/edit', component: EditUserComponent, canActivate: [AuthGuard] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: '**', component: LoginComponent } // change to 404 
    ]),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
