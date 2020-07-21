import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor (private authService : AuthService, private router : Router, private snackbar : MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = this.addAuthenticationToken(request);
    return next.handle(modifiedReq).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === 401) {
          if(!request.url.includes('authenticate')) {
            this.authService.logout();     
            this.router.navigateByUrl('/login');    
            this.snackbar.open("Session expired", "Dismiss", {
              duration: 2000,
            }); 
          }
          return throwError(error);
        } else
          return throwError(error);
      })
    );
  }

  addAuthenticationToken(request) {
    let token = this.authService.userToken();
    if (!token)
      return request;
    return request.clone({ 
      setHeaders: {
       'Authorization': token
     }});
  }
}