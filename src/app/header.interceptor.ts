import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';
import { ConnectorService } from './services/connector.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor (private authService : AuthService, private connectorService : ConnectorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = this.addAuthenticationToken(request);
    return next.handle(modifiedReq).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === 401) {
          if(!request.url.includes('authenticate')) {
            this.connectorService.sessionExpired(true); 
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